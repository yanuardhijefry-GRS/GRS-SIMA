// ===============================
// GRS-SIMA
// Modul Rencana Giat
// Tahap 3C
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modalGiat");
    const btnTambah = document.getElementById("btnTambah");
    const btnBatal = document.getElementById("btnBatal");
    const form = document.getElementById("formGiat");
    const tbody = document.getElementById("dataGiat");

    let dataGiat = JSON.parse(localStorage.getItem("rencanaGiat")) || [];
    let editIndex = -1;
    
    tampilkanData();

    btnTambah.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    btnBatal.addEventListener("click", () => {
        modal.style.display = "none";
        form.reset();
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            form.reset();
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const giat = {
            nama: document.getElementById("namaGiat").value,
            jenis: document.getElementById("jenisGiat").value,
            tanggal: document.getElementById("tglMulai").value,
            lokasi: document.getElementById("lokasi").value,
            status: "Direncanakan"
        };

       if(editIndex === -1){
    dataGiat.push(giat);
}else{
    dataGiat[editIndex] = giat;
    editIndex = -1;
}

        localStorage.setItem("rencanaGiat", JSON.stringify(dataGiat));

        tampilkanData();

        form.reset();
        modal.style.display = "none";
    });

    function tampilkanData() {

        tbody.innerHTML = "";

        if (dataGiat.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;padding:25px">
                        Belum ada data Rencana Giat
                    </td>
                </tr>
            `;
            return;
        }

        dataGiat.forEach((item, index) => {

            tbody.innerHTML += `
                <tr>
                    <td>${item.tanggal}</td>
                    <td>${item.nama}</td>
                    <td>${item.jenis}</td>
                    <td>${item.lokasi}</td>
                    <td>${item.status}</td>
                   <td>
                    <button onclick="editGiat(${index})">✏ Edit</button>
                    <button onclick="hapusGiat(${index})">🗑 Hapus</button>
                    </td>
                </tr>
            `;
        });

    }

    window.hapusGiat = function(index){

        if(confirm("Hapus rencana giat ini?")){

            dataGiat.splice(index,1);

            localStorage.setItem("rencanaGiat", JSON.stringify(dataGiat));

            tampilkanData();

        }
    window.editGiat = function(index){

        editIndex = index;

    const item = dataGiat[index];

    document.getElementById("namaGiat").value = item.nama;
    document.getElementById("jenisGiat").value = item.jenis;
    document.getElementById("tglMulai").value = item.tanggal;
    document.getElementById("lokasi").value = item.lokasi;

    modal.style.display = "flex";

}
    }

});
