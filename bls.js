const savedTheme = localStorage.getItem('bls-theme');
document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light');

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.hamburger');
    const primaryNavigation = document.querySelector('#primary-navigation');

    if (menuButton && primaryNavigation) {
        const mobileMenu = window.matchMedia('(max-width: 760px)');

        function setMenuOpen(isOpen) {
            const expanded = mobileMenu.matches && isOpen;

            primaryNavigation.classList.toggle('is-open', expanded);
            primaryNavigation.inert = mobileMenu.matches && !expanded;
            menuButton.setAttribute('aria-expanded', String(expanded));
            menuButton.setAttribute('aria-label', expanded ? 'Lukk meny' : 'Åpne meny');
            menuButton.classList.toggle('is-open', expanded);
        }

        setMenuOpen(false);

        menuButton.addEventListener('click', function() {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            setMenuOpen(!isOpen);
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false);
                menuButton.focus();
            }
        });

        mobileMenu.addEventListener('change', function() {
            setMenuOpen(false);
        });
    }

    const darkModeToggle = document.querySelector('#dark-mode-toggle');

    function animateDarkModeToggle(button) {
        button.classList.remove('is-animating');

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        void button.offsetWidth; // Restart the CSS animation on repeated clicks.
        button.classList.add('is-animating');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('animationend', function(event) {
            if (event.target === darkModeToggle) {
                darkModeToggle.classList.remove('is-animating');
            }
        });

        darkModeToggle.addEventListener('click', function(event) {
            event.preventDefault();
            animateDarkModeToggle(darkModeToggle);
            const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('bls-theme', nextTheme);
        });
    }
});
