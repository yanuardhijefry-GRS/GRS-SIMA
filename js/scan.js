const anggota =
JSON.parse(localStorage.getItem("anggota")) || [];

function cariAnggota(id){

return anggota.find(a=>a.id===id);

}

function sukses(decodedText){

const data = cariAnggota(decodedText);

if(data){

document.getElementById("hasil").style.display="block";

document.getElementById("hasilFoto").src=data.foto;

document.getElementById("hasilNama").innerHTML=data.nama;

document.getElementById("hasilID").innerHTML="ID : "+data.id;

document.getElementById("hasilJabatan").innerHTML="Jabatan : "+data.jabatan;

document.getElementById("hasilAlamat").innerHTML="Alamat : "+data.alamat;

document.getElementById("hasilHP").innerHTML="HP : "+data.hp;

}else{

alert("QR Code tidak terdaftar.");

}

}

new Html5QrcodeScanner(

"reader",

{

fps:10,

qrbox:250

}

).render(sukses);