const shopNowBtn = document.getElementById("shop-now");

const body = document.querySelector("body");

body.addEventListener("click", (evt) => {
    console.log("body clicked");
});

shopNowBtn.addEventListener(
    "click",
    (evt) => {
        alert("You clicked on button");
    },
    { capture: true, once: true,  }
);
