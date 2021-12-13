const openButton = document.querySelector("#openOverlay");
const body = document.body;

openButton.addEventListener("click", e => {
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");

    const containerElement = document.createElement("nav");
    containerElement.classList.add("menu-vertical");

    const listElement = document.createElement("ul");
    listElement.classList.add("list");

    function newLi() {
        return document.createElement("li");
    };

    listElement.appendChild(newLi());
    listElement.appendChild(newLi());
    listElement.appendChild(newLi());
    listElement.appendChild(newLi());
    listElement.appendChild(newLi());
    listElement.appendChild(newLi());
    containerElement.appendChild(listElement);
    overlayElement.appendChild(containerElement);
    body.appendChild(overlayElement);
});