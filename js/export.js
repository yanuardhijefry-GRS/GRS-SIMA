function exportData(){

const data=
localStorage.getItem("anggota")||"[]";

const blob=new Blob([data],{
type:"application/json"
});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="anggota-grs.json";

a.click();

}

document.getElementById("importFile")
.addEventListener("change",function(e){

const file=e.target.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(){

localStorage.setItem(
"anggota",
reader.result
);

alert("Restore berhasil.");

location.reload();

};

reader.readAsText(file);

});

function resetData(){

if(confirm("Hapus seluruh data anggota?")){

localStorage.removeItem("anggota");

location.reload();

}

}