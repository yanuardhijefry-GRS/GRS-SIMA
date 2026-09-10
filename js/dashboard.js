document.addEventListener("DOMContentLoaded", () => {

const menuBtn=document.getElementById("menuBtn");
const sidebar=document.getElementById("sidebar");
const overlay=document.getElementById("overlay");

menuBtn.addEventListener("click",()=>{

sidebar.classList.toggle("active");
overlay.classList.toggle("active");

});

overlay.addEventListener("click",()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

});

document.querySelectorAll(".sidebar a").forEach(link=>{

link.addEventListener("click",()=>{

if(window.innerWidth<=768){

sidebar.classList.remove("active");
overlay.classList.remove("active");

}

});

});
// ===============================
// DATA RENCANA GIAT
// ===============================

const dataGiat = JSON.parse(localStorage.getItem("rencanaGiat")) || [];

const semuaTeks = document.querySelectorAll("h2, h3, p, div");

semuaTeks.forEach(el => {

    if (el.textContent.trim() === "Rencana Giat (RenGit)") {

        const kartu = el.parentElement;

        if (kartu) {

            const keterangan = kartu.querySelector("p");

            if (keterangan) {

                if (dataGiat.length > 0) {
                    keterangan.textContent =
                        dataGiat.length + " rencana kegiatan";
                } else {
                    keterangan.textContent =
                        "Belum ada rencana kegiatan.";
                }

            }
        }
    }

});
});
