if(localStorage.getItem("login")!="true"){
location="index.html";
}

let anggota=
JSON.parse(localStorage.getItem("anggota"))||[];

let nomor="GRS-"+String(anggota.length+1).padStart(4,"0");

document.getElementById("id").value=nomor;

let fotoBase64="";

document.getElementById("foto").addEventListener("change",function(){

let file=this.files[0];

if(!file)return;

let reader=new FileReader();

reader.onload=function(e){

fotoBase64=e.target.result;

document.getElementById("preview").src=fotoBase64;

}

reader.readAsDataURL(file);

});

document.getElementById("formAnggota").addEventListener("submit",function(e){

e.preventDefault();

let data={

id:document.getElementById("id").value,

nama:document.getElementById("nama").value,

jabatan:document.getElementById("jabatan").value,

alamat:document.getElementById("alamat").value,

hp:document.getElementById("hp").value,

foto:fotoBase64,

tanggal:new Date().toLocaleDateString("id-ID")

};

anggota.push(data);

localStorage.setItem("anggota",JSON.stringify(anggota));

alert("Data anggota berhasil disimpan.");

location.reload();

});