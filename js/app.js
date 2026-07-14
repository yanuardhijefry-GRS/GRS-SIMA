/* =====================================================
   GRS-SIMA
   Storage Manager
===================================================== */

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc
   query,
   where
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
const STORAGE_KEY = "grs_sima_anggota";

class StorageManager {

    static getData() {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Data rusak", e);
            return [];
        }
    }

    static saveData(data) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );
    }

    static generateId() {

        const data = this.getData();

        if (data.length === 0) {
            return "GRS0001";
        }

        const last = data[data.length - 1].id;

        const number = parseInt(
            last.replace("GRS", "")
        );

        return "GRS" +
            String(number + 1).padStart(4, "0");
    }

    static add(anggota) {

        const data = this.getData();

        anggota.id = this.generateId();

        anggota.createdAt = new Date().toISOString();

        data.push(anggota);

        this.saveData(data);

        return anggota;
    }

    static update(id, anggotaBaru) {

        let data = this.getData();

        data = data.map(item => {

            if (item.id === id) {

                return {
                    ...item,
                    ...anggotaBaru,
                    id: id
                };

            }

            return item;

        });

        this.saveData(data);
    }

    static delete(id) {

        const data = this.getData()
            .filter(item => item.id !== id);

        this.saveData(data);
    }

static getById(id) {

    return this.getData().find(item =>
        item.id === id ||
        item.nomor === id
    );

}

    static count() {

        return this.getData().length;

    }

}/* =====================================================
   GRS-SIMA
   Tambah Anggota
===================================================== */

function simpanData(){

    console.log("SIMPAN DATA BERJALAN");



    let anggota = {

        nomor: document.getElementById("nomor").value.trim(),

        nama: document.getElementById("nama").value.trim(),

        nik: document.getElementById("nik").value.trim(),

        jabatan: document.getElementById("jabatan").value.trim(),

        hp: document.getElementById("hp").value.trim(),

        email: document.getElementById("email").value.trim(),

        alamat: document.getElementById("alamat").value.trim(),

        foto: document.getElementById("preview").src

    };

    if(anggota.nomor==""){
        alert("Nomor Register wajib diisi");
        return;
    }

    if(anggota.nama==""){
        alert("Nama wajib diisi");
        return;
    }

    const editId = localStorage.getItem("editAnggota");

if(editId){

    StorageManager.update(editId, anggota);

    localStorage.removeItem("editAnggota");

    alert("Data berhasil diperbarui.");

}else{
   
    StorageManager.add(anggota);

    addDoc(collection(db,"members"), anggota)
    .then(()=>{
        console.log("Backup Firebase berhasil");
    })
    .catch((error)=>{
        console.error(error);
    });

    alert("Data berhasil disimpan.");

}
window.location.href = "data-anggota.html";

}/* ===========================================
   Tampilkan Data Anggota
=========================================== */

 function tampilkanAnggota(){

    const tabel = document.getElementById("tabelAnggota");
    const cari = document.getElementById("cari");

    if(!tabel) return;

    const keyword = cari ? cari.value.toLowerCase() : "";

    const data = StorageManager.getData();

    tabel.innerHTML = "";

    if(data.length === 0){

        tabel.innerHTML = `
        <tr>
            <td colspan="7">Belum ada data anggota</td>
        </tr>
        `;

        return;
    }

    let ditemukan = false;

    data.forEach((a)=>{

        if(a.nama.toLowerCase().includes(keyword)){

            ditemukan = true;

            tabel.innerHTML += `
            <tr>

                <td>${a.nomor}</td>

                <td>
                    <img src="${a.foto}" width="60">
                </td>

                <td>${a.nama}</td>

                <td>${a.nik}</td>

                <td>${a.jabatan}</td>

                <td>${a.alamat}</td>

                <td>${a.hp}</td>

                <td>

<button onclick="editAnggota('${a.id}')">

✏️ Edit

</button>

<button onclick="hapusAnggota('${a.id}')">

🗑️ Hapus

</button>

<button onclick="cetakKTA('${a.id}')">

 KTA

</button>

</td>

            </tr>
            `;

        }

    });

    if(!ditemukan){

        tabel.innerHTML = `
        <tr>
            <td colspan="7">Data tidak ditemukan</td>
        </tr>
        `;

    }

}

document.addEventListener("DOMContentLoaded", tampilkanAnggota);

function previewFoto(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(x){

        const img = document.getElementById("preview");

        if(img){
            img.src = x.target.result;
        }

    };

    reader.readAsDataURL(file);

}

function hapusAnggota(id){

    if(!confirm("Yakin ingin menghapus anggota ini?")){
        return;
    }

    StorageManager.delete(id);

    tampilkanAnggota();

}

function editAnggota(id){

    localStorage.setItem("editAnggota", id);

    window.location.href = "anggota.html";

}

function bukaKTA(id){

    localStorage.setItem("ktaId", id);

    window.location.href = "kta.html";

}

