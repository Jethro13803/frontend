import { setRouter } from "../router/router.js";

setRouter();

//Backend connections
const url = "http://vehishop.test/"

//Registration Notification
function successNotification(message = "", seconds = 0){
    document.querySelector(".alert-success").classList.remove("d-none");
    document.querySelector(".alert-success").classList.add("d-block");
    document.querySelector(".alert-success").innerHTML = message;

    if(seconds != 0){
        setTimeout(function(){
            document.querySelector(".alert-success").classList.remove("d-block");
            document.querySelector(".alert-success").classList.add("d-none");
            document.querySelector(".alert-success").innerHTML = "";
        }, seconds*1000);
    }
}

function ErrorNotification(message = "", seconds = 0){
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector(".alert-danger").classList.add("d-block");
    document.querySelector(".alert-danger").innerHTML = message;

    if(seconds !=0){
        setTimeout(function(){
            document.querySelector(".alert-danger").classList.remove("d-block");
            document.querySelector(".alert-danger").classList.add("d-none");
            document.querySelector(".alert-danger").innerHTML = "";
        }, seconds*1000);
    }
}

//Registration validation
const lastname = document.getElementById('lastname');
const firstname = document.getElementById('firstname');
const middlename = document.getElementById('middlename');
const email = document.getElementById('email');
const phone_number = document.getElementById('phone_number');
const address = document.getElementById('address');
const password = document.getElementById('password');
const password2 = document.getElementById('password_confirmation');

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const lastnameValue = lastname.value.trim();
    const firstnameValue = firstname.value.trim();
    const middlenameValue = middlename.value.trim();
    const emailValue = email.value.trim();
    const phone_numberValue = phone_number.value.trim();
    const addressValue = address.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(lastnameValue === '') {
        setError(lastname, 'Last name is required');
    } else {
        setSuccess(lastname);
    }

    if(firstnameValue === '') {
        setError(firstname, 'First name is required');
    } else {
        setSuccess(firstname);
    }

    if(middlenameValue === '') {
        setError(middlename, 'Middle name is required');
    } else {
        setSuccess(middlename);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(phone_numberValue === '') {
        setError(phone_number, 'Phone number is required');
    } else if(phone_numberValue.length < 11 || phone_numberValue.length > 12) {
        setError(phone_number, 'Enter a valid phone number');
    }else {
        setSuccess(phone_number);
    }

    if(addressValue === '') {
        setError(address, 'Username is required');
    } else {
        setSuccess(address);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};


export {url, successNotification, ErrorNotification, validateInputs};