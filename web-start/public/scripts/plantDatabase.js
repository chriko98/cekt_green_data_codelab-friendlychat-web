function getPlants(){
    getAllPlants();
}

function sortType(){
    document.getElementById('sortValueList').innerText = null;
    var db = firebase.firestore();

    db.collection("plants").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            let list= document.getElementById("sortTypeList");
            //let value=document.querySelector("#sortValueList").value;
            //let value= list.options[list.selectedIndex].value;
            console.log(list);
            let value = list.value;
            console.log(value);

         switch (value){
             case("familie"):               document.getElementById('sortValueList').options.add(new Option(doc.data().familie, doc.data().familie)); break;
             case("typ"):                   document.getElementById('sortValueList').options.add(new Option(doc.data().typ, doc.data().typ)); break;
             case("hoehe_m"):               document.getElementById('sortValueList').options.add(new Option(doc.data().hoehe_m, doc.data().hoehe_m)); break;
             case("gebrauchsname"):         document.getElementById('sortValueList').options.add(new Option(doc.data().gebrauchsname, doc.data().gebrauchsname)); break;
             case("standort"):              document.getElementById('sortValueList').options.add(new Option(doc.data().standort, doc.data().standort)); break;
             case("wasserbedarf_woche"):    document.getElementById('sortValueList').options.add(new Option(doc.data().wasserbedarf_woche, doc.data().wasserbedarf_woche)); break;
         }

        });
    });
//.where("familie","==","3")
    document.getElementById('sortValueList').options.remove();
}

//const sortTypeVar = document.getElementById("sortTypeList");
//sortTypeVar.addEventListener("click", sortType);
document.getElementById("sortTypeList").onchange = clearList;
function clearList(){

}
document.getElementById("sortTypeList").onchange = sortType;