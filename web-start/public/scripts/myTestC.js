// < - - - - METHODS - - - - >
// function signIn() {
//     // Sign into Firebase using popup auth & Google as the identity provider.
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
// }


getPlant("Hundsrose");
// getPlant("The Fairy");
// addPlant("Roteiche", "Buchengewächse", "Eiche", 30, "Natur", "Laubbaum", 0 );
// updatePlant("Roteiche", "abc", "def", 1000, "Natur", "Laubbaum", 0);
// updatePlant("Roteiche", "Buchengewächse", "Eiche", 30, "Natur", "Laubbaum", 0 )
// updateFamilie("Roteiche", "Eichhörnchen");





function addPlant(id, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche){
    var docRef = getDocRef(id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Dokument (" + id + ") existiert bereits! Daten:")
            getPlant(id);
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
                });
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}





function getPlant(id) {
    var docRef = getDocRef(id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log(id + ": ", doc.data());
            //TEST
            printPlant(doc.data(),id);

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

function printPlant(plantObject, id){
    console.log(plantObject.familie);
    let myPlant = document.createElement("p");
    myPlant.innerHTML = id + " " + plantObject.familie + " " + plantObject.gebrauchsname;
    document.getElementById("myplantdiv").append(myPlant);
}


function updatePlant(id, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche){
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


//GEHT NOCH NICHT
function updateFamilie(id, familie){
    var docRef = getDocRef(id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log(id + " wird abgeändert...");
            docRef.set({
                familie: familie,
                gebrauchsname: docRef.gebrauchsname
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


// GET DOC REF
function getDocRef(id){
    return firebase.firestore().collection("plants").doc(id);
}





// - - TEST (BUTTON) FUNCTIONS - -
function getHundsrose() {
    getPlant("Hundsrose");
}
function addSchlafmohn(){
    addPlant("Schlafmohn", "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
}

function addNewPlantold(){
    //addPlant("Test", "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
   // let name=document.getElementsByName("pname").value;
    let name=document.querySelector("#pname").value;
    console.log(name);
    //addPlant(name, "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
}

function addNewPlant(){

    //let name=document.querySelector("#pname").value;
    //console.log(name);
    console.log("Testausgabe");
    let familie=    document.querySelector("#pfamilie").value;
    let gebrauchsname=document.querySelector("#pgebrauchsname").value;
    let hoehe_m=    document.querySelector("#phoehe_m").value;
    let standort=   document.querySelector("#pstandort").value;
    let typ=        document.querySelector("#ptyp").value;
    let wasserbedarf_woche=document.querySelector("#pwasserbedarf_woche").value;
    console.log(name+familie+gebrauchsname+hoehe_m+standort+typ+wasserbedarf_woche);
   // addPlant(name, familie, gebrauchsname, 1, standort, typ, 1);
    addPlant(name, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche);*/
   // addPlant("Test", "Mohngewächse", "Mohn", 1, "Natur", "Nutzpflanze", 0);
}


// < - - - - VARIABLES - - - - >
var mydiv = document.getElementById("myplantdiv");
var v_getplant = document.getElementById("get-plant-button");
var v_saveSchlafmohn = document.getElementById("schlafmohn-button");
//var v_newPlant = document.getElementById("pflanze-anlegen");
//var v_newPlant2 = document.getElementById("formPlanzeAnlegen");

const t1= document.getElementById("test1");

// var signInButtonElement = document.getElementById('sign-in');


//< - - - - EVENT-LISTENERS - - - - - >
mydiv.append("meine bilder, vermutlich ein img tag oder so");
v_getplant.addEventListener('click', getHundsrose);
v_saveSchlafmohn.addEventListener("click", addSchlafmohn);
//v_newPlant.addEventListener("click", addNewPlant);
//v_newPlant.addEventListener("submit", addNewPlant);
//v_newPlant2.addEventListener("click", addNewPlant);
//t1.addEventListener("click", addNewPlant);
t1.addEventListener("submit", addNewPlant);
// signInButtonElement.addEventListener('click', signIn);

