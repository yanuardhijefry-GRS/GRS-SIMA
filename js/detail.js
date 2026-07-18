if(localStorage.getItem("login")!="true"){
location="index.html";
}

let anggota=
JSON.parse(localStorage.getItem("anggota"))||[];

let index=
localStorage.getItem("detailIndex");

if(index==null){

location="data-anggota.html";

}

let a=anggota[index];

document.getElementById("foto").src=a.foto;

document.getElementById("nama").innerHTML=a.nama;

document.getElementById("id").innerHTML=a.id;

document.getElementById("jabatan").innerHTML=a.jabatan;

document.getElementById("alamat").innerHTML=a.alamat;

document.getElementById("hp").innerHTML=a.hp;

document.getElementById("goldar").innerHTML=a.goldar;
