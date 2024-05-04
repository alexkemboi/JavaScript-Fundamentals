// handle smooth scrolling

const scrollButton = document.getElementById("scrollButton");
const targetDiv = document.getElementById("nikes");

// Smooth scroll function
function smoothScroll(target) {
    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// Event listener for button click
scrollButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default button behavior
    smoothScroll(targetDiv);
});




function createCardElements(images) {
    return images.map(image => {
        return `
            <li class="card2">
                <div class="img">
                    <img src="${image.url}" alt="${image.description}">
                    <h2>${image.description}</h2>
                    <span>$${image.price}</span>
                    <button class="addCart" id="${image.id}">Add to Cart</button>
                </div>
            </li>
        `;
    }).join('');
}


const images = [
    
        {
            "id": 1,
            "description": "Nike Air Force 1",
            "price": 200,
            "url": "./images/nike1.jpg"
        },
        {
            "id": 2,
            "description": "Nike Air Max 90",
            "price": 250,
            "url": "./images/nike2.jpg"
        },
        {
            "id": 3,
            "description": "Nike Air Jordan 1",
            "price": 290,
            "url": "./images/nike6.jpg"
        },
        {
            "id": 4,
            "description": "Nike Blazer Mid",
            "price": 200,
            "url": "./images/nike4.jpg"
        },
        {
            "id": 5,
            "description": "Nike Air Max 97",
            "price": 300,
            "url": "./images/nike5.jpg"
        },
        {
            "id": 6,
            "description": "Nike React Element 55",
            "price": 200,
            "url": "./images/nike6.jpg"
        },
        {
            "id": 7,
            "description": "Nike Dunk Low",
            "price": 200,
            "url": "./images/nike1.jpg"
        },
        {
            "id": 8,
            "description": "Nike Air Jordan 4",
            "price": 200,
            "url": "images/nike1.jpg"
        }
    
    
]

const carousel = document.querySelector(".carousel");
const cartdiv = document.querySelector('.cart');
const cartList = document.querySelector('.cart-list');


const wrapper = document.querySelector(".wrapper");

carousel.innerHTML = createCardElements(images)

const firstCardWidth = carousel.querySelector(".card2").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];




let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);




  function buyitems(){
    var buyItems = document.getElementById('buyItems');
    buyItems.style.display = 'block';
  
    // Remove success message after 3 seconds
    setTimeout(function() {
      buyItems.style.display = 'none';
    }, 5000);
  }
  