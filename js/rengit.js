// ===============================
// GRS-SIMA
// Modul Rencana Giat
// Tahap 3B
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modalGiat");
    const btnTambah = document.getElementById("btnTambah");
    const btnBatal = document.getElementById("btnBatal");
    const form = document.getElementById("formGiat");

    // Jika ada elemen yang belum ditemukan, hentikan agar tidak error
    if (!modal || !btnTambah || !btnBatal || !form) {
        console.error("Elemen Rencana Giat belum lengkap.");
        return;
    }

    // Buka modal
    btnTambah.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Tutup modal
    btnBatal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Klik di luar modal
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Simpan (sementara)
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        alert("Data berhasil diterima.\nTahap berikutnya akan disimpan ke LocalStorage.");

        form.reset();
        modal.style.display = "none";
    });

});
