
import { url, successNotification, ErrorNotification } from "../utils/utils.js";

const loginForm = document.getElementById('loginForm');

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    
  //  validateInputs();

    document.querySelector("#loginForm button").disabled = true;
    document.querySelector("#loginForm button").innerHTML = `
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

    const formData = new FormData(loginForm);

    const response = await fetch(url + "api/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData,

    });

    if(response.ok){
        const json = await response.json();

        localStorage.setItem("token", json.token);

        loginForm.reset();

        successNotification("Successfully logged in.");

        window.location.pathname = "/home.html";

    }else if(response.status == 422 ){
        const json = await response.json();
       // alert(json.message)
        ErrorNotification(json.message, 3);
    }
    
    document.querySelector("#loginForm button").disabled = false;
    document.querySelector("#loginForm button").innerHTML = `Login`;
 };


