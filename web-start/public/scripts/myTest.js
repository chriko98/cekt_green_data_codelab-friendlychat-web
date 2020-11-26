console.log("hellothere");

var mydiv = document.getElementById("myplantdiv");
var magic = document.getElementById("magic-button");

function doMagic(){
    console.log("MAGIC!!!");
    mydiv.append("M-a-g-i-c");
}


function addPlant(){
    // Add a new document in collection "cities"
    firebase.firestore().collection("data").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}

mydiv.append("meine bilder, vermutlich ein img tag oder so");
magic.addEventListener('click', addPlant);