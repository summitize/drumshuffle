// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    feather.replace();

    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;

    // Check for saved theme
    const savedTheme = localStorage.getItem('drumshuffle-theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Fallback to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', defaultTheme);
        updateThemeIcon(defaultTheme);
    }

    // Toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('drumshuffle-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            // Give it a sun icon when in dark mode (suggesting click changes to light)
            themeIcon.setAttribute('data-feather', 'sun');
        } else {
            // Give it a moon icon when in light mode (suggesting click changes to dark)
            themeIcon.setAttribute('data-feather', 'moon');
        }
        feather.replace(); // re-initialize inner svg
    }

    // Feedback Form Logic
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // In a real app, you'd send fetch request here.
            // We just mock success for the prototype.
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                successMsg.classList.remove('hidden');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }
});
