const knownBands = [
    'foo-fighters', 'green-day', 'red-hot-chili-peppers', 'snow-patrol', 
    'the-beatles', 'bob-marley', 'queen', 'paramore', 'blink-182', 
    'arctic-monkeys', 'bad-company', 'audioslave', 'muse', 'u2', 
    'the-kinks', 'the-strokes', 'kings-of-leon', 'acdc', 'ac-dc',
    'the-police', 'sum-41', 'dave-matthews-band', 'the-black-keys', 
    'rage-against-the-machine', 'biffy-clyro', 'coldplay', 'rush', 
    'eagles', 'dire-straits', 'cream', 'pink-floyd', 'smashing-pumpkins', 
    'maroon-5', 'jamiroquai', 'the-rolling-stones', 'bon-jovi'
];

let selectedFile = "";

document.addEventListener('DOMContentLoaded', () => {
    // Sample Packs Rendering
    const packsData = [
        { title: 'Acoustic Close Kit', filename: 'Kit_1___Acoustic_close.zip', img: 'assets/images/pack_img_acoustic.png' },
        { title: 'Electro Synth Kit', filename: 'Kit_4___Electro.zip', img: 'assets/images/pack_img_electro.png' },
        { title: 'Vintage Vinyl Set', filename: 'Kit_8___Vinyl.zip', img: 'assets/images/pack_img_vinyl.png' },
        { title: 'Electro Kit 2', filename: 'Kit_15___Electro.zip', img: 'assets/images/pack_img_electro.png' },
        { title: 'Kurzweil Drum Machine', filename: 'Kurzweil_Kit_01.zip', img: 'assets/images/pack_img_kurzweil.png' }
    ];
    
    const packsContainer = document.getElementById('packs-container');
    if (packsContainer) {
        packsData.forEach(pack => {
            const card = document.createElement('div');
            card.className = "liquid-card store-card";
            card.style.padding = "0";
            card.style.overflow = "hidden";
            card.innerHTML = \
                <img src="\" alt="\" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 20px; text-align: left;">
                    <h3 style="margin-bottom: 5px;">\</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 15px; font-size: 0.9em;">Includes WAV files for 9 raw hit mappings.</p>
                    <a href="assets/packs/\" download class="btn btn-primary w-100" style="text-align: center;">
                        <i data-feather="download"></i> Download Pack (.zip)
                    </a>
                </div>
            \;
            packsContainer.appendChild(card);
        });
    }

    feather.replace();
    
    fetch('notes.json').then(r=>r.json()).then(data => {
        const categories = {};
        data.forEach(item => {
            let band = 'Other Artists';
            for(let kb of knownBands) {
                 if(item.cleanName.includes(kb)) {
                     band = kb.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                     break;
                 }
            }
            if(!categories[band]) categories[band] = [];
            categories[band].push(item);
        });

        const container = document.getElementById('notes-container');
        container.innerHTML = "";

        const sortedBands = Object.keys(categories).sort();

        sortedBands.forEach(band => {
            const section = document.createElement('div');
            section.innerHTML = \<h2 class="section-title" style="margin-bottom:15px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">\</h2>\;
            
            const grid = document.createElement('div');
            grid.className = "grid-2";
            
            categories[band].forEach(note => {
                let songName = note.cleanName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                // Remove the band name from the song name if possible for cleaner look
                songName = songName.replace(band, '').trim();

                const card = document.createElement('div');
                card.className = "liquid-card store-card";
                card.style.padding = "20px";
                card.innerHTML = \
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <h4 style="margin-bottom:5px;">\</h4>
                            <small style="color:var(--text-secondary);">.pdf transcription</small>
                        </div>
                        <button class="btn btn-glass dl-btn" data-file="\" data-song="\">
                            <i data-feather="download"></i> Get Note
                        </button>
                    </div>
                \;
                grid.appendChild(card);
            });
            section.appendChild(grid);
            container.appendChild(section);
        });
        
        feather.replace();

        document.querySelectorAll('.dl-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                selectedFile = target.getAttribute('data-file');
                const song = target.getAttribute('data-song');
                document.getElementById('modal-song-name').innerText = song;
                document.getElementById('donation-modal').classList.remove('hidden');
            });
        });
    });

    const modal = document.getElementById('donation-modal');
    
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    document.getElementById('modal-free-btn').addEventListener('click', () => {
        window.open(\
otes/DRUMNOTES/\\, '_blank');
        modal.classList.add('hidden');
    });

    document.getElementById('modal-donate-btn').addEventListener('click', async () => {
        // Initialize simple 10rs Razorpay flow without intensive backend verification for now
        const options = {
            key: "YOUR_RAZORPAY_KEY", 
            amount: 1000, 
            currency: "INR",
            name: "Drumshuffle",
            description: "Donation for " + selectedFile,
            handler: function (response) {
                // Payment success, trigger download
                window.open(\
otes/DRUMNOTES/\\, '_blank');
                modal.classList.add('hidden');
                alert("Thank you for your generous support! Your download should begin soon.");
            },
            theme: { color: "#0a84ff" }
        };
        const rzp = new Razorpay(options);
        rzp.open();
    });
});


    const allPacksFiles = ['Kit_10_-_Vinyl.zip', 'Kit_11_-_Vinyl.zip', 'Kit_12_-_Vinyl.zip', 'Kit_13_-_Acoustic.zip', 'Kit_14_-_Acoustic.zip', 'Kit_15_-_Electro.zip', 'Kit_15___Electro.zip', 'Kit_16_-_Electro.zip', 'Kit_17_-_Electro.zip', 'Kit_18_-_Acoustic.zip', 'Kit_1_-_Acoustic_close.zip', 'Kit_1___Acoustic_close.zip', 'Kit_2_-_Acoustic_room.zip', 'Kit_3_-_Acoustic.zip', 'Kit_4_-_Electro.zip', 'Kit_4___Electro.zip', 'Kit_5_-_Electro.zip', 'Kit_6_-_Electro.zip', 'Kit_7_-_Electro.zip', 'Kit_8_-_Vinyl.zip', 'Kit_8___Vinyl.zip', 'Kit_9_-_Vinyl.zip', 'Kurzweil_Kit_01.zip', 'Kurzweil_Kit_02.zip', 'Kurzweil_Kit_03.zip', 'Kurzweil_Kit_04.zip', 'Kurzweil_Kit_05.zip', 'Kurzweil_Kit_06.zip', 'Kurzweil_Kit_07.zip', 'Kurzweil_Kit_08.zip'];
    
    const masterDropdown = document.getElementById('master-pack-dropdown');
    const masterBtn = document.getElementById('master-download-btn');
    
    if (masterDropdown) {
        allPacksFiles.forEach(file => {
            let neatName = file.replace('.zip', '').replace(/_/g, ' ');
            let opt = document.createElement('option');
            opt.value = file;
            opt.innerText = neatName;
            opt.style.color = "black";
            masterDropdown.appendChild(opt);
        });
        
        masterDropdown.addEventListener('change', (e) => {
            if(e.target.value) {
                masterBtn.disabled = false;
            }
        });
        
        masterBtn.addEventListener('click', () => {
             window.open('assets/packs/' + masterDropdown.value, '_blank');
        });
    }
