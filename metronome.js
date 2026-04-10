let audioCtx;
let isPlaying = false;
let currentBeat = 0;
let currentSubdivision = 0;
let bpm = 120;
let timeSignature = 4;
let subdivisionCount = 1;
let nextNoteTime = 0.0;
let timerID;
const lookahead = 25.0; // ms
const scheduleAheadTime = 0.1; // s

// Tap tempo vars
let tapTimes = [];

function nextNote() {
    const secondsPerBeat = 60.0 / bpm;
    // Advance nextNoteTime by subdivision fraction
    nextNoteTime += (secondsPerBeat / subdivisionCount);

    currentSubdivision++;
    if (currentSubdivision >= subdivisionCount) {
        currentSubdivision = 0;
        currentBeat++;
        if (currentBeat >= timeSignature) {
            currentBeat = 0;
        }
    }
}

function playClick(time, isAccent, isSub) {
    if(!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    const baseSound = document.getElementById('base-sound').value;
    const accentSound = document.getElementById('accent-sound').value;

    let useAccent = isAccent && accentSound !== 'none';
    let type = 'sine';
    let freq = 1000;
    let decay = 0.05;

    // VERY simplified syntheic hits based on settings
    if(useAccent) {
        if(accentSound === 'bell') { type = 'sine'; freq = 2000; decay = 0.1; }
        else if(accentSound === 'stick') { type = 'square'; freq = 2000; decay = 0.02; }
        else if(accentSound === 'clap') { type = 'sawtooth'; freq = 800; decay = 0.1; }
    } else {
        if(baseSound === 'tick') { type = 'sine'; freq = isSub ? 800 : 1000; decay = 0.03; }
        else if(baseSound === 'stick') { type = 'square'; freq = isSub ? 1500 : 1800; decay = 0.02; }
        else if(baseSound === 'clap') { type = 'sawtooth'; freq = isSub ? 600 : 700; decay = 0.08; }
    }

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    if(type === 'sawtooth') { // slight noise-ish mod for clap
        osc.frequency.exponentialRampToValueAtTime(100, time + decay);
    }
    
    gainNode.gain.setValueAtTime(isSub ? 0.3 : 1, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(time);
    osc.stop(time + decay);

    // Visuals
    setTimeout(() => {
        if(isSub) return; // Only flash main beats
        const dots = document.querySelectorAll('.beat-dot');
        dots.forEach(d => d.style.background = 'rgba(255,255,255,0.2)');
        if(dots[currentBeat]) {
            dots[currentBeat].style.background = isAccent ? 'var(--accent)' : '#fff';
            dots[currentBeat].style.transform = 'scale(1.2)';
            setTimeout(() => { if(dots[currentBeat]) dots[currentBeat].style.transform = 'scale(1)'; }, 100);
        }
    }, (time - audioCtx.currentTime) * 1000);
}

function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
        let isAccent = (currentBeat === 0 && currentSubdivision === 0);
        let isSub = currentSubdivision !== 0;
        playClick(nextNoteTime, isAccent, isSub);
        nextNote();
    }
    timerID = setTimeout(scheduler, lookahead);
}

function updateVisualizer() {
    const viz = document.getElementById('beat-visualizer');
    viz.innerHTML = '';
    for(let i=0; i<timeSignature; i++) {
        let dot = document.createElement('div');
        dot.className = 'beat-dot';
        dot.style.width = '15px';
        dot.style.height = '15px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'rgba(255,255,255,0.2)';
        dot.style.transition = 'transform 0.1s, background 0.1s';
        viz.appendChild(dot);
    }
}

export function initMetronome() {
    const playBtn = document.getElementById('play-metronome-btn');
    const bpmSlider = document.getElementById('bpm-slider');
    const bpmDisplay = document.getElementById('bpm-display');
    const timeSig = document.getElementById('time-sig');
    const subDiv = document.getElementById('subdivision');
    const tapBtn = document.getElementById('tap-tempo-btn');
    
    updateVisualizer();

    bpmSlider.addEventListener('input', (e) => {
        bpm = parseInt(e.target.value);
        bpmDisplay.innerText = bpm;
    });

    timeSig.addEventListener('change', (e) => {
        timeSignature = parseInt(e.target.value);
        updateVisualizer();
    });

    subDiv.addEventListener('change', (e) => {
        subdivisionCount = parseInt(e.target.value);
    });

    tapBtn.addEventListener('click', () => {
        const now = Date.now();
        if(tapTimes.length > 0 && now - tapTimes[tapTimes.length - 1] > 2000) {
            tapTimes = []; // Reset if 2 seconds passed
        }
        tapTimes.push(now);
        if(tapTimes.length > 4) tapTimes.shift();

        if(tapTimes.length >= 2) {
            let intervals = [];
            for(let i=1; i<tapTimes.length; i++) {
                intervals.push(tapTimes[i] - tapTimes[i-1]);
            }
            let avg = intervals.reduce((a,b)=>a+b)/intervals.length;
            let tappedBpm = Math.round(60000 / avg);
            if(tappedBpm >= 40 && tappedBpm <= 250) {
                bpm = tappedBpm;
                bpmSlider.value = bpm;
                bpmDisplay.innerText = bpm;
            }
        }
        
        tapBtn.style.transform = 'scale(0.95)';
        setTimeout(()=>tapBtn.style.transform='scale(1)', 100);
    });

    playBtn.addEventListener('click', () => {
        if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if(audioCtx.state === 'suspended') audioCtx.resume();

        if(!isPlaying) {
            isPlaying = true;
            currentBeat = 0;
            currentSubdivision = 0;
            updateVisualizer();
            nextNoteTime = audioCtx.currentTime + 0.05;
            scheduler();
            playBtn.innerHTML = '<i data-feather="square"></i> Stop';
            playBtn.style.background = '#ff3b30';
            if(window.feather) feather.replace();
        } else {
            isPlaying = false;
            clearTimeout(timerID);
            playBtn.innerHTML = '<i data-feather="play"></i> Start';
            playBtn.style.background = 'var(--accent)';
            if(window.feather) feather.replace();
        }
    });
}
