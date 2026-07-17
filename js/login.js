
function login(){

let username =
document.getElementById("username").value;

let password =
document.getElementById("password").value;

if(
username===ADMIN_USERNAME &&
password===ADMIN_PASSWORD
){

localStorage.setItem("login","true");

window.location="dashboard.html";

}else{

document.getElementById("error").innerHTML=
"Username atau Password salah";

}

}

if(localStorage.getItem("login")=="true"){

if(window.location.pathname.includes("index.html")){

window.location="dashboard.html";

}

}const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD = "123456";

function login(){

let username =
document.getElementById("username").value;

let password =
document.getElementById("password").value;

if(
username===ADMIN_USERNAME &&
password===ADMIN_PASSWORD
){

localStorage.setItem("login","true");

window.location="dashboard.html";

}else{

document.getElementById("error").innerHTML=
"Username atau Password salah";

}

}

if(localStorage.getItem("login")=="true"){

if(window.location.pathname.includes("index.html")){

window.location="dashboard.html";

}

}
