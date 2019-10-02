console.log("Javascript file successfully loaded!!!");



const form = document.querySelector("form");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.querySelector("input").value;
    const weatherURL = "http://localhost:3000/weather?address=" + location;
    message1.textContent = "Loading...";
    message2.textContent = "";
    fetch(weatherURL).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error;
            } else{
                message1.textContent = data.location ;
                message2.textContent = data.forecast;
            }
        });
    });
});