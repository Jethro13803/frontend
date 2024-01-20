import { url, successNotification, ErrorNotification, getLoggedUser } from "../utils/utils.js";
import { showData } from "./Carstore.js";


getCar();
getLoggedUser();

// let response;

async function getCar(){
     const response = await fetch(url + "api/cars", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }

    });

    if(response.ok){
        const json = await response.json();
        let container = "";
        json.forEach(element => {
            container += `<div class="col-lg-4">
                <div class="trainer-item">
                <div class="card" data_id="${element.carID}></div>
                <div class="image-thumb1">

                <nav class="navbar">
                    <ul>
                        <li>
                        <button type="button" class="btn btn-outline-secondary btn -sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul>
                                <li><a href="#" class="edt" id="button_edit" data_id="${element.carID}">Edit</a></li>
                                <li><a href="#" class="edt" id="button_delete" data_id="${element.carID}">Delete</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                </div>
                    <div class="image-thumb">
                        <img src="${url}/storage/${element.imageURL}">
                    </div>
                    <div class="down-content">

                        <span>
                            <del><sup>$</sup>59999 </del> &nbsp; <sup>$</sup> ${element.price}
                        </span>
                        <p>
                        <i class="fa fa-dashboard"></i> ${element.manufacturer}
                        </p>

                        <p>
                        <i class="fa fa-cogs" aria-hidden="true"></i> ${element.model} &nbsp;&nbsp;&nbsp;
                        </p>

                        <p>
                            <i class="fa fa-dashboard"></i> ${element.vin} &nbsp;&nbsp;&nbsp;
                        </p>
                
                        <h4 class="des">${element.description}</h4>
                
                        <ul class="social-icons">
                            <li><a href="car-details.html">+ View Car</a></li>
                            <li><a href = "/order.html">Order Now</a></li>
                         </ul>  
                    </div>
                </div>
            </div>`
    });


    document.getElementById("getCar").innerHTML = container;
    
    document.querySelectorAll("#button_edit").forEach((element) => {
        element.addEventListener("click", editaction);
    });

    document.querySelectorAll("#button_delete").forEach((element) => {
        element.addEventListener("click", deletion);
    });

    // document.querySelectorAll("#myBtn1").forEach((element) => {
    //     element.addEventListener("click", getModal);
    // });


    // getOrder();

}else {
    const json = await response.json();
    
    alert(json.message)
}
};


const deletion = async (e) => {
if(confirm("Are you sure you want to delete this item?"))
{
    const id = e.target.getAttribute("data_id");


        document.querySelector(`.trainer-item`).style.backgroundColor = "red";
    const response = await fetch(url + "api/cars/" + id, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }

    });

    if(response.ok)
    {
        //const json = await response.json();
        //  console.log(json);

        document.querySelector(`.trainer-item`).remove();
    }else{
        alert("Unable to delete");
        document.querySelector(`.trainer-item`).style.backgroundColor = "white";
    }
}

}

const editaction = async (e) => {
    const id = e.target.getAttribute("data_id");

    showData(id);
 //open modal when clicked. 
 document.getElementById("myBtn").onclick();

}; 


// const getModal = async(e) => {
//     // Get the modal
//     var modal = document.getElementById("myModal1");
  
//     // Get the button that opens the modal
//     var btn = document.getElementById("myBtn1");
    
//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];
  
//     // When the user clicks on the button, open the modal
//     btn.onclick = function() {
//       modal.style.display = "block";
//     }
  
//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//       modal.style.display = "none";
//     }
  
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     }
//   };


//   //order
//   async function getOrder() {
    

//     const orderForm = document.getElementById('orderForm');

//     orderForm.onsubmit = async (e) => {
//         e.preventDefault();
//        // console.log("Tskkkkk");


//     document.querySelector("#orderForm button").disabled = true;
//     document.querySelector("#orderForm button").innerHTML = `
//     <div class="col-sm-12 d-flex justify-content-center align-items-center" >
//     <div class="spinner-border" role="status">
//         <span class="visually-hidden"></span>
//     </div>
//     <b class="ms-2">Loading Cars...</b>
//     </div>`;

//     const formData = new FormData(orderForm);

// //   //  List key/value pairs....validation alert to track the functionality 
// for(let [name, value] of formData) {
//     alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
//   }

//     const response = await fetch(url + "api/order", {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: formData,

//     });

//     if(response.ok){
//         const json = await response.json();
//         console.log(json);

//         // const response = await fetch(url + "api/cars", {
//         //     headers: {
//         //         Accept: "application/json",
//         //         Authorization: "Bearer " + localStorage.getItem("token"),
//         //     },
//         // });






//         // document.querySelector(".alert-success").classList.remove("d-none");
//         // document.querySelector(".alert-success").classList.add("d-block");

//         // orderForm.reset();

//         // successNotification("You have successfully ordered a car.", 1);


//     }else{
//         const json = await response.json();
//        console.log(json.message)
       

//         ErrorNotification(json.message, 3);

//     }
    
//     document.querySelector("#orderForm button").disabled = false;
//    // document.querySelector("#orderForm button").innerHTML = `Order Now`;
// };
// };



export {getCar};