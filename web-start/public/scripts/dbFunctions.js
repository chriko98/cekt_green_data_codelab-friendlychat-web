
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
                console.log(id + " wird gespeichert...");
                docRef.set({
                    familie: familie,
                    gebrauchsname: gebrauchsname,
                    hoehe_m: hoehe_m,
                    standort: standort,
                    typ: typ,
                    wasserbedarf_woche: wasserbedarf_woche,
                   // bilder:     firebase.storage().ref().child(id+'/'+id+'.'+file.type.substr(file.type.search("/")+1));

                })
                    .then(function() {
                        console.log("Document successfully written!");
                        window.location.replace('pflanzendatenbank.html');
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
    var db = firebase.firestore();
    let sort = document.getElementById("sortList").value;
    let filterType = document.getElementById("filterTypeList").value;
    let filterValue = document.getElementById("filterValueList").value;
    let operator = "==";

    if((filterType == "hoehe_m") || (filterType == "wasserbedarf_woche")){
            filterValue = parseFloat(filterValue);
    }

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
        db.collection("plants").where(filterType, operator, filterValue).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                printAllPlantsHTML(doc.data(), doc.id)
            });
        });
    }

    if (sort != "Name"&&filterValue=="leer") {
        db.collection("plants").orderBy(sort).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                printAllPlantsHTML(doc.data(), doc.id)
            });
        });
    }
    if (sort != "Name"&&filterValue!="leer") {
        let elements = new Array;

        db.collection("plants").where(filterType, operator, filterValue)/*.orderBy(sort, "desc")*/.get().then(function (querySnapshot) {
            // orderBy funktioniert in Kombination mit where nicht (fehlende Indexes in Firebase)
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());

                elements[elements.length]= new Array(doc.id, doc.data());
                // console.log(elements);
               // printAllPlantsHTML(doc.data(), doc.id)
            });

            switch (sort) {
                case("familie"):
                    elements.sort(function(a,b){return a[1].familie.localeCompare(b[1].familie);});
                    break;
                case("typ"):
                    elements.sort(function(a,b){return a[1].typ.localeCompare(b[1].typ);});
                    break;
                case("hoehe_m"):
                    elements.sort(function(a,b){return a[1].hoehe_m - b[1].hoehe_m;});
                    break;
                case("gebrauchsname"):
                    elements.sort(function(a,b){return a[1].gebrauchsname.localeCompare(b[1].gebrauchsname);});
                    break;
                case("standort"):
                    elements.sort(function(a,b){return a[1].standort.localeCompare(b[1].standort);});
                    break;
                case("wasserbedarf_woche"):
                    elements.sort(function(a,b){return a[1].wasserbedarf_woche - b[1].wasserbedarf_woche;});
                    break;
            }
            // console.log(elements);

            for (i = 0; i < elements.length; i++) {
                printAllPlantsHTML(elements[i][1], elements[i][0]);
            }
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
    cell1.innerHTML =
        "<a href="+"bearbeiten.html"
        +"?name="+encodeURIComponent(id)
       /* +"&familie="+encodeURIComponent(plantObject.familie)
        +"&gebrauchsname="+encodeURIComponent(plantObject.gebrauchsname)
        +"&hoehe_m="+encodeURIComponent(plantObject.hoehe_m)
        +"&standort="+encodeURIComponent(plantObject.standort)
        +"&typ="+encodeURIComponent(plantObject.typ)
        +"&wasserbedarf_woche="+encodeURIComponent(plantObject.wasserbedarf_woche)*/
        +">"
        +id+"</a>";
    cell2.innerHTML = plantObject.familie;
    cell3.innerHTML = plantObject.gebrauchsname;
    cell4.innerHTML = plantObject.hoehe_m;
    cell5.innerHTML = plantObject.standort;
    cell6.innerHTML = plantObject.typ;
    cell7.innerHTML = plantObject.wasserbedarf_woche;

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
                    wasserbedarf_woche: wasserbedarf_woche,


                })
                    .then(function() {
                        console.log("Document successfully written!");
                        alert("Änderungen gespeichert");
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



// - - - - - - - - - - - - - - - - - - - - - -     IMAGES, IMAGE FOLDERS      - - - - - - - - - - - - - - - - - - - - -


function prePrint(id){
    var docRef = getDocRef(id);
    docRef.get().then(function(doc) {
        if (doc.exists) {

            document.getElementById("nameUpdate").placeholde=id;
            document.getElementById("nameUpdate").value=liste=id;
            document.getElementById("familieUpdate").placeholder=doc.data().familie;
            document.getElementById("familieUpdate").value=doc.data().familie;
            document.getElementById("typUpdate").placeholder=doc.data().typ;
            document.getElementById("typUpdate").value=doc.data().typ;
            document.getElementById("gebrauchsnameUpdate").placeholder=doc.data().gebrauchsname;
            document.getElementById("gebrauchsnameUpdate").value=doc.data().gebrauchsname;
            document.getElementById("hoehe_mUpdate").placeholder=doc.data().hoehe_m;
            document.getElementById("hoehe_mUpdate").value=doc.data().hoehe_m;
            document.getElementById("standortUpdate").placeholder=doc.data().standort;
            document.getElementById("standortUpdate").value=doc.data().standort;
            document.getElementById("wasserbedarf_wocheUpdate").placeholder=doc.data().wasserbedarf_woche;
            document.getElementById("wasserbedarf_wocheUpdate").value=doc.data().wasserbedarf_woche;

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

function saveImage(id,file) {
    var storageRef = firebase.storage().ref();
    var ImageRef = storageRef.child(id+'/'+id+'_'+new Date().toLocaleString()+'.'+file.type.substr(file.type.search("/")+1));
    ImageRef.put(file).then(function(snapshot) {
        alert("Bild hochgeladen");
        location.reload()
    });
}

function showPicture(id) {
    var storageRef = firebase.storage().ref();
    let count = 0;
    // let id=       document.querySelector("#nameUpdate").value;
    var listRef = storageRef.child(id);

// Find all the prefixes and items.
    listRef.listAll().then(function(res) {
        res.prefixes.forEach(function(folderRef) {
            console.log(folderRef);
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function(itemRef) {
            itemRef.getDownloadURL().then((url) => {
                // Do something with the URL ...#
                console.log(url);
                count = count + 1;
                //document.getElementById('pictures').append('<li><img id="picture' + count + '" src="' + url + '" class="img-fluid" alt="Demo image"></li>');
                //document.getElementById('picture1').setAttribute("src", url);
                var img = document.createElement("img");
                img.src=url;
                img.class="img-fluid";
                img.alt="Demo image";
                img.width=800;
                document.getElementById('pictures').appendChild(img);
            });
            // All the items under listRef.
        });
    }).catch(function(error) {
        // Uh-oh, an error occurred!
    });
}

