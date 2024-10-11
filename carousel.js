//== Carousel.js
//
// Modified to be included in index.html, and not a seperate module, we don't
// have to suffer using code sandbox for this...

// DELETE IMPORTS 
// import * as bootstrap from "bootstrap";
// import { favourite } from "./index.js";

//================================================================================
// Added a new function called "setFavoriteCallback" cause carousel references a
// function in index.js BEFORE index.js is loaded.
//================================================================================

// This is used to save the "favorite" function inside of index.js
let favoriteFunction = null;

// This is how we set the "favorite function" from index.js
function setFavoriteCallback(functionName) {
    favoriteFunction = functionName;
}

//================================================================================
// All the code below minus calling the favourite function and changing the name
// start() to startCarousel and clear() to clearCarousel().  This is STOCK
// carousel code from the code sandbox.
//================================================================================

function createCarouselItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#carouselItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;

    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", () => {

        // This is the one line I changed to call the favourite function in index.js
        favoriteFunction(imgId);

        //favourite(imgId);
    });

    return clone;
}

// Changed the name from clear() to clearCarousel()
function clearCarousel() {
    const carousel = document.querySelector("#carouselInner");
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
}

function appendCarousel(element) {
    const carousel = document.querySelector("#carouselInner");

    const activeItem = document.querySelector(".carousel-item.active");
    if (!activeItem) element.classList.add("active");

    carousel.appendChild(element);
}

// Changed the name from start() to startCarousel()
function startCarousel() {

    const multipleCardCarousel = document.querySelector("#carouselExampleControls");

    if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false
    });

    const carouselWidth = $(".carousel-inner")[0].scrollWidth;
    const cardWidth = $(".carousel-item").width();

    let scrollPosition = 0;

    $("#carouselExampleControls .carousel-control-next").unbind();
    $("#carouselExampleControls .carousel-control-next").on(
        "click",
        function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
            scrollPosition += cardWidth;
            $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
            );
        }
        }
    );

    $("#carouselExampleControls .carousel-control-prev").unbind();
    $("#carouselExampleControls .carousel-control-prev").on(
        "click",
        function () {
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                $("#carouselExampleControls .carousel-inner").animate(
                { scrollLeft: scrollPosition },
                600
                );
            }
        }
    );
    } else {
        $(multipleCardCarousel).addClass("slide");
    }
}
