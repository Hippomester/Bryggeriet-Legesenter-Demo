const menuButton = document.querySelector('.hamburger');
const primaryNavigation = document.querySelector('#primary-navigation');

if (menuButton && primaryNavigation) {
    const mobileMenu = window.matchMedia('(max-width: 760px)');

    function setMenuOpen(isOpen) {
        const expanded = mobileMenu.matches && isOpen;

        primaryNavigation.hidden = mobileMenu.matches && !isOpen;
        menuButton.setAttribute('aria-expanded', String(expanded));
        menuButton.setAttribute('aria-label', expanded ? 'Lukk meny' : 'Åpne meny');
        menuButton.classList.toggle('is-open', expanded);
    }

    setMenuOpen(false);
    document.documentElement.classList.add('js-ready');

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