let header;
let headerFullOffsetHeight;

let pageNavigationLinks;
let activePageLink;

let responsiveMenuOpen = false;
let responsiveMenu;
let openResponsiveMenuButton;
let closeResponsiveMenuButton;

function initHeader() {
    header = document.querySelector("header");

    initResponsiveMenu();

    headerFullOffsetHeight = header.offsetHeight;
    let links = document.getElementById("page-navigation").children;
    pageNavigationLinks = [links.length];
    for (let i = 0; i < links.length; i++) {
        pageNavigationLinks[i] = new PageNavigationLink(links[i]);
    }
    registerCustomScrollHandler(new CustomScrollHandler(handlePageScrolling));
}

function initResponsiveMenu() {
    responsiveMenu = document.getElementById("header-websites-menu");
    openResponsiveMenuButton = document.getElementById("header-websites-menu-open");
    closeResponsiveMenuButton = document.getElementById("header-websites-menu-close");

    let button = document.getElementById("header-websites-menu-button");
    button.addEventListener("click", () => {
        openResponsiveMenu(!responsiveMenuOpen);
    });
    openResponsiveMenu(false);
}

function openResponsiveMenu(open) {
    responsiveMenuOpen = open;
    if (open) {
        openResponsiveMenuButton.classList.remove("active");
        openResponsiveMenuButton.classList.add("inactive");
        closeResponsiveMenuButton.classList.remove("inactive");
        closeResponsiveMenuButton.classList.add("active");
        responsiveMenu.classList.add("active");
        responsiveMenu.classList.remove("inactive");
    }
    else {
        closeResponsiveMenuButton.classList.remove("active");
        closeResponsiveMenuButton.classList.add("inactive");
        openResponsiveMenuButton.classList.remove("inactive");
        openResponsiveMenuButton.classList.add("active");
        responsiveMenu.classList.remove("active");
        responsiveMenu.classList.add("inactive");
    }
}

function handlePageScrolling() {
    if (window.scrollY < pageNavigationLinks[0].linkedElement.getBoundingClientRect().bottom) {
        showPageLink(pageNavigationLinks[0]);
    }
    else if (window.scrollY + window.innerHeight >= pageNavigationLinks[pageNavigationLinks.length - 1].linkedElement.offsetTop + pageNavigationLinks[pageNavigationLinks.length - 1].linkedElement.offsetHeight) {
        showPageLink(pageNavigationLinks[pageNavigationLinks.length - 1]);
    }
    else {
        if (pageNavigationLinks.length < 3) {
            return;
        }
        for (let i = 1; i < pageNavigationLinks.length - 1; i++) {
            if (!pageNavigationLinks[i] || !pageNavigationLinks[i].linkedElement) {
                continue;
            }
            if (pageNavigationLinks[i] == activePageLink) {
                continue;
            }
            if (window.scrollY < pageNavigationLinks[i].linkedElement.offsetTop + pageNavigationLinks[i].linkedElement.offsetHeight - pageNavigationLinks[i + 1].offset &&
                window.scrollY > pageNavigationLinks[i].linkedElement.offsetTop - pageNavigationLinks[i].offset) {
                showPageLink(pageNavigationLinks[i]);
                return;
            }
        }
    }
}

function showPageLink(pageLink) {
    if (activePageLink) {
        showElement(activePageLink.element, false);
    }
    activePageLink = pageLink;
    showElement(activePageLink.element, true);
}

function getHeaderHeightDifference() {
    return Math.abs(headerFullOffsetHeight - header.offsetHeight);
}

function PageNavigationLink(element) {
    this.element = element;
    this.offset = parseInt(element.getAttribute("data-page-scroll-offset"));
    if (!this.offset) {
        this.offset = 0;
    }
    try {
        this.linkedElement = document.querySelector(element.getAttribute("data-page-scroll-target"));
        this.element.addEventListener("click", () => {
            if (this.linkedElement == header) {
                scrollTo(0, 0);
                return;
            }
            scrollTo(0, this.linkedElement.offsetTop - this.offset + getHeaderHeightDifference());
        });
    } catch {
        console.error("Missing a target in page navigation.");
    }
}