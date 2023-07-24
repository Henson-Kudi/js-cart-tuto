// import products from "./products.json" assert { type: "json" };

// console.log(products);



async() => {
    const productsData =  await fetch("products.json");

    const products = await productsData.json()



};
