// < - - - - METHODS - - - - >
// function signIn() {
//     // Sign into Firebase using popup auth & Google as the identity provider.
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
// }

//< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - >

// - - ECHTE PFLANZEN ZUM EINSPEICHERN!!! - -
// addPlant("Roteiche", "Buchengewächse", "Eiche", 30, "Natur", "Laubbaum", 0 );
// addPlant("Dendrobium", "Orchideengewächse", "Orchidee", 1, "hell, keine direkte Sonne", "Zimmerpflanze", 1 );
// addPlant("Schlafmohn", "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
// addPlant("Hundsrose", "Rosengwächse", "Rose", 4, "Natur", "Wildpflanze", 0);
// addPlant("The Fairy", "Rosengwächse", "Rose", 0.5, "sonnig", "Zuchtpflanze", 2);

//< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - >


//< - - - - ADD PLANT - - - - - >
function addPlant(id, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche){

    if(familie==null || gebrauchsname==null || hoehe_m==null || standort==null || typ==null || wasserbedarf_woche==null) {
        //info console log + ALERT! - pop-up
        console.log("PFLANZENDATEN UNVOLLSTAENDIG - konnte nicht gespeichert werden!");
        alert("PFLANZENDATEN UNVOLLSTAENDIG - konnte nicht gespeichert werden!");

    } else {
        var docRef = getDocRef(id);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                //console log info
                console.log("Dokument (" + id + ") existiert bereits! Daten:");
                printPlantConsole(doc.data(),id);
            } else {
                console.log(id + " wird gespeichert...");
                docRef.set({
                    familie: familie,
                    gebrauchsname: gebrauchsname,
                    hoehe_m: hoehe_m,
                    standort: standort,
                    typ: typ,
                    wasserbedarf_woche: wasserbedarf_woche
                })
                    .then(function() {
                        console.log("Document successfully written!");
                        // console.log(id);
                        //printPlantConsole(doc.data(),id);
                    });
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
}



//< - - - - GET PLANT - - - - - >
function getPlant(id) {
    var docRef = getDocRef(id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            //html
            printPlantHTML(doc.data(),id);

            // return doc;
        } else {
            // doc.data() will be undefined in this case
            console.log(id + " not found.");
            // return null;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}



//< - - - - PRINTS/OUTPUTS - - - - - >
// - - HTML - -
function printPlantHTML(plantObject, id){
    //console output
    printPlantConsole(plantObject,id);
    let myPlant = document.createElement("p");
    myPlant.innerHTML = "id: " + id + ", fam.: " + plantObject.familie + ", gebr.name: " + plantObject.gebrauchsname + ", höhe: " + plantObject.hoehe_m
        + ", standort: " + plantObject.standort + ", typ: " + plantObject.typ + ", wasserb.: " + plantObject.wasserbedarf_woche;
    document.getElementById("myplantdiv").append(myPlant);
}

// - - CONSOLE - -
function printPlantConsole(plantObject, id){
    console.log("GET PLANT: " + id);
    //output of whole object data
    console.log("Objektausgabe: ", plantObject);
    //console of every field
    console.log("einzelne Felder: id: " + id + ", fam.: " + plantObject.familie + ", gebr.name: " + plantObject.gebrauchsname + ", höhe: " + plantObject.hoehe_m
        + ", standort: " + plantObject.standort + ", typ: " + plantObject.typ + ", wasserb.: " + plantObject.wasserbedarf_woche);
}




//< - - - - UPDATE PLANT - - - - - >
//UPDATE FUNCTION - ID SOLL NICHT UPGEDATED WERDEN KÖNNEN!!! ES SOLLEN IMEM RALLE FELDER EINGLESEN WERDEN & DADURCH ALLE "UPGEDATED" auch wenn nur einzelne verändert werden
function updatePlant(id, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche){

    if(familie==null || gebrauchsname==null || hoehe_m==null || standort==null || typ==null || wasserbedarf_woche==null) {
        //info console log + ALERT! - pop-up
        console.log("PFLANZENDATEN UNVOLLSTAENDIG - konnte nicht gespeichert werden!");
        alert("PFLANZENDATEN UNVOLLSTAENDIG - konnte nicht gespeichert werden!");

    } else {
        var docRef = getDocRef(id);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log(id + " wird abgeändert...");
                docRef.set({
                    familie: familie,
                    gebrauchsname: gebrauchsname,
                    hoehe_m: hoehe_m,
                    standort: standort,
                    typ: typ,
                    wasserbedarf_woche: wasserbedarf_woche
                })
                    .then(function() {
                        console.log("Document successfully written!");
                    });
            } else {
                console.log(id + " not found.");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
}

//NICHT GETESTET; DIESE FUNKTION NICHT BENOETIGT (WIRD NOCH GELOESCHT?) - keiner sollte berechtigung haben, außer admin über DB selbst
function deletePlant(id){
    var docRef = getDocRef(id);
    docRef.delete().then(function(doc) {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log("Error getting document:", error);
        alert("KEINE BERECHTIGUNG UM DAS DOK. ZU LÖSCHEN");
    });
}




// GET DOC REF
function getDocRef(id){
    return firebase.firestore().collection("plants").doc(id);
}



//< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - >



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
