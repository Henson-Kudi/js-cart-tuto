// import products from "./products.json" assert { type: "json" };

// console.log(products);

const productsDOM = document.querySelector(".products-center");

async function getProducts(){

}

const displayProducts = () => {
    

    let productsHtml = "";

    products.items?.forEach((product) => {
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

document.addEventListener('DOMContentLoaded', (E)=>{

})

