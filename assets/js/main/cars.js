import { url, successNotification, ErrorNotification } from "../utils/utils.js";

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
                <div class="image-thumb">
                        
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

    }else {
        const json = await response.json();
       
        alert(json.message)
    }
}

export {getCar};