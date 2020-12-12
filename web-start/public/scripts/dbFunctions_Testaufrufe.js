//< - - - - TEST (BUTTON) FUNCTIONS - - - - - >
function getHundsrose() {
    getPlant("Hundsrose");
}
function getSchlafmohn() {
    getPlant("Schlafmohn");
}
function addSchlafmohn(){
    addPlant("Schlafmohn", "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
}
function addFakePlant(){
    addPlant("FakePlant", "asdf");
}

function updateSchlafmohn1(){
    updatePlant("Schlafmohn", "asdf", "asdf", 1, "asf", "asdf", 0);
}

function updateSchlafmohn2(){
    updatePlant("Schlafmohn", "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
}

function updateSchlafmohn3(){ //falsches update
    updatePlant("Schlafmohn", "asdf", "asdf");
}
function deleteSchlafmohn(){
    deletePlant("Schlafmohn");
}



//< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - >

// - - ECHTE PFLANZEN ZUM EINSPEICHERN!!! - -
// addPlant("Roteiche", "Buchengewächse", "Eiche", 30, "Natur", "Laubbaum", 0 );
// addPlant("Dendrobium", "Orchideengewächse", "Orchidee", 1, "hell, keine direkte Sonne", "Zimmerpflanze", 1 );
// addPlant("Schlafmohn", "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
// addPlant("Hundsrose", "Rosengwächse", "Rose", 4, "Natur", "Wildpflanze", 0);
// addPlant("The Fairy", "Rosengwächse", "Rose", 0.5, "sonnig", "Zuchtpflanze", 2);

//< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - >



// < - - - - VARIABLES - - - - >
//var mydiv = document.getElementById("myplantdiv");
var v_getHundsrose = document.getElementById("get-hundsrose-button");
var v_getSchlafmohn = document.getElementById("get-schlafmohn-button");
var v_saveSchlafmohn = document.getElementById("schlafmohn-button");
var v_saveFakePlant = document.getElementById("falsePlant-button");
var v_updateSchlafmohn1 = document.getElementById("updateSchlafmohn1-button");
var v_updateSchlafmohn2 = document.getElementById("updateSchlafmohn2-button");
var v_updateSchlafmohn3 = document.getElementById("updateSchlafmohn3-button"); //falsches update
var v_deleteSchlafmohn = document.getElementById("deleteSchlafmohn-button");

// var signInButtonElement = document.getElementById('sign-in');


//< - - - - EVENT-LISTENERS - - - - - >
//mydiv.append("meine bilder, vermutlich ein img tag oder so (div während laufzeit eingefügt))");
v_getHundsrose.addEventListener('click', getHundsrose);
v_getSchlafmohn.addEventListener('click', getSchlafmohn);
v_saveSchlafmohn.addEventListener("click", addSchlafmohn);
v_saveFakePlant.addEventListener("click", addFakePlant);
v_updateSchlafmohn1.addEventListener("click", updateSchlafmohn1);
v_updateSchlafmohn2.addEventListener("click", updateSchlafmohn2);
v_updateSchlafmohn3.addEventListener("click", updateSchlafmohn3);
v_deleteSchlafmohn.addEventListener("click", deleteSchlafmohn);

// signInButtonElement.addEventListener('click', signIn);




//- - TEST-AUFRUFE - -
// getPlant("Hundsrose");
// getPlant("The Fairy");
// updatePlant("Roteiche", "abc", "def", 1000, "Natur", "Laubbaum", 0);
// updatePlant("Roteiche", "Buchengewächse", "Eiche", 30, "Natur", "Laubbaum", 0 )
//addPlant("falschePflanze", "familie");
//updatePlant("meaup", "Buchengewächse", "Eiche", 30, "Natur", "Laubbaum", 0 )
