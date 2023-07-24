// import products from "./products.json" assert { type: "json" };

// console.log(products);



const displayProducts = async() => {
    const productsData =  await fetch("products.json");

    const products = await productsData.json()

    products.items
    

};

