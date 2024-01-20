import { url, successNotification, ErrorNotification} from "../utils/utils.js";

const contactForm = document.getElementById('contactForm');

contactForm.onsubmit = async (e) => {
    e.preventDefault();

    document.querySelector("#contactForm button").disabled = true;
    document.querySelector("#contactForm button").innerHTML = `
    <div class="col-sm-12 d-flex justify-content-center align-items-center" >
    <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
    </div>
    <b class="ms-2">Loading Cars...</b>
</div>`;

    const formData = new FormData(contactForm);

    const response = await fetch(url + "api/contact", {
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

        contactForm.reset();

        successNotification("You have successfully sent your message.", 5)

    }else if(response.status == 422 ){
        const json = await response.json();
       // alert(json.message)
        ErrorNotification(json.message, 5);
    }
    
    document.querySelector("#contactForm button").disabled = false;
     document.querySelector("#contactForm button").innerHTML = `Send Message`;
};


