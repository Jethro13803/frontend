import { url, successNotification, ErrorNotification } from "../utils/utils.js";
import { showData } from "./Carstore.js";

getCar();

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

    }else {
        const json = await response.json();
       
        alert(json.message)
    }
}

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


}

export {getCar};