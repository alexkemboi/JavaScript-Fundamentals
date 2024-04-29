// Select all elements with the class 'addCart' and assign them to cartButton
let cartButton = document.querySelectorAll('.addCart');

// Select the element with the class 'listCart' and assign it to listCartHTML
let listCartHTML = document.querySelector('.listCart');

// Select the element with the class 'icon-cart' and assign it to iconCart
let iconCart = document.querySelector('.icon-cart');

// Select the span inside the element with the class 'icon-cart' and assign it to iconCartSpan
let iconCartSpan = document.querySelector('.floatingbutton span');

// Select the body element and assign it to body
let body = document.querySelector('body');

// Select the element with the class 'close' and assign it to closeCart
let closeCart = document.querySelector('.close');

// Define the array of products with their details
let products = [
  // Array of product objects

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



];

// Define an empty array to store cart items
let cart = [];

// Log the number of elements selected by cartButton to the console
console.log(cartButton.length)

// Iterate over each element in cartButton and add an event listener to it
for (let i = 0; i < cartButton.length; i++) {
  cartButton[i].addEventListener('click', function (event) {
    // When clicked, get the id of the clicked element and convert it to an integer
    let id_product = parseInt(event.target.id)
    // Log the id_product to the console
    console.log(id_product);
    // Call the addToCart function with the id_product as an argument
    addToCart(id_product);
  })
}

// Toggle the 'showCart' class on the body element when the iconCart element is clicked
iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})

// Toggle the 'showCart' class on the body element when the closeCart element is clicked
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})

// Define a function to add the cart items to local storage
const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Define a function to add the cart items to the HTML
const addCartToHTML = () => {
  // Clear the contents of listCartHTML
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  // If the cart is not empty, iterate over each item in the cart array
  if (cart.length > 0) {
    cart.forEach(item => {
      // Increment the total quantity with the quantity of the current item
      totalQuantity = totalQuantity + item.quantity;
      // Create a new div element for the current item
      let newItem = document.createElement('div');
      // Add the 'item' class to the new div
      newItem.classList.add('item');
      // Set the dataset id of the new div to the product_id of the current item
      newItem.dataset.id = item.product_id;
      // Find the position of the current product in the products array
      let positionProduct = products.findIndex((value) => value.id == item.product_id);
      // Get the product information from the products array
      let info = products[positionProduct];
      // Append the new div to the listCartHTML element with the inner HTML
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.url}">
                </div>
                <div class="name">
                ${info.description}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    })
  }
  // Set the inner text of iconCartSpan to the totalQuantity
  iconCartSpan.innerHTML = totalQuantity;
}

// Add a click event listener to listCartHTML
listCartHTML.addEventListener('click', (event) => {
  // Get the clicked element
  let positionClick = event.target;
  // If the clicked element has the class 'minus' or 'plus', execute the following code
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    // Get the dataset id of the parent of the parent element of the clicked element
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    // Set the type variable to 'minus'
    let type = 'minus';
    // If the clicked element has the class 'plus', set the type variable to 'plus'
    if (positionClick.classList.contains('plus')) {
      type = 'plus';
    }
    // Call the changeQuantityCart function with the product_id and type as arguments
    changeQuantityCart(product_id, type);
  }
})

// Define a function to change the quantity of a cart item
const changeQuantityCart = (product_id, type) => {
  // Find the position of the item in the cart array
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  // If the item is in the cart array, execute the following code
  if (positionItemInCart >= 0) {
    // Get the item information from the cart array
    let info = cart[positionItemInCart];
    // Switch statement to determine the type of action (plus or minus)
    switch (type) {
      case 'plus':
        // Increment the quantity of the item
        cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
        break;

      default:
        // Decrease the quantity of the item
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        // If the new quantity is greater than 0, set the quantity to the new value, otherwise remove the item from the cart array
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  // Update the HTML and local storage with the new cart information
  addCartToHTML();
  addCartToMemory();
}

// Define a function to add a product to the cart
const addToCart = (product_id) => {
  console.log(product_id);
  // Find the position of the product in the cart array
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
  // If the cart is empty, add the product to the cart array with quantity 1
  if (cart.length <= 0) {
    cart = [{
      product_id: product_id,
      quantity: 1
    }];
    // If the product is not in the cart, add it to the cart array with quantity 1
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1
    });
    // If the product is already in the cart, increase its quantity by 1
  } else {
    cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
  }
  // Update the HTML and local storage with the new cart information
  addCartToHTML();
  addCartToMemory();
}
