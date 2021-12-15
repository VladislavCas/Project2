const fullscreenMenu = document.querySelector("#fullscreen-menu");
const fullscreenButton = document.querySelector("#openOverlay");

fullscreenButton.addEventListener('click', function (e) {
    e.preventDefault();

    fullscreenButton.classList.toggle('hamburger--active');
    fullscreenMenu.classList.toggle('menu--active');
});


