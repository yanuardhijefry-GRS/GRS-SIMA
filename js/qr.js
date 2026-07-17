let anggota =
JSON.parse(localStorage.getItem("anggota")) || [];

let index =
localStorage.getItem("ktaIndex");

if(index==null){

location="data-anggota.html";

}

let data = anggota[index];

document.getElementById("foto").src=data.foto;

document.getElementById("nama").innerHTML=data.nama;

document.getElementById("idanggota").innerHTML=data.id;

document.getElementById("jabatan").innerHTML=data.jabatan;

new QRCode(document.getElementById("qrcode"),{

text:data.id,

width:120,

height:120

});