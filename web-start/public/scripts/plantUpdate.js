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
  /*  window.top.location.replace("bearbeiten.html"+
    +encodeURIComponent("?")+"name="+encodeURI(name)
    +"&familie="+encodeURI(familie)
    +"&gebrauchsname="+encodeURI(gebrauchsname)
    +"&hoehe_m="+encodeURI(hoehe_m)
    +"&standort="+encodeURI(standort)
    +"&typ="+encodeURI(typ)
    +"&wasserbedarf_woche="+encodeURI(wasserbedarf_woche));*/
}

document.getElementById("addPicture").addEventListener("submit", addPicture);
document.getElementById("addPicture").addEventListener('submit', handleForm);
function addPicture() {
    let id=       document.querySelector("#nameUpdate").value;
    let image=    document.querySelector("#InputFile").files;

    saveImage(id, image[0]);
}



function show(id) {
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



// < - - - - VARIABLES - - - - >
const t1= document.getElementById("changePlant");

//< - - - - EVENT-LISTENERS - - - - - >
t1.addEventListener("submit", changePlant);

function handleForm(event) { event.preventDefault(); }
t1.addEventListener('submit', handleForm);

