function addNewPlant(){

    let name=document.querySelector("#pname").value;
    let familie=    document.querySelector("#pfamilie").value;
    let gebrauchsname=document.querySelector("#pgebrauchsname").value;
    let hoehe_m=    document.querySelector("#phoehe_m").value;
    let standort=   document.querySelector("#pstandort").value;
    let typ=        document.querySelector("#ptyp").value;
    let wasserbedarf_woche=document.querySelector("#pwasserbedarf_woche").value;

    addPlant(name, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche);//*/

}


// < - - - - VARIABLES - - - - >
const t1= document.getElementById("neue_Pflanze");

//< - - - - EVENT-LISTENERS - - - - - >
t1.addEventListener("submit", addNewPlant);

function handleForm(event) { event.preventDefault(); }
t1.addEventListener('submit', handleForm);


// signInButtonElement.addEventListener('click', signIn);

