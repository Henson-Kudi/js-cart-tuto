// import products from "./products.json" assert { type: "json" };

// console.log(products);

///////////////////////
// GLOBAL VARIABLES //
/////////////////////

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");

const productsDOM = document.querySelector(".products-center");
let buttonsDOM = [];

let cart = [];

async function getProducts() {
    const productsData = await fetch("products.json");

    const products = await productsData.json();

    const items = products?.items?.map((product) => {
        // const { id } = product?.sys;
        const id = product.sys.id;

        const { price, title } = product?.fields;

        const image = product?.fields?.image?.fields?.file?.url;

        return {
            id,
            price,
            title,
            image,
        };
    });

    return items;
}

const displayProducts = (products = []) => {
    let productsHtml = "";

    products?.forEach((product) => {
        productsHtml += `
            <article class="product">
                    <div class="img-container">
                        <img src="${product.image}" alt="product" class="product-img">
                        <button class="bag-btn" data-id=${product.id}>
                            <i class="fas fa-shopping-cart"></i> add to cart
                        </button>
                    </div>
                    <h3>${product.title}</h3>
                    <h4>$${product.price}</h4>
                </article>
                `;
    });

    productsDOM.innerHTML = productsHtml;
};

/////////////////////
/////    LOGIC   ////
////////////////////

// - On page load, get all items in cart and save to variable called cart
// - populate cart page with all items in cart on page load
// -add functionality to open and close modal.
// - add listener to trigger add to cart on click of add to card buuton for each product then automatically disable button
// - add functionality to remove, increase and reduce item in cart

///////////// END /////////

const getCartItems = () => {
    const cartItems = localStorage.getItem("cart");

    return cartItems ? JSON.parse(cartItems) : [];
};

// function showCart() {
//     cartOverlay.classList.add("transparentBcg");
//     cartDOM.classList.add("showCart");
// }

// function hideCart() {
//     cartOverlay.classList.remove("transparentBcg");
//     cartDOM.classList.remove("showCart");
// }

function toggleCart() {
    cartOverlay.classList.toggle("transparentBcg");
    cartDOM.classList.toggle("showCart");
}

function addCartItem(cartItem = {}) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <img src=${cartItem.image} alt="product">
                        <div>
                            <h4>${cartItem.title}</h4>
                            <h5>$${cartItem.price}</h5>
                            <span class="remove-item" data-id=${cartItem.id}>Remove</span>
                        </div>
                        <div>
                            <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
                            <p class="item-amount">${cartItem.amount}</p>
                            <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
                        </div>
                        `;
    cartContent.appendChild(div);
}

function populateCart(cart = []) {
    cart.map((cartItem) => {
        addCartItem(cartItem);
    });
}

function setCartValues(cart = []) {
    let tempTotalValue = 0;
    let itemsTotal = 0;
    cart.map((item) => {
        tempTotalValue += item?.price * item?.amount;
        itemsTotal += item?.amount;
    });

    cartTotal.innerText = parseFloat(tempTotalValue.toFixed(2));
    cartItems.innerText = itemsTotal;
}

function saveCart(cart = []) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getSingleBtn(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
}

function removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    setCartValues(cart);
    saveCart(cart);
    let button = getSingleBtn(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i> add to cart`;
}

function clearCart(){
    // localStorage.removeItem('cart')
    cart.map((item) => removeItem(item?.id));
    // let cartItems = cart.map((item) => item.id);
    // cartItems.forEach((id) => removeItem(id));
    while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
    }
}

function getCartButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
        let id = button.dataset.id; // 1;

        let inCart = cart.find((item) => item.id === id); // check if the product has been added to the cart already

        if (inCart) {
            button.innerText = "In Cart";
            button.disabled = true;
        }
        button.addEventListener("click", (event) => {
            event.target.innerText = "In Cart";
            event.target.disabled = true;
            // get product from products in local storage based on id
            let cartItem = { ...getProduct(id), amount: 1 };
            // add product to the cart
            cart = [...cart, cartItem];

            // save cart to local storage
            saveCart(cart);
            // set cart values
            setCartValues(cart);
            // display cart items
            addCartItem(cartItem);
            // show the cart
            toggleCart();
            // showCart();
        });
    });
}

function getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));

    return products.find((product) => product.id === id);
}

function cartLogic(){
    clearCartBtn.addEventListener("click", () => {
        clearCart();
    });
}

// functionality helps us to setup the cart page by prepopulating the cart page with items thst had already been added to cart each time we load the page
function setupAPP() {
    cart = getCartItems();

    populateCart(cart);

    setCartValues(cart);

    cartBtn.addEventListener("click", toggleCart);
    closeCartBtn.addEventListener("click", toggleCart);
}

document.addEventListener("DOMContentLoaded", (E) => {
    setupAPP();
    getProducts()
        .then((response) => {
            displayProducts(response);

            localStorage.setItem("products", JSON.stringify(response));
        })
        .then(() => {
            // add event listeners to product buttons
            getCartButtons();
            cartLogic()
        })
        .catch((err) => {
            console.log(err);
        });
});
