// import products from "./products.json" assert { type: "json" };

// console.log(products);

const productsDOM = document.querySelector(".products-center");

async function getProducts() {
    const productsData = await fetch("products.json");

    const products = await productsData.json();

    const items = products?.items?.map((product) => {});

    const item = [1, 2, 3, 4]

    const [item1, item2] = item;

    return products?.items;
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

document.addEventListener("DOMContentLoaded", (E) => {
    getProducts()
        .then((response) => {
            displayProducts(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
