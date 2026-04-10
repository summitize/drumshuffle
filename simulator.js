// Web Audio API Synthesizer for Drum Sounds
let audioCtx;
let recordedNotes = [];
let isRecording = false;
let startTime;
let isPlaying = false;

// Synthesizer settings
const drumKit = {
    'kick': { type: 'kick', freq: 150, decay: 0.5 },
    'snare': { type: 'snare', freq: 250, decay: 0.2 },
    'hihat': { type: 'hihat', freq: 1000, decay: 0.1 },
    'openhihat': { type: 'hihat', freq: 1000, decay: 0.6 },
    'tom1': { type: 'kick', freq: 300, decay: 0.4 },
    'tom2': { type: 'kick', freq: 200, decay: 0.5 },
    'ride': { type: 'ride', freq: 400, decay: 1.5 },
    'crash': { type: 'hihat', freq: 800, decay: 1.5 },
    'cowbell': { type: 'cowbell', freq: 800, decay: 0.3 }
};

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSound(soundName) {
    const ctx = initAudio();
    const settings = drumKit[soundName];
    if (!settings) return;

    const time = ctx.currentTime;

    if (isRecording) {
        recordedNotes.push({
            sound: soundName,
            time: Date.now() - startTime
        });
    }

    if (settings.type === 'kick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(settings.freq, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        osc.start(time);
        osc.stop(time + settings.decay);
    } 
    else if (settings.type === 'snare') {
        const bufferSize = ctx.sampleRate * settings.decay;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        noise.connect(noiseFilter);
        
        const gain = ctx.createGain();
        noiseFilter.connect(gain);
        gain.connect(ctx.destination);
        
        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        noise.start(time);
        noise.stop(time + settings.decay);
    }
    else if (settings.type === 'hihat') {
        const bufferSize = ctx.sampleRate * settings.decay;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 10000;
        noise.connect(noiseFilter);
        
        const gain = ctx.createGain();
        noiseFilter.connect(gain);
        gain.connect(ctx.destination);
        
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        noise.start(time);
        noise.stop(time + settings.decay);
    }
    else if (settings.type === 'ride') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(settings.freq, time);
        osc.frequency.exponentialRampToValueAtTime(settings.freq * 2, time + settings.decay); 
        
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        osc.start(time);
        osc.stop(time + settings.decay);
    }
    else if (settings.type === 'cowbell') {
        // Cowbell is usually two oscillators with a harmonic ratio
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = 'square';
        osc2.type = 'square';
        
        osc1.frequency.value = 540;
        osc2.frequency.value = 800;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + settings.decay);
        osc2.stop(time + settings.decay);
    }
}

function handlePadPlay(pad) {
    const sound = pad.getAttribute('data-sound');
    playSound(sound);
    pad.classList.add('playing');
    setTimeout(() => pad.classList.remove('playing'), 100);
}

const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
    if (pad && !pad.classList.contains('playing')) {
        handlePadPlay(pad);
    }
};

export function initSimulator() {
    const pads = document.querySelectorAll('.drum-pad');
    
    pads.forEach(pad => {
        pad.addEventListener('mousedown', () => handlePadPlay(pad));
        pad.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handlePadPlay(pad);
        });
    });

    window.addEventListener('keydown', handleKeyDown);

    const recordBtn = document.getElementById('record-btn');
    const playBtn = document.getElementById('play-btn');
    const statusText = document.getElementById('record-status');

    if(recordBtn) {
        recordBtn.addEventListener('click', () => {
            if(isPlaying) return;

            if(!isRecording) {
                isRecording = true;
                recordedNotes = [];
                startTime = Date.now();
                recordBtn.innerHTML = '<i data-feather="square" class="text-red"></i> Stop Recording';
                recordBtn.classList.add('recording-active');
                statusText.innerText = 'Recording...';
                statusText.style.color = '#ff3b30';
                playBtn.disabled = true;
                if (window.feather) window.feather.replace();
            } else {
                isRecording = false;
                recordBtn.innerHTML = '<i data-feather="circle" class="text-red"></i> Record MIDI (Demo)';
                recordBtn.classList.remove('recording-active');
                statusText.innerText = `Ready (${recordedNotes.length} notes)`;
                statusText.style.color = 'var(--text-secondary)';
                if(recordedNotes.length > 0) playBtn.disabled = false;
                if (window.feather) window.feather.replace();
            }
        });
    }

    if(playBtn) {
        playBtn.addEventListener('click', () => {
            if(recordedNotes.length === 0 || isPlaying || isRecording) return;
            
            isPlaying = true;
            playBtn.disabled = true;
            recordBtn.disabled = true;
            statusText.innerText = 'Playing...';
            statusText.style.color = 'var(--accent)';
            
            const playbackStartTime = Date.now();
            
            recordedNotes.forEach(note => {
                setTimeout(() => {
                    const pad = document.querySelector(`.drum-pad[data-sound="${note.sound}"]`);
                    if(pad) handlePadPlay(pad);
                }, note.time);
            });

            const lastNoteTime = recordedNotes.length > 0 ? recordedNotes[recordedNotes.length - 1].time : 0;
            
            setTimeout(() => {
                isPlaying = false;
                playBtn.disabled = false;
                recordBtn.disabled = false;
                statusText.innerText = `Ready (${recordedNotes.length} notes)`;
                statusText.style.color = 'var(--text-secondary)';
            }, lastNoteTime + 500);
        });
    }
}

export function stopSimulator() {
    window.removeEventListener('keydown', handleKeyDown);
    if(audioCtx) {
        audioCtx.suspend();
    }
}

