// Web Audio API Sample-based Synthesizer Update
let audioCtx;
let recordedNotes = [];
let isRecording = false;
let startTime;
let isPlaying = false;

// Audio buffer caching
let buffers = {};
let currentKit = 'acoustic';

const kitManifest = {
    'acoustic': {
        base: 'samples/musicradar-drum-samples/musicradar-drum-samples/Drum Kits/Kit 1 - Acoustic close/',
        bg: 'assets/images/sim_bg_acoustic.png',
        files: {
            'kick': 'CYCdh_K1close_Kick-01.wav',
            'snare': 'CYCdh_K1close_Snr-01.wav',
            'hihat': 'CYCdh_K1close_ClHat-01.wav',
            'openhihat': 'CYCdh_K1close_OpHat-01.wav',
            'tom1': 'CYCdh_K1close_SdSt-01.wav',
            'tom2': 'CYCdh_K1close_PdHat-02.wav',
            'ride': 'CYCdh_K1close_PdHat-03.wav',
            'crash': 'CYCdh_K1close_Flam-01.wav',
            'cowbell': 'CYCdh_K1close_Rim-01.wav'
        }
    },
    'electro': {
        base: 'samples/musicradar-drum-samples/musicradar-drum-samples/Drum Kits/Kit 4 - Electro/',
        bg: 'assets/images/pack_img_kurzweil.png',
        files: {
            'kick': 'CYCdh_ElecK01-Kick01.wav',
            'snare': 'CYCdh_ElecK01-Snr01.wav',
            'hihat': 'CYCdh_ElecK01-ClHat01.wav',
            'openhihat': 'CYCdh_ElecK01-OpHat01.wav',
            'tom1': 'CYCdh_ElecK01-Tom01.wav',
            'tom2': 'CYCdh_ElecK01-Tom02.wav',
            'ride': 'CYCdh_ElecK01-Cymbal.wav',
            'crash': 'CYCdh_ElecK01-Cymbal.wav',
            'cowbell': 'CYCdh_ElecK01-ClHat03.wav'
        }
    },
    'electro2': {
        base: 'samples/musicradar-drum-samples/musicradar-drum-samples/Drum Kits/Kit 15 - Electro/',
        bg: 'assets/images/pack_img_electro.png',
        files: {
            'kick': 'CYCdh_ElecK05-Kick01.wav',
            'snare': 'CYCdh_ElecK05-Snr01.wav',
            'hihat': 'CYCdh_ElecK05-ClHat01.wav',
            'openhihat': 'CYCdh_ElecK05-OpHat01.wav',
            'tom1': 'CYCdh_ElecK05-ClHat03.wav',
            'tom2': 'CYCdh_ElecK05-ClHat04.wav',
            'ride': 'CYCdh_ElecK05-Clap01.wav',
            'crash': 'CYCdh_ElecK05-OpHat02.wav',
            'cowbell': 'CYCdh_ElecK05-Clap02.wav'
        }
    },
    'vinyl': {
        base: 'samples/musicradar-drum-samples/musicradar-drum-samples/Drum Kits/Kit 8 - Vinyl/',
        bg: 'assets/images/pack_img_vinyl.png',
        files: {
            'kick': 'CYCdh_VinylK1-Kick01.wav',
            'snare': 'CYCdh_VinylK1-Snr01.wav',
            'hihat': 'CYCdh_VinylK1-ClHat01.wav',
            'openhihat': 'CYCdh_VinylK1-OpHat.wav',
            'tom1': 'CYCdh_VinylK1-Tamb.wav',
            'tom2': 'CYCdh_VinylK1-Shkr02.wav',
            'ride': 'CYCdh_VinylK1-Shkr01.wav',
            'crash': 'CYCdh_VinylK1-OpHat.wav',
            'cowbell': 'CYCdh_VinylK1-ClHat02.wav'
        }
    },
    'kurzweil': {
        base: 'samples/musicradar-drum-samples/musicradar-drum-samples/Drum Kits/Kurzweil Kit 01/',
        bg: 'assets/images/pack_img_kurzweil.png',
        files: {
            'kick': 'CYCdh_Kurz01-Kick01.wav',
            'snare': 'CYCdh_Kurz01-Snr01.wav',
            'hihat': 'CYCdh_Kurz01-ClHat.wav',
            'openhihat': 'CYCdh_Kurz01-OpHat01.wav',
            'tom1': 'CYCdh_Kurz01-Tom01.wav',
            'tom2': 'CYCdh_Kurz01-Tom02.wav',
            'ride': 'CYCdh_Kurz01-Ride01.wav',
            'crash': 'CYCdh_Kurz01-Crash01.wav',
            'cowbell': 'CYCdh_Kurz01-SdSt.wav'
        }
    }
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

// Prefetch and decode wav files for the specific kit
async function loadKit(kitName) {
    const ctx = initAudio();
    const kitObj = kitManifest[kitName];
    if(!kitObj) return;
    
    // Set simulator backdrop image visually
    const bgImg = document.querySelector('.drum-kit-bg');
    if (bgImg) {
        bgImg.src = kitObj.bg;
        bgImg.onerror = () => { bgImg.src = 'assets/DrumKit.png' }; // fallback
    }

    // Load each pad file asynchronously
    for (const [padName, filename] of Object.entries(kitObj.files)) {
        try {
            const resp = await fetch(kitObj.base + filename);
            if (!resp.ok) continue;
            const arrayBuf = await resp.arrayBuffer();
            const decodedBuf = await ctx.decodeAudioData(arrayBuf);
            buffers[padName] = decodedBuf;
        } catch(e) {
            console.error('Failed processing ' + filename, e);
            if (window.location.protocol === 'file:' && padName === 'kick') {
                alert("Drum Simulator Error: Your browser restricts loading local audio files directly from file:/// paths. Please use a Local Server extension or view this live on GitHub to hear the drums play!");
            }
        }
    }
}

function playSound(soundName) {
    const ctx = initAudio();
    if (!buffers[soundName]) return; // Guard clause if buffer failed to load
    
    const time = ctx.currentTime;

    if (isRecording) {
        recordedNotes.push({
            sound: soundName,
            time: Date.now() - startTime
        });
    }

    const source = ctx.createBufferSource();
    source.buffer = buffers[soundName];
    source.connect(ctx.destination);
    source.start(time);
}

function handlePadPlay(pad) {
    const sound = pad.getAttribute('data-sound');
    playSound(sound);
    pad.classList.add('playing');
    setTimeout(() => pad.classList.remove('playing'), 100);
}

const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    const pad = document.querySelector('.drum-pad[data-key="' + key + '"]');
    if (pad && !pad.classList.contains('playing')) {
        handlePadPlay(pad);
    }
};

export function initSimulator() {
    // Initial Setup
    loadKit('acoustic');
    
    const kitSelector = document.getElementById('kit-selector');
    if (kitSelector) {
        kitSelector.addEventListener('change', (e) => {
            loadKit(e.target.value);
            currentKit = e.target.value;
        });
    }

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
                statusText.innerText = 'Ready (' + recordedNotes.length + ' notes)';
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
                    const pad = document.querySelector('.drum-pad[data-sound="' + note.sound + '"]');
                    if(pad) handlePadPlay(pad);
                }, note.time);
            });

            const lastNoteTime = recordedNotes.length > 0 ? recordedNotes[recordedNotes.length - 1].time : 0;
            
            setTimeout(() => {
                isPlaying = false;
                playBtn.disabled = false;
                recordBtn.disabled = false;
                statusText.innerText = 'Ready (' + recordedNotes.length + ' notes)';
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

