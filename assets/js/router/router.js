function setRouter(){
    switch(window.location.pathname){
        case "/":
        case "/login.html":
        case "/registration.html":
            if(localStorage.getItem("token")){
                window.location.pathname = "/home.html"
            }
        break;
        case "/home.html":
        case "/cars.html":
        case "/about.html":
        case "/blog-details.html":
        case "/blog.html":
        case "/car-details.html":
        case "/contact.html":
        case "/faq.html":
        case "/team.html":
        case "/testimonials.html":
        case "/terms.html":
        case "/order.html":
            if(!localStorage.getItem("token")){
                window.location.pathname = "/login.html"
            }
            break;

        default:
            break;
    }
}

export {setRouter};