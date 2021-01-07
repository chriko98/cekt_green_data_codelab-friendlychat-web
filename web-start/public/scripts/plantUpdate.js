function changePlant(){

    let name=       document.querySelector("#nameUpdate").value;
    let familie=    document.querySelector("#familieUpdate").value;
    let gebrauchsname=document.querySelector("#gebrauchsnameUpdate").value;
    let hoehe_m=    document.querySelector("#hoehe_mUpdate").value;
    let standort=   document.querySelector("#standortUpdate").value;
    let typ=        document.querySelector("#typUpdate").value;
    let wasserbedarf_woche=document.querySelector("#wasserbedarf_wocheUpdate").value;
    updatePlant(name, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche);//*/
  /*  window.top.location.replace("bearbeiten.html"+
    +encodeURIComponent("?")+"name="+encodeURI(name)
    +"&familie="+encodeURI(familie)
    +"&gebrauchsname="+encodeURI(gebrauchsname)
    +"&hoehe_m="+encodeURI(hoehe_m)
    +"&standort="+encodeURI(standort)
    +"&typ="+encodeURI(typ)
    +"&wasserbedarf_woche="+encodeURI(wasserbedarf_woche));*/
}

document.getElementById("addPicture").addEventListener("submit", addPicture);
document.getElementById("addPicture").addEventListener('submit', handleForm);
function addPicture() {
    let id=       document.querySelector("#nameUpdate").value;
    let image=    document.querySelector("#InputFile").files;

    saveImage(id, image[0]);
}

// < - - - - VARIABLES - - - - >
const t1= document.getElementById("changePlant");

//< - - - - EVENT-LISTENERS - - - - - >
t1.addEventListener("submit", changePlant);

function handleForm(event) { event.preventDefault(); }
t1.addEventListener('submit', handleForm);

