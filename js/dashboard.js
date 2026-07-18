const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.onclick = function(){
    sidebar.classList.toggle("active");
};
