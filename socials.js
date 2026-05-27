// Drumshuffle Wallet Social Passes, Feedback Hub & Admin Panel Logic
document.addEventListener('DOMContentLoaded', () => {
    // Vector SVG Presets mapping
    const svgPresets = {
        youtube: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
        instagram: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
        discord: `<svg viewBox="0 0 127.14 96.36" width="24" height="24" fill="currentColor" stroke="none"><path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2a75.58,75.58,0,0,0,73,0c.79.71,1.63,1.4,2.51,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,123.52,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.14,46,96.14,53,91,65.69,84.69,65.69Z"/></svg>`,
        bandlab: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
        twitter: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        spotify: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12.083c2.4-1.6 5.6-1.6 8 0M9 15.083c1.8-1.2 4.2-1.2 6 0M10 18.083c1.2-.8 2.8-.8 4 0"></path></svg>`,
        twitch: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2z"></path><path d="M11 6h2v6h-2V6zm4 0h2v6h-2V6z"></path></svg>`,
        globe: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
    };

    // Default pre-populated social passes
    const defaultPasses = [
        {
            id: 'pass_1',
            platform: 'YouTube',
            username: '@drumshuffle',
            url: 'https://www.youtube.com/results?search_query=drumshuffle',
            colorType: 'gradient-red',
            colorCustom: '#e52d27',
            iconSource: 'preset',
            iconPreset: 'youtube',
            iconCustom: '',
            fields: [
                { label: 'PLATFORM', value: 'YouTube' },
                { label: 'SUBSCRIBERS', value: '1.5K+' },
                { label: 'UPLOADS', value: 'Covers & Visuals' }
            ]
        },
        {
            id: 'pass_2',
            platform: 'BandLab',
            username: '@drumshuffleofficial',
            url: 'https://bandlab.com/drumshuffleofficial',
            colorType: 'gradient-green',
            colorCustom: '#1db954',
            iconSource: 'preset',
            iconPreset: 'bandlab',
            iconCustom: '',
            fields: [
                { label: 'PLATFORM', value: 'BandLab' },
                { label: 'GENRE', value: 'Rock & Metal' },
                { label: 'COLLABS', value: 'Open for jams' }
            ]
        },
        {
            id: 'pass_3',
            platform: 'Discord',
            username: 'vedbub',
            url: 'https://discord.com',
            colorType: 'gradient-indigo',
            colorCustom: '#5865f2',
            iconSource: 'preset',
            iconPreset: 'discord',
            iconCustom: '',
            fields: [
                { label: 'PLATFORM', value: 'Discord' },
                { label: 'STATUS', value: 'Active Community' },
                { label: 'USER ID', value: 'vedbub' }
            ]
        },
        {
            id: 'pass_4',
            platform: 'Instagram',
            username: '@drumshuffle',
            url: 'https://instagram.com',
            colorType: 'gradient-sunset',
            colorCustom: '#f09433',
            iconSource: 'preset',
            iconPreset: 'instagram',
            iconCustom: '',
            fields: [
                { label: 'PLATFORM', value: 'Instagram' },
                { label: 'ROLE', value: 'Content Creator' },
                { label: 'CONTENT', value: 'Reels & Behind-Scenes' }
            ]
        }
    ];

    // Local State
    let socialPasses = [];
    let feedbacks = [];

    // Load passes from localStorage or load defaults
    function loadSocialPasses() {
        const saved = localStorage.getItem('drumshuffle_social_cards');
        if (saved) {
            try {
                socialPasses = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse social cards from localStorage, fallback to defaults.", e);
                socialPasses = [...defaultPasses];
            }
        } else {
            socialPasses = [...defaultPasses];
            saveSocialPasses();
        }
    }

    function saveSocialPasses() {
        localStorage.setItem('drumshuffle_social_cards', JSON.stringify(socialPasses));
    }

    // Load feedbacks
    function loadFeedbacks() {
        const saved = localStorage.getItem('drumshuffle_feedbacks');
        if (saved) {
            try {
                feedbacks = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse feedbacks", e);
                feedbacks = [];
            }
        } else {
            // Seed a sample feedback if empty so it doesn't look blank
            feedbacks = [
                {
                    id: 'fb_sample',
                    name: 'Dave Grohl',
                    email: 'dave@foofighters.com',
                    message: 'Love your Alesis Nitro Max drum covers, especially the Foo Fighters ones! Keep hitting hard!',
                    timestamp: new Date().toLocaleString()
                }
            ];
            saveFeedbacks();
        }
        updateFeedbackBadge();
    }

    function saveFeedbacks() {
        localStorage.setItem('drumshuffle_feedbacks', JSON.stringify(feedbacks));
        updateFeedbackBadge();
    }

    function updateFeedbackBadge() {
        const badge = document.getElementById('admin-feedback-badge');
        if (!badge) return;

        const count = feedbacks.length;
        if (count > 0) {
            badge.innerText = count;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }

    // Capture homepage feedback submissions
    const homeContactForm = document.getElementById('contact-form');
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', () => {
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const messageEl = document.getElementById('message');

            if (nameEl && emailEl && messageEl) {
                const name = nameEl.value.trim();
                const email = emailEl.value.trim();
                const message = messageEl.value.trim();

                if (name && email && message) {
                    const newFeedback = {
                        id: 'fb_' + Date.now(),
                        name,
                        email,
                        message,
                        timestamp: new Date().toLocaleString()
                    };

                    feedbacks.push(newFeedback);
                    saveFeedbacks();
                    console.log("Feedback captured successfully!");
                }
            }
        });
    }

    // Generate local QR Code SVG using qrcode-generator
    function generateQrSvg(url) {
        try {
            const qr = qrcode(0, 'M');
            qr.addData(url);
            qr.make();
            return qr.createSvgTag(3, 0);
        } catch (e) {
            console.error("QR Code generation failed locally", e);
            return `<svg viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="#f0f0f0"/><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="#666">QR Error</text></svg>`;
        }
    }

    // Render landing page digital wallet cards
    function renderLandingCards() {
        const container = document.getElementById('socials-container');
        if (!container) return;

        container.innerHTML = '';

        socialPasses.forEach((pass) => {
            const card = document.createElement('div');
            
            // Setup card class and styles
            card.className = `wallet-card ${pass.colorType !== 'custom' ? pass.colorType : ''}`;
            if (pass.colorType === 'custom') {
                card.style.backgroundColor = pass.colorCustom;
            }

            // Get platform icon
            let iconHtml = '';
            if (pass.iconSource === 'preset') {
                iconHtml = svgPresets[pass.iconPreset] || svgPresets['globe'];
            } else {
                iconHtml = pass.iconCustom || svgPresets['globe'];
            }

            // Dynamic fields html
            let fieldsHtml = '';
            const displayFields = pass.fields || [];
            displayFields.slice(0, 4).forEach(field => {
                fieldsHtml += `
                    <div class="wallet-field">
                        <span class="field-label">${escapeHtml(field.label)}</span>
                        <span class="field-value">${escapeHtml(field.value)}</span>
                    </div>
                `;
            });

            // Local dynamic QR SVG
            const qrCodeSvg = generateQrSvg(pass.url);

            card.innerHTML = `
                <div class="wallet-card-header">
                    <div class="wallet-card-brand">
                        <img src="./assets/IconYT.png" alt="Drumshuffle" onerror="this.src='https://ui-avatars.com/api/?name=DS&background=EA4335&color=fff&rounded=true&bold=true'">
                        <span>Drumshuffle</span>
                    </div>
                    <div class="wallet-card-icon">
                        ${iconHtml}
                    </div>
                </div>
                <div class="wallet-card-body">
                    <span class="wallet-card-label">USERNAME</span>
                    <h3 class="wallet-card-username">${escapeHtml(pass.username)}</h3>
                    
                    <div class="wallet-card-fields">
                        ${fieldsHtml}
                    </div>
                </div>
                <div class="wallet-card-footer">
                    <div class="wallet-qr-container" title="Click to view larger QR code">
                        <div class="wallet-qr-code">
                            ${qrCodeSvg}
                        </div>
                    </div>
                </div>
                <div class="wallet-pass-shine"></div>
            `;

            // Card click logic: visit profile
            card.addEventListener('click', () => {
                window.open(pass.url, '_blank');
            });

            // QR click logic: stop propagation and open expanded QR modal
            const qrContainer = card.querySelector('.wallet-qr-container');
            qrContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                openQrModal(pass);
            });

            container.appendChild(card);
        });

        // Re-initialize feather icons in cards if feather is present
        if (window.feather) {
            feather.replace();
        }
    }

    // Escape HTML helper
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Modal Control logic
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminPanelModal = document.getElementById('admin-panel-modal');
    const qrModal = document.getElementById('qr-modal');

    function hideAllModals() {
        adminLoginModal.classList.add('hidden');
        adminPanelModal.classList.add('hidden');
        qrModal.classList.add('hidden');
    }

    // Close button triggers
    document.getElementById('close-admin-login-btn').addEventListener('click', hideAllModals);
    document.getElementById('close-admin-panel-btn').addEventListener('click', hideAllModals);
    document.getElementById('close-qr-btn').addEventListener('click', hideAllModals);

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === adminLoginModal || e.target === adminPanelModal || e.target === qrModal) {
            hideAllModals();
        }
    });

    // Secret dev console backdoor
    Object.defineProperty(window, 'ved', {
        get() {
            // Check if already authenticated for this browser session
            if (sessionStorage.getItem('ds_admin_session') === 'authenticated') {
                openAdminPanel();
                return "🔓 Reopening Drumshuffle Admin Dashboard...";
            } else {
                hideAllModals();
                adminLoginModal.classList.remove('hidden');
                document.getElementById('admin-email').focus();
                return "🔐 Opening Drumshuffle Admin Login Panel...";
            }
        },
        configurable: true
    });

    // Admin Login Form Submit Handler
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminLoginError = document.getElementById('admin-login-error');

    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;

        // Credentials aligned with Next.js admin app
        if (email === 'vedsumeet7@gmail.com' && password === 'Ved070112!') {
            sessionStorage.setItem('ds_admin_session', 'authenticated');
            adminLoginError.classList.add('hidden');
            adminLoginForm.reset();
            adminLoginModal.classList.add('hidden');
            showToast("Login Successful! Welcome back Sumeet.", "success");
            openAdminPanel();
        } else {
            adminLoginError.innerText = "Invalid administrator credentials. Access Denied.";
            adminLoginError.classList.remove('hidden');
            
            // Sleek shake animation on invalid credentials
            const modalContent = adminLoginModal.querySelector('.modal-content');
            modalContent.style.animation = 'none';
            setTimeout(() => {
                modalContent.style.animation = 'shake 0.4s ease';
            }, 10);
        }
    });

    // Add keyframe for shake in Javascript if not exists
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-8px); }
                40%, 80% { transform: translateX(8px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Open Admin Dashboard Panel
    function openAdminPanel() {
        hideAllModals();
        adminPanelModal.classList.remove('hidden');
        switchTab('socials'); // default to socials tab
        renderAdminPassesList();
        
        // Clean and reset custom fields editor in the form
        const fieldsEditor = document.getElementById('custom-fields-editor');
        fieldsEditor.innerHTML = '';
        addFieldEditorRow('PLATFORM', ''); // Always prefill standard Platform field
    }

    // Tab Bar Toggling
    const tabBtnSocials = document.getElementById('admin-tab-socials');
    const tabBtnFeedback = document.getElementById('admin-tab-feedback');
    const tabContentSocials = document.getElementById('admin-content-socials');
    const tabContentFeedback = document.getElementById('admin-content-feedback');

    function switchTab(tab) {
        if (tab === 'socials') {
            tabBtnSocials.className = 'btn btn-primary';
            tabBtnFeedback.className = 'btn btn-glass';
            tabContentSocials.classList.remove('hidden');
            tabContentFeedback.classList.add('hidden');
            renderAdminPassesList();
        } else {
            tabBtnSocials.className = 'btn btn-glass';
            tabBtnFeedback.className = 'btn btn-primary';
            tabContentSocials.classList.add('hidden');
            tabContentFeedback.classList.remove('hidden');
            renderFeedbackInbox();
        }
    }

    tabBtnSocials.addEventListener('click', () => switchTab('socials'));
    tabBtnFeedback.addEventListener('click', () => switchTab('socials-feedback')); // Wait, the id is 'socials-feedback' or just 'feedback'
    
    // Support toggle clicks properly
    tabBtnFeedback.addEventListener('click', () => switchTab('feedback'));

    // Render active passes manager in Admin Panel
    function renderAdminPassesList() {
        const container = document.getElementById('admin-passes-list-container');
        if (!container) return;

        container.innerHTML = '';

        socialPasses.forEach(pass => {
            const item = document.createElement('div');
            item.className = 'admin-pass-item';

            // Get background style
            let bgStyle = '';
            if (pass.colorType === 'custom') {
                bgStyle = `background-color: ${pass.colorCustom};`;
            }

            // Get platform icon SVG
            let iconHtml = '';
            if (pass.iconSource === 'preset') {
                iconHtml = svgPresets[pass.iconPreset] || svgPresets['globe'];
            } else {
                iconHtml = pass.iconCustom || svgPresets['globe'];
            }

            item.innerHTML = `
                <div class="admin-pass-item-details">
                    <div class="admin-pass-item-icon ${pass.colorType !== 'custom' ? pass.colorType : ''}" style="${bgStyle}">
                        ${iconHtml}
                    </div>
                    <div class="admin-pass-item-text">
                        <h4>${escapeHtml(pass.platform)}</h4>
                        <p>${escapeHtml(pass.username)}</p>
                    </div>
                </div>
                <button class="delete-pass-btn" data-id="${pass.id}" title="Delete Pass">
                    <i data-feather="trash-2"></i>
                </button>
            `;

            // Delete click listener
            item.querySelector('.delete-pass-btn').addEventListener('click', (e) => {
                const passId = e.currentTarget.getAttribute('data-id');
                deletePass(passId);
            });

            container.appendChild(item);
        });

        if (window.feather) {
            feather.replace();
        }
    }

    // Delete pass
    function deletePass(id) {
        const index = socialPasses.findIndex(p => p.id === id);
        if (index > -1) {
            const deletedPlatform = socialPasses[index].platform;
            socialPasses.splice(index, 1);
            saveSocialPasses();
            renderLandingCards();
            renderAdminPassesList();
            showToast(`${deletedPlatform} pass removed from wallet.`, "success");
        }
    }

    // Render User Feedback Inbox list
    function renderFeedbackInbox() {
        const container = document.getElementById('admin-feedbacks-container');
        if (!container) return;

        container.innerHTML = '';

        if (feedbacks.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:45px 20px; color:var(--text-secondary);">
                    <i data-feather="inbox" style="width:48px; height:48px; margin-bottom:15px; opacity:0.3; stroke: var(--text-secondary);"></i>
                    <p style="font-weight: 600;">Your Inbox is Empty</p>
                    <p style="font-size:0.85rem; opacity:0.7; margin-top:5px;">Any feedback submissions from the homepage form will appear here dynamically!</p>
                </div>
            `;
            if (window.feather) feather.replace();
            return;
        }

        // Display feedbacks from newest to oldest
        const sorted = [...feedbacks].reverse();
        sorted.forEach(fb => {
            const item = document.createElement('div');
            item.className = 'admin-pass-item';
            item.style.flexDirection = 'column';
            item.style.alignItems = 'stretch';
            item.style.gap = '10px';
            item.style.padding = '18px';

            item.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div>
                        <strong style="font-size: 1.05rem; color: var(--text-primary);">${escapeHtml(fb.name)}</strong>
                        <a href="mailto:${escapeHtml(fb.email)}" style="font-size:0.8rem; color:var(--accent); margin-left:12px; text-decoration:none; font-weight:600;">${escapeHtml(fb.email)}</a>
                    </div>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:0.75rem; color:var(--text-secondary); opacity:0.8;">${fb.timestamp}</span>
                        <button class="delete-feedback-btn delete-pass-btn" data-id="${fb.id}" title="Delete Feedback" style="padding:4px;">
                            <i data-feather="trash-2" style="width:14px; height:14px;"></i>
                        </button>
                    </div>
                </div>
                <div style="background:rgba(0,0,0,0.2); padding:12px 15px; border-radius:10px; font-size:0.9rem; white-space:pre-wrap; border:1px solid rgba(255,255,255,0.03); color:var(--text-secondary); line-height:1.4;">${escapeHtml(fb.message)}</div>
            `;

            // Delete click listener
            item.querySelector('.delete-feedback-btn').addEventListener('click', (e) => {
                const fbId = e.currentTarget.getAttribute('data-id');
                deleteFeedback(fbId);
            });

            container.appendChild(item);
        });

        if (window.feather) {
            feather.replace();
        }
    }

    // Delete a feedback
    function deleteFeedback(id) {
        const index = feedbacks.findIndex(f => f.id === id);
        if (index > -1) {
            feedbacks.splice(index, 1);
            saveFeedbacks();
            renderFeedbackInbox();
            showToast("Feedback message deleted.", "success");
        }
    }

    // Clear all feedbacks
    document.getElementById('clear-feedbacks-btn').addEventListener('click', () => {
        if (feedbacks.length === 0) return;
        if (confirm("Are you sure you want to clear all feedback messages?")) {
            feedbacks = [];
            saveFeedbacks();
            renderFeedbackInbox();
            showToast("Feedback inbox cleared.", "success");
        }
    });

    // Form: Toggle color picker for custom solid colors
    const colorPresetSelect = document.getElementById('color-preset');
    const customColorInput = document.getElementById('social-color-custom');

    colorPresetSelect.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            customColorInput.classList.remove('hidden');
        } else {
            customColorInput.classList.add('hidden');
        }
    });

    // Form: Toggle preset dropdown vs custom SVG text-area
    const iconSourceRadios = document.getElementsByName('icon-source');
    const presetIconContainer = document.getElementById('preset-icon-container');
    const customIconContainer = document.getElementById('custom-icon-container');

    iconSourceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'preset') {
                presetIconContainer.classList.remove('hidden');
                customIconContainer.classList.add('hidden');
            } else {
                presetIconContainer.classList.add('hidden');
                customIconContainer.classList.remove('hidden');
            }
        });
    });

    // Form: Dynamic custom fields editor rows
    const addFieldBtn = document.getElementById('add-field-btn');
    const customFieldsEditor = document.getElementById('custom-fields-editor');

    function addFieldEditorRow(labelVal = '', valueVal = '') {
        const row = document.createElement('div');
        row.className = 'dynamic-field-row';
        row.innerHTML = `
            <input type="text" placeholder="Label (e.g. Followers)" value="${escapeHtml(labelVal)}" required style="flex: 1;">
            <input type="text" placeholder="Value (e.g. 10K)" value="${escapeHtml(valueVal)}" required style="flex: 1.2;">
            <button type="button" class="remove-field-btn" title="Remove Field">
                <i data-feather="x" style="width:14px; height:14px;"></i>
            </button>
        `;

        row.querySelector('.remove-field-btn').addEventListener('click', () => {
            row.remove();
        });

        customFieldsEditor.appendChild(row);
        
        if (window.feather) {
            feather.replace();
        }
    }

    addFieldBtn.addEventListener('click', () => addFieldEditorRow());

    // Form: Submit event to add a new pass
    const addSocialForm = document.getElementById('add-social-form');
    addSocialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const platform = document.getElementById('social-platform').value.trim();
        const username = document.getElementById('social-username').value.trim();
        const url = document.getElementById('social-url').value.trim();

        // Get icon sources
        const iconSource = document.querySelector('input[name="icon-source"]:checked').value;
        const iconPreset = document.getElementById('social-icon-preset').value;
        let iconCustom = document.getElementById('social-icon-custom').value.trim();

        // Vector SVG validation
        if (iconSource === 'custom') {
            if (!iconCustom.startsWith('<svg') || !iconCustom.endsWith('</svg>')) {
                showToast("Invalid SVG! Custom vectors must start with '<svg' and end with '</svg>'", "error");
                return;
            }
            if (!iconCustom.includes('viewBox')) {
                iconCustom = iconCustom.replace('<svg', '<svg viewBox="0 0 24 24"');
            }
            if (!iconCustom.includes('width=')) {
                iconCustom = iconCustom.replace('<svg', '<svg width="24" height="24"');
            }
        }

        // Colors
        const colorType = colorPresetSelect.value;
        const colorCustom = customColorInput.value;

        // Custom Fields array mapping
        const fields = [];
        const rows = customFieldsEditor.querySelectorAll('.dynamic-field-row');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const label = inputs[0].value.trim().toUpperCase();
            const value = inputs[1].value.trim();
            if (label && value) {
                fields.push({ label, value });
            }
        });

        // Construct card
        const newPass = {
            id: 'pass_' + Date.now(),
            platform,
            username,
            url,
            colorType,
            colorCustom,
            iconSource,
            iconPreset,
            iconCustom,
            fields
        };

        // Save card and update
        socialPasses.push(newPass);
        saveSocialPasses();
        renderLandingCards();
        renderAdminPassesList();

        // Reset form & display success
        addSocialForm.reset();
        customFieldsEditor.innerHTML = '';
        addFieldEditorRow('PLATFORM', platform);
        
        // Hide custom elements
        customColorInput.classList.add('hidden');
        customIconContainer.classList.add('hidden');
        presetIconContainer.classList.remove('hidden');

        showToast(`${platform} pass successfully added to your wallet!`, "success");
    });

    // Expand QR modal trigger
    function openQrModal(pass) {
        const title = document.getElementById('qr-modal-title');
        const subtitle = document.getElementById('qr-modal-subtitle');
        const container = document.getElementById('qr-modal-code-container');
        const link = document.getElementById('qr-modal-link');

        title.innerText = `${pass.platform} Pass`;
        subtitle.innerText = `Scan to follow ${pass.username}`;
        container.innerHTML = generateQrSvg(pass.url);
        
        const qrSvg = container.querySelector('svg');
        if (qrSvg) {
            qrSvg.setAttribute('width', '100%');
            qrSvg.setAttribute('height', '100%');
        }
        
        link.href = pass.url;

        hideAllModals();
        qrModal.classList.remove('hidden');
        
        if (window.feather) {
            feather.replace();
        }
    }

    // Success / Error Toast notification helpers
    function showToast(message, type = "success") {
        let toast = document.getElementById('ds-app-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'ds-app-toast';
            toast.className = 'ds-toast';
            document.body.appendChild(toast);
        }

        // Reset and apply type styling
        toast.className = `ds-toast ${type === 'success' ? 'ds-toast-success' : 'ds-toast-error'}`;
        
        // Dynamic icons for toast
        const iconHtml = type === 'success' 
            ? `<svg viewBox="0 0 24 24" width="20" height="20" stroke="#30d158" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
            : `<svg viewBox="0 0 24 24" width="20" height="20" stroke="#ff3b30" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

        toast.innerHTML = `${iconHtml} <span>${escapeHtml(message)}</span>`;
        
        // Animate showing
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        // Hide after 3.5s
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // Initial load
    loadSocialPasses();
    loadFeedbacks();
    renderLandingCards();
});
