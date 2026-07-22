// ===============================
// GRS-SIMA
// Modul : Rencana Giat
// ===============================

const modal = document.getElementById("modalGiat");
const btnTambah = document.getElementById("btnTambah");
const btnBatal = document.getElementById("btnBatal");
const formGiat = document.getElementById("formGiat");

// Buka Form
btnTambah.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Tutup Form
btnBatal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Klik di luar modal
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Submit Form
formGiat.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Tahap berikutnya data akan disimpan ke LocalStorage.");

    formGiat.reset();
    modal.style.display = "none";
});
