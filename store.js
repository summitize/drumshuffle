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
