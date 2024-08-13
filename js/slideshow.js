const slideDuration = 10000;

let slideImages;
let slideTransitionDuration;

let slideTimeoutId = 0;
let slideCurrentImage = 0;
let slideTransitioning = false;

function initSlideshow()
{
    let imagesContainer = document.getElementById("slideshow-images")
    slideTransitionDuration = parseInt(window.getComputedStyle(imagesContainer).getPropertyValue("--slideshow-transition-duration"));
    let images = imagesContainer.children;
    slideImages = [images.length];
    for (let i = 0; i < images.length; i++) {
        slideImages[i] = new SlideImage(images[i], createSlideshowControl(i));
        if (i == 0) {
            showElement(slideImages[i].element, true);
            showElement(slideImages[i].control, true);
        }
        else {
            showElement(slideImages[i].element, false);
            showElement(slideImages[i].control, false);
        }
    }
    startLoop();
}

function createSlideshowControl(imageIndex) {
    let control = document.createElement("div");
    document.getElementById("slideshow-controls").appendChild(control);
    control.classList.add("slideshow-control");
    control.onclick = () => { setActiveImage(imageIndex); };
    return control;
}

function setActiveImage(index) {
    if (slideTransitioning) {
        return;
    }
    if (index >= slideImages.length || index < 0) {
        return;
    }
    if (index == slideCurrentImage) {
        return;
    }
    clearTimeout(slideTimeoutId);
    slideTransitioning = true;
    showElement(slideImages[index].element, true);
    showElement(slideImages[index].control, true);
    showElement(slideImages[slideCurrentImage].element, false);
    showElement(slideImages[slideCurrentImage].control, false);
    slideCurrentImage = index;
    setTimeout(() => {
        slideTransitioning = false;
        startLoop();
    }, slideTransitionDuration);
}

function startLoop()
{
    if (slideTransitioning) {
        return;
    }
    slideTimeoutId = setTimeout(() => {
        setActiveImage(getIncrementedslideCurrentImage());
    }, slideDuration);
}

function getIncrementedslideCurrentImage() {
    if (slideCurrentImage + 1 >= slideImages.length) {
        return 0;
    }
    return slideCurrentImage + 1;
}

function getDecrementedslideCurrentImage() {
    if (slideCurrentImage - 1 < 0) {
        return slideImages.length - 1;
    }
    return slideCurrentImage - 1;
}

function SlideImage(element, control) 
{
    this.element = element;
    this.control = control;
}