import { url, successNotification, ErrorNotification, getLoggedUser} from "../utils/utils.js";
import { getCar } from "./cars.js";

//called function to be used as validation for users
getLoggedUser();

//Addition of Cars as Admin....this portion may not be accessed by users only.
const signUpForm = document.getElementById('signUpForm');

signUpForm.onsubmit = async (e) => {
    e.preventDefault();

    console.log("anoooo naman niiiii");

    document.querySelector("#signUpForm button").disabled = true;
    document.querySelector("#signUpForm button").innerHTML = `
    <div class="col-sm-12 d-flex justify-content-center align-items-center" >
    <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
    </div>
    <b class="ms-2">Loading Cars...</b>
    </div>`;

    const formData = new FormData(signUpForm);

    // List key/value pairs....validation alert to track the functionality 
for(let [name, value] of formData) {
    alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
  }

    const response = await fetch(url + "api/cars", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,

    });

    if(response.ok){
        // const json = await response.json();
        // console.log(json);

        // document.querySelector(".alert-success").classList.remove("d-none");
        // document.querySelector(".alert-success").classList.add("d-block");

        signUpForm.reset();

        successNotification("You have successfully added a car.",1);

        //automatically close the modal when the form is evaluated
        document.getElementById("modal_close").onclick();

        getCar();

    }else{
        const json = await response.json();
       // alert(json.message)
       
       //automatically close the modal when the form is evaluated
        document.getElementById("modal_close").onclick();   

        ErrorNotification(json.message, 3);

    }
    
    document.querySelector("#signUpForm button").disabled = false;
    document.querySelector("#signUpForm button").innerHTML = `Submit`;
};

