// import products from "./products.json" assert { type: "json" };

// console.log(products);

const productsDOM = document.querySelector(".products-center");

async function getProducts() {
    const productsData = await fetch("products.json");

    const products = await productsData.json();

    const items = products?.items?.map((product) => {
        // const { id } = product?.sys;
        const id = product.sys.id

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

// function to help us update or set the total number of items and total price of all items in cart
function setCartTotalValues(cart) {
    let tempTotalAmount = 0;
    let itemsTotalItems = 0;
    cart.map((item) => {
        tempTotalAmount += item.price * item.amount;
        itemsTotalItems += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
}

// function to populate the cart with items
function populateCart(cart) {
    cart.forEach((item) => {
        addCartItem(item);
    });
}

// funtionality to render an actual cart item
function addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <img src=${item.image} alt="product">
                        <div>
                            <h4>${item.title}</h4>
                            <h5>$${item.price}</h5>
                            <span class="remove-item" data-id=${item.id}>Remove</span>
                        </div>
                        <div>
                            <i class="fas fa-chevron-up" data-id=${item.id}></i>
                            <p class="item-amount">${item.amount}</p>
                            <i class="fas fa-chevron-down" data-id=${item.id}></i>
                        </div>
                        `;
    cartContent.appendChild(div);
}

// function helps to get all the items in cart (Items that have been added to local storage)
const getCartItems = ()=>{
    const cartItems = localStorage.getItem('cart')

    return cartItems ? JSON.parse(cartItems) : []
}

/////////////////////
/////    LOGIC   ////
////////////////////

// - On page load, get all items in cart and save to variable called cart
// - populate cart page with all items in cart on page load
// -add functionality to open and close modal.
// 

// functionality helps us to setup the cart page by prepopulating the cart page with items thst had already been added to cart each time we load the page
function setupAPP() {
    // cart = getCartItems(); //3
    // setCartTotalValues(cart); //3
    // populateCart(cart); //3
    cartBtn.addEventListener("click", showCart); // 1
    closeCartBtn.addEventListener("click", hideCart); //2
}

document.addEventListener("DOMContentLoaded", (E) => {
    // setupAPP()
    getProducts()
        .then((response) => {
            displayProducts(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
