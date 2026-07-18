if(localStorage.getItem("login")!="true"){
location="index.html";
}

let anggota=
JSON.parse(localStorage.getItem("anggota"))||[];

const tabel=document.getElementById("tabelData");

function tampil(data){

tabel.innerHTML="";

data.forEach((a,index)=>{

tabel.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>

<img src="${a.foto||'assets/default.png'}">

</td>

<td>${a.register}</td>

<td>${a.nama}</td>

<td>${a.jabatan}</td>

<td>${a.hp}</td>

<td>
<button class="btn"
onclick="lihatDetail(${index})">

Detail

</button>
<button class="btn edit"
onclick="editData(${index})">

Edit

</button>

<button class="btn hapus"
onclick="hapusData(${index})">

Hapus

</button>

<button class="btn kta"
onclick="cetakKTA(${index})">

KTA

</button>

<button class="btn qr"
onclick="buatQR(${index})">

QR

</button>

</td>

</tr>

`;

});

}

tampil(anggota);

document.getElementById("cari").addEventListener("keyup",function(){

let key=this.value.toLowerCase();

let hasil=anggota.filter(a=>

a.nama.toLowerCase().includes(key)

||

a.id.toLowerCase().includes(key)

);

tampil(hasil);

});

function hapusData(i){

if(confirm("Hapus anggota ini?")){

anggota.splice(i,1);

localStorage.setItem("anggota",JSON.stringify(anggota));

location.reload();

}

}

function editData(i){

localStorage.setItem("editIndex",i);

location="anggota.html";

}

function cetakKTA(i){

localStorage.setItem("ktaIndex",i);

location="kta.html";

}

function buatQR(i){

localStorage.setItem("qrIndex",i);

location="kta.html";

}
function lihatDetail(i){

localStorage.setItem("detailIndex",i);

location="detail.html";

}
