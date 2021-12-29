const fullscreenMenu = document.querySelector("#fullscreen-menu");
const fullscreenButton = document.querySelector("#openOverlay");

function toggleMenu() {
    fullscreenButton.classList.toggle('hamburger--active');
    document.body.classList.toggle('locked');
    fullscreenMenu.classList.toggle('menu--active');
}

fullscreenButton.addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();
});

fullscreenMenu.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('menu__link')) {
        toggleMenu();
    }
});


