function getPlants(){
    getAllPlants();
}

function sortType(){
    document.getElementById('filterValueList').innerText = null;
    var db = firebase.firestore();

    let list= document.getElementById("filterTypeList");
    //let value=document.querySelector("#sortValueList").value;
    //let value= list.options[list.selectedIndex].value;
    console.log(list);
    let value = list.value;
    console.log(value);
    switch (value) {
        case("leer"):
            document.getElementById('filterValueList').options.add(new Option("","leer"));
            break;
    }
    db.collection("plants").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());

         switch (value){
             case("familie"):               document.getElementById('filterValueList').options.add(new Option(doc.data().familie, doc.data().familie)); break;
             case("typ"):                   document.getElementById('filterValueList').options.add(new Option(doc.data().typ, doc.data().typ)); break;
             case("hoehe_m"):               document.getElementById('filterValueList').options.add(new Option(doc.data().hoehe_m, doc.data().hoehe_m)); break;
             case("gebrauchsname"):         document.getElementById('filterValueList').options.add(new Option(doc.data().gebrauchsname, doc.data().gebrauchsname)); break;
             case("standort"):              document.getElementById('filterValueList').options.add(new Option(doc.data().standort, doc.data().standort)); break;
             case("wasserbedarf_woche"):    document.getElementById('filterValueList').options.add(new Option(doc.data().wasserbedarf_woche, doc.data().wasserbedarf_woche)); break;
         }
        });
    });
//.where("familie","==","3")
    //document.getElementById('sortValueList').options.remove();
}




const delFilter = document.getElementById("deleteFilter");
delFilter.addEventListener("click", del);
function del(){
    document.getElementById('filterValueList').innerText = null;
    document.getElementById('filterValueList').options.add(new Option("","leer"));
    document.getElementById('filterTypeList').selectedIndex = 0;
    getPlants();
}

document.getElementById("filterTypeList").onchange = sortType;
document.getElementById("filterValueList").onchange = drawNewTable;
//document.getElementById("filterValueList").onchange = getPlants;

function drawNewTable(){
    var table = document.getElementById("plantTable");
    for(var i = 1; i < table.rows.length;)
    {
        table.deleteRow(i);
    }
    getPlants();
}