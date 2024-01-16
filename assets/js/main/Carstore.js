import { url, successNotification, ErrorNotification, getLoggedUser} from "../utils/utils.js";
import { getCar } from "./cars.js";

//called function to be used as validation for users
getLoggedUser();

//Addition of Cars as Admin....this portion may not be accessed by users only.
const signUpForm = document.getElementById('signUpForm');

signUpForm.onsubmit = async (e) => {
    e.preventDefault();

    //console.log("anoooo naman niiiii");


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
// for(let [name, value] of formData) {
//     alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
//   }

let response;

if(update_id == "")
{
    response = await fetch(url + "api/cars", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,

    });
}
else
{
    formData.append("_method", "PUT")

    response = await fetch(url + "api/cars/" + update_id, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,

    });
}


    if(response.ok){
        // const json = await response.json();
        // console.log(json);

        // document.querySelector(".alert-success").classList.remove("d-none");
        // document.querySelector(".alert-success").classList.add("d-block");

        signUpForm.reset();

        update_id = ""; 

        successNotification("You have successfully " + (update_id == "" ? "Created" : "Updated") + " a car.", 1);

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

    update_id = "";
    
    document.querySelector("#signUpForm button").disabled = false;
    document.querySelector("#signUpForm button").innerHTML = `Submit`;
};

let update_id = "";

const showData = async (id) => {

   // document.querySelector(`.trainer-item`).style.backgroundColor = "yellow";
    const response = await fetch(url + "api/cars/" +    id, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },

    });

    if(response.ok)
        {
            const json = await response.json();
            console.log(json);

            update_id = json.carID;

            document.getElementById("manufacturer").value = json.manufacturer;
            document.getElementById("model").value = json.model;
            document.getElementById("price").value = json.price;
            document.getElementById("vin").value = json.vin;
            document.getElementById("description").value = json.description;
            
        }else{
            alert("Unable to Show");
            //document.querySelector(`.trainer-item`).style.backgroundColor = "white";
        }

        document.querySelector("#signUpForm button").textContent = `Update`;
};


export {showData}