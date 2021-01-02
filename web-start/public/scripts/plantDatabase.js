document.getElementById("filterTypeList").onchange = filterValueList;
document.getElementById("filterValueList").onchange = drawNewTable;
document.getElementById("sortList").onchange = drawNewTable;
document.getElementById("deleteFilter").addEventListener("click", del);

function del(){
    document.getElementById('filterValueList').innerText = null;
    document.getElementById('filterValueList').options.add(new Option("","leer"));
    document.getElementById('filterTypeList').selectedIndex = 0;
    drawNewTable();
}

function drawNewTable(){
    var table = document.getElementById("plantTable");
    for(var i = 1; i < table.rows.length;)
    {
        table.deleteRow(i);
    }
    getAllPlants();
}

function filterValueList() {
    document.getElementById('filterValueList').innerText = null;
    var db = firebase.firestore();

    let list = document.getElementById("filterTypeList");
    console.log(list);
    let value = list.value;
    console.log(value);

    switch (value) {
        case("leer"):
            document.getElementById('filterValueList').options.add(new Option("", "leer"));
            break;
    }

    let elements = new Array;

    db.collection("plants").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            switch (value) {
                case("familie"):
                    elements[elements.length] = (doc.data().familie, doc.data().familie);
                    //console.log(elements);
                    break;
                case("typ"):
                    elements[elements.length] = (doc.data().typ, doc.data().typ);
                    break;
                case("hoehe_m"):
                    elements[elements.length] = parseFloat((doc.data().hoehe_m, doc.data().hoehe_m));
                    break;
                case("gebrauchsname"):
                    elements[elements.length] = (doc.data().gebrauchsname, doc.data().gebrauchsname);
                    break;
                case("standort"):
                    elements[elements.length] = (doc.data().standort, doc.data().standort);
                    break;
                case("wasserbedarf_woche"):
                    elements[elements.length] = parseFloat((doc.data().wasserbedarf_woche, doc.data().wasserbedarf_woche));
                    break;
            }
            /* alte Auswahlliste mit Duplikaten und ohne Sortierung
             switch (value){
                 case("familie"):               document.getElementById('filterValueList').options.add(new Option(doc.data().familie, doc.data().familie)); break;
                 case("typ"):                   document.getElementById('filterValueList').options.add(new Option(doc.data().typ, doc.data().typ)); break;
                 case("hoehe_m"):               document.getElementById('filterValueList').options.add(new Option(doc.data().hoehe_m, doc.data().hoehe_m)); break;
                 case("gebrauchsname"):         document.getElementById('filterValueList').options.add(new Option(doc.data().gebrauchsname, doc.data().gebrauchsname)); break;
                 case("standort"):              document.getElementById('filterValueList').options.add(new Option(doc.data().standort, doc.data().standort)); break;
                 case("wasserbedarf_woche"):    document.getElementById('filterValueList').options.add(new Option(doc.data().wasserbedarf_woche, doc.data().wasserbedarf_woche)); break;
             }*/
        }

        );
        elements = elements.filter((v, i, a) => a.indexOf(v) === i);

        if((value == "hoehe_m") || (value == "wasserbedarf_woche")){
            elements = elements.sort(function(a, b){return a-b});
        } else {
            elements = elements.sort();
        }

        for (i = 0; i < elements.length; i++) {
            document.getElementById('filterValueList').options.add(new Option(elements[i]));
        }

    });
}

