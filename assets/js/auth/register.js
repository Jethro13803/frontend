
import { url, successNotification, ErrorNotification, validateInputs } from "../utils/utils.js";

const signUpForm = document.getElementById('signUpForm');

signUpForm.onsubmit = async (e) => {
    e.preventDefault();

    validateInputs();

    document.querySelector("#signUpForm button").disabled = true;
    document.querySelector("#signUpForm button").innerHTML = `
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

    const formData = new FormData(signUpForm);

    const response = await fetch(url + "api/user", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData,

    });

    if(response.ok){
        // const json = await response.json();
        // console.log(json);

        // document.querySelector(".alert-success").classList.remove("d-none");
        // document.querySelector(".alert-success").classList.add("d-block");

        signUpForm.reset();

        successNotification("You have successfully created an account.", 5)

    }else if(response.status == 422 ){
        const json = await response.json();
       // alert(json.message)
        ErrorNotification(json.message, 5);
    }
    
    document.querySelector("#signUpForm button").disabled = false;
    document.querySelector("#signUpForm button").innerHTML = `Create Account`;
};


