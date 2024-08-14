function showElement(element, show) {
    if (show) {
        element.classList.add("active");
        element.classList.remove("inactive");
    }
    else {
        element.classList.add("inactive");
        element.classList.remove("active");
    }
}

let pageTargetScrollElements = [];
let fixedScrollElements = [];
let horizontalScrollers = [];
let customScrollHandlers = new Array();

function initScroll() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    scrollTo({
        top: 0,
        left: 0,
        behaviour: 'instant',
    });
    initPageTargetScrolls();
    initHorizontalScrollers();
    initFixedScrolls();
}

function handleScroll() {
    handleFixedScrolls();
    handleCustomScrolls();
}

function initPageTargetScrolls() {
    let pageScrolls = document.querySelectorAll("[data-page-scroll-target]");
    for (let i = 0; i < pageScrolls.length; i++) {
        pageTargetScrollElements[i] = new PageTargetScroll(pageScrolls[i]);
    }
}

function initFixedScrolls() {
    let fixedScrolls = document.querySelectorAll("[data-scroll-fixed]");
    fixedScrollElements = [fixedScrolls.length];
    for (let i = 0; i < fixedScrolls.length; i++) {
        fixedScrollElements[i] = new FixedScrollElement(fixedScrolls[i]);
    }
    handleFixedScrolls();
}

function handleFixedScrolls() {
    for (let i = 0; i < fixedScrollElements.length; i++) {
        if (window.scrollY >= fixedScrollElements[i].top) {
            fixedScrollElements[i].element.classList.add("fixed");
        }
        else if (window.scrollY < fixedScrollElements[i].bottom) {
            fixedScrollElements[i].element.classList.remove("fixed");
        }
    }
}

function registerCustomScrollHandler(handler)
{
    customScrollHandlers.push(handler);
    handleCustomScrolls();
}

function handleCustomScrolls() {
    for (let i = 0; i < customScrollHandlers.length; i++)
    {
        customScrollHandlers[i].handler();
    }
}

function initHorizontalScrollers()
{
    let scrollers = document.querySelectorAll("[data-horizontal-scroller]");
    horizontalScrollers = [scrollers.length];
    for (let i = 0; i < scrollers.length; i ++) {
        horizontalScrollers[i] = new HorizontalScroller(scrollers[i]);
        //switchHorizontalScrollerLoop(horizontalScrollers[i]);
    }
}

function switchHorizontalScrollerLoop(scroller)
{
    if (scroller.element.classList.contains("inactive")) {
        showElement(scroller.element, true);
    }
    else if (scroller.element.classList.contains("active")) {
        showElement(scroller.element, false);
    }
    scroller.timeoutId = setTimeout(() => { switchHorizontalScrollerLoop(scroller); }, scroller.activeDuration);
}

function handleHorizontalScrollerResize(scroller) 
{
    if (scroller.element.scrollWidth <= document.querySelector("body").clientWidth) {
        showElement(scroller.element, false);
        clearTimeout(scroller.timeoutId);
        scroller.timeoutId = 0;
        return;
    }
    let amount = -scroller.element.scrollWidth + window.innerWidth - 12 - parseInt(window.getComputedStyle(scroller.element).getPropertyValue("padding-left"));
    let duration = Math.floor((Math.abs(amount) / scroller.element.scrollWidth) * scroller.duration);
    scroller.activeDuration = duration;
    scroller.element.style.setProperty("--scroller-scroll-duration", duration.toString().concat("ms"));
    scroller.element.style.setProperty("--scroller-scroll-amount", amount.toString().concat("px"));
    if (scroller.timeoutId == 0) {
        switchHorizontalScrollerLoop(scroller);
    }
}

function PageTargetScroll(element) {
    this.element = element;
    this.targetElement = document.querySelector(this.element.getAttribute("data-page-scroll-target"));
    this.offset = parseInt(this.element.getAttribute("data-page-scroll-offset"));
    if (!this.offset) {
        this.offset = 0;
    }
    this.element.addEventListener("click", () => { scrollTo(0, this.targetElement.offsetTop + this.offset); });
}

function HorizontalScroller(element) {
    this.element = element;
    this.duration = parseInt(this.element.getAttribute("data-horizontal-scroller"));
    this.activeDuration = this.duration;
    this.timeoutId = 0;
    this.element.style.setProperty("--scroller-scroll-duration", this.duration.toString().concat("ms"));
    window.addEventListener("resize", () => { handleHorizontalScrollerResize(this); });
    handleHorizontalScrollerResize(this);
}

function FixedScrollElement(element) {
    this.element = element;
    this.top = element.getBoundingClientRect().top;
    this.bottom = element.getBoundingClientRect().bottom;
}

function CustomScrollHandler(handler)
{
    this.handler = handler;
}