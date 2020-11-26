console.log("hellothere");


// < - - - - METHODS - - - - >
// function signIn() {
//     // Sign into Firebase using popup auth & Google as the identity provider.
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
// }


// getPlant("Palme");
// getPlant("The Fairy");

function addPlant(id, familie, gebrauchsname, hoehe_m, standort, typ, wasserbedarf_woche){
    // Add a new document in collection "cities"
    firebase.firestore().collection("plants").doc(id).set({
        familie: familie,
        gebrauchsname: gebrauchsname,
        hoehe_m: hoehe_m,
        standort: standort,
        typ: typ,
        wasserbedarf_woche: wasserbedarf_woche
    })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}

function addSchlafmohn(){
    var docRef = firebase.firestore().collection("plants").doc("Schlafmohn");
    console.log("- - - - - ");
    console.log(docRef);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("DOKUMENT EXISTIERT SCHON - KEIN ADD!! Daten:")
            console.log("Document ID:", doc.id)
            console.log("Document data:", doc.data());
            console.log("- - - - - ");
        } else {
            // doc.data() will be undefined in this case
            console.log("- - - - -");
            console.log("DOKUMENT EXISTIERT NOCH NICHT. Daten werden gespeichert...");
            docRef.set({
                familie: "Mohngewächse",
                gebrauchsname: "Mohn",
                hoehe_m: "1",
                standort: "Natur",
                typ: "Nutzpflanze",
                wasserbedarf_woche: "0"
            })
                .then(function() {
                    console.log("Document successfully written!");
                    console.log("- - - - -");
                });
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });







}


function getPlant(id) {
    var docRef = firebase.firestore().collection("plants").doc(id);
    console.log(docRef);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("THIS PLANT EXISTS!")
            console.log("Document ID:", doc.id)
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("NO SUCH DOCUMENT!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}





function getHundsrose() {
    var docRef = firebase.firestore().collection("plants").doc("Hundsrose");
    console.log(docRef);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document ID:", doc.id)
            console.log("Document data:", doc.data());
            console.log("I am so happy!");
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}


// < - - - - VARIABLES - - - - >
var mydiv = document.getElementById("myplantdiv");
var v_getplant = document.getElementById("get-plant-button");
var v_saveSchlafmohn = document.getElementById("schlafmohn-button");
// var signInButtonElement = document.getElementById('sign-in');


//< - - - - EVENT-LISTENERS - - - - - >
mydiv.append("meine bilder, vermutlich ein img tag oder so");
v_getplant.addEventListener('click', getHundsrose);
v_saveSchlafmohn.addEventListener("click", addSchlafmohn);
// signInButtonElement.addEventListener('click', signIn);

