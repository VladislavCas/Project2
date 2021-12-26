const fullscreenMenu = document.querySelector("#fullscreen-menu");
const fullscreenButton = document.querySelector("#openOverlay");

fullscreenButton.addEventListener('click', function (e) {
    e.preventDefault();

    fullscreenButton.classList.toggle('hamburger--active');
    document.body.classList.toggle('locked');
    fullscreenMenu.classList.toggle('menu--active');

});


