import { url } from "../utils/utils.js";

const logout = document.getElementById("logout")

logout.onclick = async() => {

    const response = await fetch(url + "api/logout", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }

    });

    if(response.ok){
        localStorage.clear();

        window.location.pathname = "/index.html";

    }else {
        const json = await response.json();
       
        alert(json.message)
    }
}

