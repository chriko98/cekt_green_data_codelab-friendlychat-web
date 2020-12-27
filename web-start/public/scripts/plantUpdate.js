function changePlant(){

    let name=       document.querySelector("#nameUpdate").value;
    let familie=    document.querySelector("#familieUpdate").value;
    let gebrauchsname=document.querySelector("#gebrauchsnameUpdate").value;
    let hoehe_m=    document.querySelector("#hoehe_mUpdate").value;
    let standort=   document.querySelector("#standortUpdate").value;
    let typ=        document.querySelector("#typUpdate").value;
    let wasserbedarf_woche=document.querySelector("#wasserbedarf_wocheUpdate").value;
    //console.log(name+familie+gebrauchsname+hoehe_m+standort+typ+wasserbedarf_woche);
    updatePlant(name, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche);//*/

}


// < - - - - VARIABLES - - - - >
const t1= document.getElementById("changePlant");

//< - - - - EVENT-LISTENERS - - - - - >
t1.addEventListener("submit", changePlant);

function handleForm(event) { event.preventDefault(); }
t1.addEventListener('submit', handleForm);


// signInButtonElement.addEventListener('click', signIn);

