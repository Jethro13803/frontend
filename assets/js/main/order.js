import { url, successNotification, ErrorNotification, getLoggedUser} from "../utils/utils.js";

//called function to be used as validation for users
getLoggedUser();

//Addition of Cars as Admin....this portion may not be accessed by users only.
const orderForm = document.getElementById('orderForm');

orderForm.onsubmit = async (e) => {
    e.preventDefault();
    //console.log("Tskkkkk");
    let response;
    let cont;
   
    document.querySelector("#orderForm button").disabled = true;
    document.querySelector("#orderForm button").innerHTML = `
    <div class="col-sm-12 d-flex justify-content-center align-items-center" >
    <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
    </div>
    <b class="ms-2">Loading Cars...</b>
    </div>`;

    const formData = new FormData(orderForm);

//   //  List key/value pairs....validation alert to track the functionality 
// for(let [name, value] of formData) {
//     alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
//   }

     response = await fetch(url + "api/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
        });

            
        if(response.ok){
            response = await fetch(url + "api/cars", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            
            json.forEach(element => {

                cont = element.price
                console.log(cont);
            });
        }

    
        if(response.ok){
            response = await fetch(url + "api/order", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            

            const json = await response.json();
            let container = "";
            json.forEach(element => {
                container = `
                <div>
                <h1>Thank you for buying</h1>
                <br>
                <h2>Here's the summary of your order</h2>
                <br>
                <span>Status: ${element.status}</span>
                <br>
                <span id= "span2">Quantity: ${element.quantity}</span>
                <br>
                <span id= "span2">Sales Total: $ ${cont * element.quantity}</span>
                <br>
                <span id= "span2">Payment Method: ${element.payment_method}</span>
                <br>
                <br>
                <span id= "span2">Do you want to continue?</span>
                <a href="/cars.html" class="reg">YES</a>
                <a href="/home.html" class="reg">NO</a> 
                </div>

                
                `;
            });

            document.getElementById("content").innerHTML = container;
        }





        // document.querySelector(".alert-success").classList.remove("d-none");
        // document.querySelector(".alert-success").classList.add("d-block");

        // orderForm.reset();

        // successNotification("You have successfully ordered a car.", 1);


else{
        const json = await response.json();
       console.log(json.message)
       

        ErrorNotification(json.message, 3);

     
    
    //document.querySelector("#orderForm button").disabled = false;
   // document.querySelector("#orderForm button").innerHTML = `Order Now`;
}
};