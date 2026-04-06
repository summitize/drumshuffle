// Simple Web Audio API Synthesizer for Drum Sounds
let audioCtx;
let recordedNotes = [];
let isRecording = false;
let startTime;

// Frequencies for a synthesized drum kit
const drumKit = {
    'kick': { type: 'kick', freq: 150, decay: 0.5 },
    'snare': { type: 'snare', freq: 250, decay: 0.2 },
    'hihat': { type: 'hihat', freq: 1000, decay: 0.1 },
    'tom1': { type: 'kick', freq: 300, decay: 0.4 },
    'tom2': { type: 'kick', freq: 200, decay: 0.5 },
    'crash': { type: 'hihat', freq: 800, decay: 1.5 }
};

function playSound(soundName) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const settings = drumKit[soundName];
    if(!settings) return;

    const time = audioCtx.currentTime;

    // Record the note if recording
    if (isRecording) {
        recordedNotes.push({
            sound: soundName,
            time: Date.now() - startTime
        });
    }

    if (settings.type === 'kick') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.frequency.setValueAtTime(settings.freq, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        osc.start(time);
        osc.stop(time + settings.decay);
    } 
    else if (settings.type === 'snare') {
        // Simple noise burst for snare
        const bufferSize = audioCtx.sampleRate * settings.decay;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        noise.connect(noiseFilter);
        
        const gain = audioCtx.createGain();
        noiseFilter.connect(gain);
        gain.connect(audioCtx.destination);
        
        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        noise.start(time);
    }
    else if (settings.type === 'hihat') {
        // High frequency noise
        const bufferSize = audioCtx.sampleRate * settings.decay;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 10000;
        noise.connect(noiseFilter);
        
        const gain = audioCtx.createGain();
        noiseFilter.connect(gain);
        gain.connect(audioCtx.destination);
        
        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + settings.decay);
        
        noise.start(time);
    }
}

function handlePadPlay(pad) {
    const sound = pad.getAttribute('data-sound');
    playSound(sound);
    pad.classList.add('playing');
    setTimeout(() => pad.classList.remove('playing'), 100);
}

// Keydown listener
const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    const pad = document.querySelector(\`.drum-pad[data-key="\${key}"]\`);
    if (pad && !pad.classList.contains('playing')) {
        handlePadPlay(pad);
    }
};

export function initSimulator() {
    const pads = document.querySelectorAll('.drum-pad');
    
    pads.forEach(pad => {
        pad.addEventListener('mousedown', () => handlePadPlay(pad));
        // touch support for mobile/tablets
        pad.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handlePadPlay(pad);
        });
    });

    window.addEventListener('keydown', handleKeyDown);

    // Setup recorder
    const recordBtn = document.getElementById('record-btn');
    const playBtn = document.getElementById('play-btn');
    const statusText = document.getElementById('record-status');

    if(recordBtn) {
        recordBtn.addEventListener('click', () => {
            if(!isRecording) {
                isRecording = true;
                recordedNotes = [];
                startTime = Date.now();
                recordBtn.innerText = '🛑 Stop Recording';
                statusText.innerText = 'Recording...';
                statusText.style.color = '#ff0055';
                playBtn.disabled = true;
            } else {
                isRecording = false;
                recordBtn.innerText = '🟢 Record MIDI (Demo)';
                statusText.innerText = \`Ready (\${recordedNotes.length} notes)\`;
                statusText.style.color = '#aaa';
                if(recordedNotes.length > 0) playBtn.disabled = false;
            }
        });
    }

    if(playBtn) {
        playBtn.addEventListener('click', () => {
            if(recordedNotes.length === 0) return;
            statusText.innerText = 'Playing...';
            statusText.style.color = 'var(--primary-neon)';
            
            recordedNotes.forEach(note => {
                setTimeout(() => {
                    const pad = document.querySelector(\`.drum-pad[data-sound="\${note.sound}"]\`);
                    if(pad) handlePadPlay(pad);
                }, note.time);
            });

            // Reset text when done
            const lastNote = recordedNotes[recordedNotes.length - 1];
            setTimeout(() => {
                statusText.innerText = \`Ready (\${recordedNotes.length} notes)\`;
                statusText.style.color = '#aaa';
            }, lastNote.time + 500);
        });
    }
}

export function stopSimulator() {
    window.removeEventListener('keydown', handleKeyDown);
    if(audioCtx) {
        audioCtx.suspend();
    }
}
