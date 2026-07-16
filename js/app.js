/* ===========================================
   GRS-SIMA v2
   APP.JS
   Database : Firebase Firestore
=========================================== */

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


/* ===========================================
   KONSTANTA
=========================================== */

const MEMBERS = "members";


/* ===========================================
   HELPER
=========================================== */

function $(id){
    return document.getElementById(id);
}

function halaman(nama){
    return document.body.dataset.page === nama;
}


/* ===========================================
   PREVIEW FOTO
=========================================== */

function previewFoto(event){

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        $("preview").src = e.target.result;

    };

    reader.readAsDataURL(file);

}


/* ===========================================
   VALIDASI
=========================================== */

function validasiAnggota(data){

    if(data.nomor === ""){
        alert("Nomor Register wajib diisi.");
        return false;
    }

    if(data.nama === ""){
        alert("Nama wajib diisi.");
        return false;
    }

    if(data.nik === ""){
        alert("NIK wajib diisi.");
        return false;
    }

    return true;

}


/* ===========================================
   AMBIL DATA FORM
=========================================== */

function getFormData(){

    return{

        nomor : $("nomor").value.trim(),
        nama : $("nama").value.trim(),
        nik : $("nik").value.trim(),
        jabatan : $("jabatan").value,
        hp : $("hp").value.trim(),
        email : $("email").value.trim(),
        alamat : $("alamat").value.trim(),
        foto : $("preview").src,
        createdAt : new Date().toISOString()

    };

}


/* ===========================================
   EXPORT GLOBAL
=========================================== */

window.previewFoto = previewFoto;
/* ===========================================
   SIMPAN DATA ANGGOTA
=========================================== */

async function simpanData(){

    const anggota = getFormData();

    if(!validasiAnggota(anggota)){
        return;
    }

    try{

        const docRef = await addDoc(
            collection(db, MEMBERS),
            anggota
        );

        alert("Data anggota berhasil disimpan.");

        window.location.href = "data-anggota.html";

    }catch(error){

        console.error(error);

        alert("Gagal menyimpan data ke Firestore.\n\n" + error.message);

    }

}

window.simpanData = simpanData;


/* ===========================================
   LOAD HALAMAN TAMBAH ANGGOTA
=========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const foto = $("foto");

    if(foto){

        foto.addEventListener(
            "change",
            previewFoto
        );

    }

});
