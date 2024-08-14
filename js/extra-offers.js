let extraOffers;
let extraOffersPreview;
let activeExtraOffer;

function initExtraOffers() {
    extraOffersPreview = document.getElementById("extra-offers-preview");
    let exofs = document.getElementById("extra-offers-wrapper").children;
    extraOffers = [];
    for (let i = 0; i < exofs.length; i++) {
        extraOffers[i] = new ExtraOffer(exofs[i]);
    }
}

function showExtraOfferPreview(exof) {
    if (activeExtraOffer && activeExtraOffer == exof) {
        return;
    }
    extraOffersPreview.querySelector("img").setAttribute("src", exof.imageSource);
    extraOffersPreview.querySelector("article").querySelector("h2").textContent = exof.header2;
    extraOffersPreview.querySelector("article").querySelector("p").textContent = exof.paragraph;
    extraOffersPreview.classList.add("active");
    activeExtraOffer = exof;
    scrollTo(0, (extraOffersPreview.offsetTop + parseInt(window.getComputedStyle(extraOffersPreview).getPropertyValue("--open-height")) + 20) - window.innerHeight);
}

function hideExtraOfferPreview() {
    activeExtraOffer = null;
    extraOffersPreview.classList.remove("active");
    scrollTo(0, document.getElementById("extra-offers").offsetTop);
}

function ExtraOffer(element) {
    this.element = element;
    this.header2 = element.querySelector("h2").textContent;
    this.paragraph = element.querySelector("p").textContent;
    this.imageSource = element.querySelector("img").getAttribute("src");
    element.addEventListener("click", () => { showExtraOfferPreview(this); });
}