import { initSimulator, stopSimulator } from './simulator.js';

// Define the views as HTML strings
const views = {
    dashboard: `
        <h1 class="page-title">Welcome to Drumshuffle</h1>
        <p>The ultimate hub for drummers. Watch covers, practice to drumless tracks, and explore top gear!</p>
        
        <div class="grid-2">
            <div class="glass-card">
                <h3>Latest YouTube Cover</h3>
                <p>Check out my latest drumming video!</p>
                <!-- Using a placeholder YouTube video embed (a popular drum cover or royalty free track) -->
                <div class="video-responsive">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div class="glass-card">
                <h3>Quick Stats & Activity</h3>
                <ul style="list-style: none; margin-top:1rem; display:flex; flex-direction:column; gap:0.5rem;">
                    <li>🔥 <strong>Current Streak:</strong> 5 Days practicing</li>
                    <li>🥁 <strong>Favorite Kit:</strong> Alesis Nitro Max</li>
                    <li>🎧 <strong>Recent Track:</strong> "Everlong - Foo Fighters" (Drumless)</li>
                </ul>
                <button class="neon-btn" style="margin-top:2rem;" onclick="document.querySelector('[data-view=simulator]').click()">Jump to Simulator</button>
            </div>
        </div>
    `,
    simulator: `
        <h1 class="page-title">Drum Simulator</h1>
        <p>Play using your mouse or keyboard! Press the keys below to jam.</p>
        
        <div class="glass-card">
            <div class="recorder-controls">
                <button id="record-btn" class="neon-btn" style="border-color: #ff0055; color: #ff0055;">🟢 Record MIDI (Demo)</button>
                <button id="play-btn" class="neon-btn" disabled>▶ Playback</button>
                <span id="record-status" style="align-self:center; margin-left:1rem; color: #aaa;">Ready</span>
            </div>

            <div class="kit-container">
                <div class="drum-pad" data-key="a" data-sound="hihat">
                    <span class="key">A</span>
                    <span class="label">Hi-Hat</span>
                </div>
                <div class="drum-pad" data-key="s" data-sound="snare">
                    <span class="key">S</span>
                    <span class="label">Snare</span>
                </div>
                <div class="drum-pad" data-key="d" data-sound="kick">
                    <span class="key">D</span>
                    <span class="label">Kick</span>
                </div>
                <div class="drum-pad" data-key="f" data-sound="tom1">
                    <span class="key">F</span>
                    <span class="label">High Tom</span>
                </div>
                <div class="drum-pad" data-key="g" data-sound="tom2">
                    <span class="key">G</span>
                    <span class="label">Mid Tom</span>
                </div>
                <div class="drum-pad" data-key="h" data-sound="crash">
                    <span class="key">H</span>
                    <span class="label">Crash</span>
                </div>
            </div>
        </div>
    `,
    splitter: `
        <h1 class="page-title">Stem Splitter & Play-alongs</h1>
        <p>Want to play along to your favorite songs? Use stem splitting AI to remove the original drums!</p>
        
        <div class="grid-3">
            <a href="https://moises.ai/" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Web & Mobile</span>
                <h3>Moises.ai</h3>
                <p>The easiest way to separate vocals, drums, and bass from any song directly on your phone or browser.</p>
            </a>
            <a href="https://www.bandlab.com/splitter" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Free Online</span>
                <h3>BandLab Splitter</h3>
                <p>A great free tool to quickly split tracks into 4 stems. Perfect for making quick drumless play-alongs.</p>
            </a>
            <a href="https://github.com/facebookresearch/demucs" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Open Source AI</span>
                <h3>Demucs (Meta)</h3>
                <p>Advanced users: Run this open-source state-of-the-art AI on your computer to get the highest quality stems.</p>
            </a>
        </div>

        <div class="glass-card" style="margin-top: 2rem;">
            <h3>Music Notes & Tabs</h3>
            <p>Looking for sheet music or drum tabs for songs?</p>
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <a href="https://www.songsterr.com/a/wsa/drums-tabs-s0t2" target="_blank" class="neon-btn">Search Songsterr Tabs</a>
                <a href="https://musescore.com/" target="_blank" class="neon-btn">Search MuseScore</a>
            </div>
        </div>
    `,
    resources: `
        <h1 class="page-title">Gear & Resources Hub</h1>
        <p>My top recommendations for beginner drummers, software, and free sounds.</p>
        
        <h2 style="margin: 2rem 0 1rem; color: var(--primary-neon);">Free MIDI Sound Packs</h2>
        <div class="grid-2">
            <a href="https://muted.io/drum-patterns/" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Interactive</span>
                <h3>Muted.io Patterns</h3>
                <p>Visually see drum patterns in a grid and download the MIDI files for your DAW.</p>
            </a>
            <a href="https://mobilemusicpro.com/" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Download</span>
                <h3>MobileMusicPro Essentials</h3>
                <p>Great starter pack for hip-hop, rock, and EDM beats for your projects.</p>
            </a>
        </div>

        <h2 style="margin: 2rem 0 1rem; color: var(--primary-neon);">Beginner Gear</h2>
        <div class="grid-3">
            <a href="https://www.alesis.com/products/view2/nitro-max-kit" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Electronic Kit</span>
                <h3>Alesis Nitro Max</h3>
                <p>The best value beginner electronic kit with mesh heads for a realistic feel.</p>
            </a>
            <a href="https://www.roland.com/us/products/td-02kv/" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Electronic Kit</span>
                <h3>Roland TD-02KV</h3>
                <p>Extremely durable and sounds fantastic, perfect for practicing in an apartment or bedroom.</p>
            </a>
            <a href="https://www.sweetwater.com/c1016--Drumsticks" target="_blank" class="glass-card resource-card">
                <span class="resource-tag">Accessories</span>
                <h3>Drumsticks (5A)</h3>
                <p>Start with a standard pair of 5A sticks from Vic Firth or Promark for the best balance.</p>
            </a>
        </div>
        
        <h2 style="margin: 2rem 0 1rem; color: var(--primary-neon);">Software (DAWs)</h2>
        <div class="grid-2">
            <div class="glass-card">
                <h3>GarageBand</h3>
                <p>Free on Mac/iPad. The absolute best way to start recording your electronic kit via USB MIDI.</p>
            </div>
            <div class="glass-card">
                <h3>BandLab</h3>
                <p>A free, browser-based DAW that you can use on any PC or Chromebook to start making beats.</p>
            </div>
        </div>
    `
};

// Routing Logic
const mainContent = document.getElementById('main-content');
const navLinks = document.querySelectorAll('.nav-links li');

function renderView(viewName) {
    if(!views[viewName]) return;
    
    // Stop simulator if navigating away
    if(viewName !== 'simulator') {
        stopSimulator();
    }

    // Inject HTML
    mainContent.innerHTML = '<div class="view-section active">' + views[viewName] + '</div>';
    feather.replace(); // re-initialize icons, though mainly used in sidebar 

    // Update Sidebar state
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(\`[data-view="\${viewName}"]\`).classList.add('active');

    // Initialize Simulator if view is active
    if(viewName === 'simulator') {
        initSimulator();
    }
}

// Event Listeners for Sidebar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view');
        renderView(view);
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    renderView('dashboard');
});
