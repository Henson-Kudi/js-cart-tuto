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
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
}

// function helps to get all the items in cart (Items that have been added to local storage)
const getCartItems = ()=>{
    const cartItems = localStorage.getItem('cart')

    return cartItems ? JSON.parse(cartItems) : []
}

// functionality helps us to setup the cart page by prepopulating the cart page with items thst had already been added to cart each time we load the page
function setupAPP() {
    cart = getCartItems();
    setCartTotalValues(cart);
    populateCart(cart);
    cartBtn.addEventListener("click", showCart);
    closeCartBtn.addEventListener("click", hideCart);
}

document.addEventListener("DOMContentLoaded", (E) => {
    getProducts()
        .then((response) => {
            displayProducts(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
