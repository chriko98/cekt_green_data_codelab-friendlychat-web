
// GET DOC REF
function getDocRef(id){
    return firebase.firestore().collection("plants").doc(id);
}


// < - - - - - - - - - - - - - - - - - - - PLANT DOCUMENTS - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - >


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
                    wasserbedarf_woche: wasserbedarf_woche,
                    bilder: uploadTask

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
    // Get a reference to the storage service, which is used to create references in your storage bucket
    /*var storage = firebase.storage();

// Create a storage reference from our storage service
    var storageRef = storage.ref();

  //  Create a reference under which you want to list
    var listRef = storageRef.child('plants/uid');

// Find all the prefixes and items.
    listRef.listAll().then(function(res) {
        res.prefixes.forEach(function(folderRef) {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function(itemRef) {
            // All the items under listRef.
        });
    }).catch(function(error) {
        // Uh-oh, an error occurred!
    });
    console.log(listRef)*/
    /*
        var storageRef = firebase.storage().ref("plants");

        storageRef.listAll().then(function(result) {
            result.items.forEach(function(imageRef) {
                // And finally display them
                console.log(imageRef);
            });
        }).catch(function(error) {
            // Handle any errors
        });*/
    var db = firebase.firestore();
    let sort = document.getElementById("sortList").value;
    let filterType = document.getElementById("filterTypeList").value;
    let filterValue = document.getElementById("filterValueList").value;


   // var rowCount = myTable.rows.length;

        //myTable.deleteRow(rowCount);


    if (sort == "Name"&&filterValue == "leer") {
    db.collection("plants").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            printAllPlantsHTML(doc.data(), doc.id)
        });
    });
    }
    if (sort == "Name"&&filterValue!="leer") {
        db.collection("plants").where(filterType, "==", filterValue).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                printAllPlantsHTML(doc.data(), doc.id)
            });
        });
    }

}




//  <      - - - - PRINTS/OUTPUTS - - - - -        >
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

// - - ALL PLANTS HTML - -
function printAllPlantsHTML(plantObject, id){
// Find a <table> element with id="myTable":
    var table = document.getElementById("plantTable");

// Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(table.rows.length );
    console.log(row);
// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

// Add some text to the new cells:
    cell1.innerHTML = "<a href="+"eintrag.html"
        +"?name="+encodeURI(id)
        +"&familie="+encodeURI(plantObject.familie)
        +"&gebrauchsname="+encodeURI(plantObject.gebrauchsname)
        +"&hoehe_m="+encodeURI(plantObject.hoehe_m)
        +"&standort="+encodeURI(plantObject.standort)
        +"&typ="+encodeURI(plantObject.typ)
        +"&wasserbedarf_woche="+encodeURI(plantObject.wasserbedarf_woche)
        +">"
        +id+"</a>";/*
    cell1.innerHTML = "<a href="+"eintrag.html"
       // +"?name="+id

        +">"
        +id+"</a>";*/
    cell2.innerHTML = plantObject.familie;
    cell3.innerHTML = plantObject.gebrauchsname;
    cell4.innerHTML = plantObject.hoehe_m;
    cell5.innerHTML = plantObject.standort;
    cell6.innerHTML = plantObject.typ;
    cell7.innerHTML = plantObject.wasserbedarf_woche;

    var x = "s s,s";

    console.log(encodeURI(x))
}





//  <        - - - - UPDATE PLANT - - - - -         >
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
    //TODO NEW: erst aktivieren wenn die Methode keine Code - Errors wirft
    //erst aufrufen wenn die methode funktioniert! (also ohne code-errors) --> durch die derzeitigen sicherheitsrules sollte ohne code-fehlern die methode in den
    // catch-Teil springen, da es keine berechtigungen zum löschen gibt!
    //deleteImageFolder(id);

    docRef.delete().then(function(doc) {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log("Error getting document:", error);
        alert("KEINE BERECHTIGUNG UM DAS DOK. ZU LÖSCHEN");
    });
}



// - - - - - - - - - - - - - - - - - - - - - -     IMAGES, IMAGE FOLDERS      - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - -



//TODO: returned den URL des Ordners / den Ort des Ordners? damit auf die fotos zugegriffen werden kann






//TODO: methode addImageFolder --> legt einen neuen Folder im Storage an, der als ID die ID der Pflanze hat (bspw. Hundsrose)

// function addImageFolder(){
//
// }





//TODO: methode addImage(...parameter...) --> addet ein Image zum Folder der zugehörigen Pflanze - being done

// <        ------ ADD NEW IMG -------        >
function addNewImage(id) {
// File or Blob named mountains.jpg
    var file = doc.id;


// Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };

// Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child(file.id + '/' + file.id+ date()).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
            });
        });
}




//TODO mehotde deleteImageFolder(id) - being done
//TODO NEW: error-catch ! (siehe deletePlant Methode! Achtung: Ausgabe-Test auf diese Methode anpassen!!)
function deleteImageFolder(id){
    const gcs = require('@google-cloud/storage')();
    const functions = require('firebase-functions');
    const bucket = gcs.bucket(functions.config().firebase.storageBucket);

    return bucket.deleteFiles({
        prefix: `id/${id}/`
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`All the Firebase Storage files in users/${id}/ have been deleted`);
        }
    });
//https://stackoverflow.com/questions/37749647/firebasestorage-how-to-delete-directory

}