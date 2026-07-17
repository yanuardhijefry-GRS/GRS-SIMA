if (localStorage.getItem("login") != "true") {
    location = "index.html";
}

let anggota = JSON.parse(localStorage.getItem("anggota")) || [];
let editIndex = localStorage.getItem("editIndex");

let fotoBase64 = "";

if (editIndex !== null) {

    let data = anggota[editIndex];

    document.getElementById("id").value = data.id;
    document.getElementById("nama").value = data.nama;
    document.getElementById("jabatan").value = data.jabatan;
    document.getElementById("alamat").value = data.alamat;
    document.getElementById("hp").value = data.hp;

    fotoBase64 = data.foto || "";

    if (fotoBase64 !== "") {
        document.getElementById("preview").src = fotoBase64;
    }

} else {

    let nomor = "GRS-" + String(anggota.length + 1).padStart(4, "0");
    document.getElementById("id").value = nomor;

}

document.getElementById("foto").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        fotoBase64 = e.target.result;
        document.getElementById("preview").src = fotoBase64;

    };

    reader.readAsDataURL(file);

});

document.getElementById("formAnggota").addEventListener("submit", function (e) {

    e.preventDefault();

    const data = {

        id: document.getElementById("id").value,
        nama: document.getElementById("nama").value,
        jabatan: document.getElementById("jabatan").value,
        alamat: document.getElementById("alamat").value,
        hp: document.getElementById("hp").value,
        foto: fotoBase64,
        tanggal: new Date().toLocaleDateString("id-ID")

    };

    if (editIndex !== null) {

        anggota[editIndex] = data;
        localStorage.removeItem("editIndex");
        alert("Data berhasil diperbarui.");

    } else {

        anggota.push(data);
        alert("Data berhasil disimpan.");

    }

    localStorage.setItem("anggota", JSON.stringify(anggota));

    location = "data-anggota.html";

});
