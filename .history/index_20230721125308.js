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

const productsDOM = document.querySelector(".products-center");

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

function populateCart(cart=[]){
    cart.map(cartItem => {
        addCartItem(cart)
    })
}

// functionality helps us to setup the cart page by prepopulating the cart page with items thst had already been added to cart each time we load the page
function setupAPP() {
    cart = getCartItems();

    cartBtn.addEventListener("click", toggleCart);
    closeCartBtn.addEventListener("click", toggleCart);
}

document.addEventListener("DOMContentLoaded", (E) => {
    setupAPP();
    getProducts()
        .then((response) => {
            displayProducts(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
