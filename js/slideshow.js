const slideDuration = 6000;

let slideImages;

function initSlideshow()
{
    slideImages = document.getElementById("slideshow-images").children;
    for (let i = 0; i < slideImages.length; i++) {
        createSlideshowControl(i);
    }
}

function createSlideshowControl(imageIndex) {
    let control = document.createElement("div");
    document.getElementById("slideshow-controls").appendChild(control);
    control.classList.add("slideshow-control");
    control.onclick = () => { setActiveImage(imageIndex); };
}

function setActiveImage(index) {

    alert("image is " + index);
}