/* ===========================================
   Load Data Edit Anggota
=========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const id = localStorage.getItem("editAnggota");

    if (!id) return;

    const anggota = StorageManager.getById(id);

    if (!anggota) return;

    if(document.getElementById("nomor"))
        document.getElementById("nomor").value = anggota.nomor;

    if(document.getElementById("nama"))
        document.getElementById("nama").value = anggota.nama;

    if(document.getElementById("nik"))
        document.getElementById("nik").value = anggota.nik;

    if(document.getElementById("jabatan"))
        document.getElementById("jabatan").value = anggota.jabatan;

    if(document.getElementById("hp"))
        document.getElementById("hp").value = anggota.hp;

    if(document.getElementById("email"))
        document.getElementById("email").value = anggota.email;

    if(document.getElementById("alamat"))
        document.getElementById("alamat").value = anggota.alamat;

    if(document.getElementById("preview"))
        document.getElementById("preview").src = anggota.foto;

});


/* ===========================================
   Dashboard Statistik
=========================================== */

function dashboardStatistik(){

    const total = document.getElementById("totalAnggota");
    const pengurus = document.getElementById("totalPengurus");

    if(!total) return;

    const data = StorageManager.getData();

    total.innerText = data.length;

    const jumlahPengurus = data.filter(a =>
        a.jabatan !== "Anggota"
    ).length;

    if(pengurus){
        pengurus.innerText = jumlahPengurus;
    }

}

document.addEventListener(
    "DOMContentLoaded",
    dashboardStatistik
);


/* ===========================================
   CETAK KTA
=========================================== */



function cetakKTA(id) {
    localStorage.setItem("cetakKTA", id);
    window.location.href = "kta.html";
}
document.addEventListener(
    "DOMContentLoaded",
    tampilkanKTA
);

/* ===========================================
   KTA Anggota
=========================================== */


function tampilkanKTA(){

    const area = document.getElementById("kartuArea");
    if(!area) return;

    const id = localStorage.getItem("cetakKTA");
    if(!id){
        area.innerHTML = "<h3>Data anggota tidak ditemukan</h3>";
        return;
    }

    const anggota = StorageManager.getById(id);

    if(!anggota){
        area.innerHTML = "<h3>Anggota tidak ditemukan</h3>";
        return;
    }

    area.innerHTML = `
    <div class="kta-depan">

        <img src="img/kta-depan.PNG" class="bg-kta" alt="KTA Depan">

        <img src="${anggota.foto}" class="foto-kta">

        <div class="nama-kta">
            ${anggota.nama}
        </div>

        <div class="nomor-kta">
            ${anggota.nomor}
        </div>

        <div id="qrcode" class="qr-kta"></div>

    </div>
    `;
    const qr = document.getElementById("qrcode");

new QRCode(qr,{
    text: "https://yanuardhijefry-grs.github.io/GRS-SIMA/detail.html?id=" + anggota.nomor,
    width: 120,
    height: 120
});

   console.log("QR LINK :", linkQR);

qr.querySelector("img")?.setAttribute("draggable","false");

}
document.addEventListener("DOMContentLoaded", tampilkanKTA);

/* ===========================================
   DETAIL ANGGOTA
=========================================== */

async function tampilkanDetailAnggota() {

    const area = document.getElementById("detailArea");

    if (!area) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        area.innerHTML = "<h3>Data tidak ditemukan</h3>";
        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "members"));

        let anggota = null;

        snapshot.forEach((docSnap) => {

            const data = docSnap.data();

            if (
                data.nomor === id ||
                docSnap.id === id
            ) {
                anggota = data;
            }

        });

        if (!anggota) {
            area.innerHTML = "<h3>Anggota tidak ditemukan</h3>";
            return;
        }

        area.innerHTML = `
            <img src="${anggota.foto}" width="180"><br><br>

            <b>Nomor Register</b><br>
            ${anggota.nomor}<br><br>

            <b>Nama</b><br>
            ${anggota.nama}<br><br>

            <b>NIK</b><br>
            ${anggota.nik}<br><br>

            <b>Jabatan</b><br>
            ${anggota.jabatan}<br><br>

            <b>No HP</b><br>
            ${anggota.hp}<br><br>

            <b>Alamat</b><br>
            ${anggota.alamat}
        `;

    } catch (error) {

        console.error(error);

        area.innerHTML = "<h3>Gagal mengambil data anggota</h3>";

    }

}

document.addEventListener("DOMContentLoaded", tampilkanDetailAnggota);

window.simpanData = simpanData;
window.previewFoto = previewFoto;
window.editAnggota = editAnggota;
window.hapusAnggota = hapusAnggota;
window.cetakKTA = cetakKTA;

async function sinkronkanFirestore(){

    const data = StorageManager.getData();

    let berhasil = 0;

    for(const anggota of data){

        const q = query(
            collection(db,"members"),
            where("nomor","==",anggota.nomor)
        );

        const snap = await getDocs(q);

        if(!snap.empty){
            continue;
        }

        await addDoc(
            collection(db,"members"),
            anggota
        );

        berhasil++;

    }

    alert(
        berhasil +
        " anggota berhasil disinkronkan."
    );

}

window.sinkronkanFirestore = sinkronkanFirestore;
