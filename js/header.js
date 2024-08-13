let pageNavigationLinks;
let activePageLink;

function initHeader()
{
    let links = document.getElementById("page-navigation").children;
    pageNavigationLinks = [links.length];
    for (let i = 0; i < links.length; i++) {
        pageNavigationLinks[i] = new PageNavigationLink(links[i]);
    }

    registerCustomScrollHandler(new CustomScrollHandler(handlePageScrolling));
}

function handlePageScrolling()
{
    if (window.scrollY < pageNavigationLinks[0].linkedElement.getBoundingClientRect().bottom) {
        showPageLink(pageNavigationLinks[0]);
    }
    else if (window.scrollY + window.innerHeight >= pageNavigationLinks[pageNavigationLinks.length - 1].linkedElement.offsetTop + pageNavigationLinks[pageNavigationLinks.length - 1].linkedElement.offsetHeight) 
    {
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
            if (window.scrollY < pageNavigationLinks[i].linkedElement.offsetTop + pageNavigationLinks[i].linkedElement.offsetHeight &&
                window.scrollY > pageNavigationLinks[i].linkedElement.offsetTop) {
                showPageLink(pageNavigationLinks[i]);
                return;
            }
        }
    }
}

function showPageLink(pageLink) {
    if (activePageLink) {
        activePageLink.element.classList.remove("active");
        activePageLink.element.classList.add("inactive");
    }
    activePageLink = pageLink;
    activePageLink.element.classList.add("active");
    activePageLink.element.classList.remove("inactive");
}

function PageNavigationLink(element)
{
    this.element = element;
    try {
    this.linkedElement = document.querySelector(element.getAttribute("href").toString());
    } catch
    {
        console.error("Missing an href in page navigation.");
    }
}