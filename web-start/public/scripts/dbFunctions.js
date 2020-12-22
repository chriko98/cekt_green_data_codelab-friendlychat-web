// < - - - - METHODS - - - - >
// function signIn() {
//     // Sign into Firebase using popup auth & Google as the identity provider.
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
// }



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
                //TODO: methodenaufruf addNewImgFolder(id) und speichere den return wert (URL) in einer variable
                console.log(id + " wird gespeichert...");
                docRef.set({
                    familie: familie,
                    gebrauchsname: gebrauchsname,
                    hoehe_m: hoehe_m,
                    standort: standort,
                    typ: typ,
                    wasserbedarf_woche: wasserbedarf_woche

                    //TODO: field bilder --> verwende die vorher returnte Variable --> URL vom bilder-storage ordner

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

//< - - - - GET ALL PLANTS - - - - - >
function getAllPlants() {
    //...
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
    //TODO: aufruf methode deleteImageFolder(id)
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



// - - - - - - - - - - - - - - - - - -

//TODO: methode addImageFolder --> legt einen neuen Folder im Storage an, der als ID die ID der Pflanze hat (bspw. Hundsrose)

//TODO: returned den URL des Ordners / den Ort des Ordners? damit auf die fotos zugegriffen werden kann

//TODO: methode addImage(...parameter...) --> addet ein Image zum Folder der zugehörigen Pflanze

//TODO mehotde deleteImageFolder(id)