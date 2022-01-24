// @ts-nocheck

var xhr = new XMLHttpRequest();
var l;

function dataChoice () {
    var choice = document.getElementById("dataSet").value;

    if (choice == "event") {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("display").innerHTML = xhr.responseText;
                document.getElementById("display").scrollIntoView();
            }
        };
        xhr.open("GET", "data1.html", true);
        xhr.send();
    } else
        if (choice == "squirrel") {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById("display").innerHTML = xhr.responseText;
                    document.getElementById("display").scrollIntoView();
                }
            };
            xhr.open("GET", "data2.html", true);
            xhr.send();
        } else {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById("display").innerHTML = xhr.responseText;
                    document.getElementById("display").scrollIntoView();
                }
            };
            xhr.open("GET", "data3.html", true);
            xhr.send();
        }
}

function searchEvent() {
    var radio_value = document.querySelector("input[name = searchChoice]:checked").value;

    if (radio_value == "eventName") {
        console.log("after if")
        document.getElementById("search").addEventListener("keyup", function(){
            getEName(this.value);
        }, false);      
    } else 
        if (radio_value == "eventBorough") {
            document.getElementById("search").addEventListener("keyup", function(){
                getEBorough(this.value);
            }, false); 
        } else {
            alert("Please select value to search by");
        }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            l = JSON.parse(xhr.responseText);
        }
    };

    xhr.open("GET", "https://data.cityofnewyork.us/resource/tvpp-9vvx.json", true);
    xhr.send();
}

function searchSquirrel() {    
    var radio_value = document.querySelector("input[name = searchChoice]:checked").value;

    if (radio_value == "squirrelAge") {
        document.getElementById("search").addEventListener("keyup", function(){
            getSAge(this.value);
        }, false); 
    } else 
        if (radio_value == "squirrelColor"){
            document.getElementById("search").addEventListener("keyup", function(){
                getSColor(this.value);
            }, false); 
        } else {
            alert("Please select value to search by");
        }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            l = JSON.parse(xhr.responseText);
        }
    };

    xhr.open("GET", "https://data.cityofnewyork.us/resource/vfnx-vebw.json", true);
    xhr.send(); 
}

function searchCrashes() {
    var radio_value = document.querySelector("input[name = searchChoice]:checked").value;

    if (radio_value == "streetName") {
        document.getElementById("search").addEventListener("keyup", function(){
            getStreet(this.value);
        }, false);
    } else
        if (radio_value == "crashDate") {
            document.getElementById("search").addEventListener("keyup", function(){
                getDate(this.value);
            }, false);
        }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            l = JSON.parse(xhr.responseText);
        }
    };

    xhr.open("GET", "https://data.cityofnewyork.us/resource/h9gi-nx95.json", true);
    xhr.send();
}

function getEName(name) {    

    var output = "<tr><th>Event name</th><th>Start date</th><th>End date</th><th>Event type</th><th>Event borough</th><th>Event location</th><th>Type</th></tr>";

    var findEName;

    for (var i = 0; i < l.length; i ++) {
        var data = l[i];
        findEName = "" + data.event_name.toUpperCase();

        var dateTimeStart = data.start_date_time.split("T");
        var partsStart = dateTimeStart[0].split("-")
        var startDate = partsStart[0] + "/" + partsStart[1] + "/" + partsStart[2];

        var dateTimeEnd =  data.end_date_time.split("T");
        var partsEnd = dateTimeEnd[0].split("-")
        var endtDate = partsEnd[0] + "/" + partsEnd[1] + "/" + partsEnd[2];

        if(findEName.startsWith(name.toUpperCase())) {
            output += "<tr><td>"
            output += data.event_name;
            output += "</td><td>"
            output += startDate;
            output += "</td><td>"
            output += endtDate;
            output += "</td><td>"
            output += data.event_type;
            output += "</td><td>"
            output += data.event_borough;
            output += "</td><td>"
            output += data.event_location;
            output += "</td><td>"
            output += data.event_type;
            output += "</td></tr>";
        }
    }
    document.getElementById("results").innerHTML = output;
}

function getEBorough(borough) {

    var output = "<tr><th>Event name</th><th>Start date</th><th>End date</th><th>Event type</th><th>Event borough</th><th>Event location</th><th>Type</th></tr>";

    var findEBorough;

    for (var i = 0; i < l.length; i ++) {
        var data = l[i];
        findEBorough = "" + data.event_borough.toUpperCase();

        var dateTimeStart = data.start_date_time.split("T");
        var partsStart = dateTimeStart[0].split("-")
        var startDate = partsStart[0] + "/" + partsStart[1] + "/" + partsStart[2];

        var dateTimeEnd =  data.end_date_time.split("T");
        var partsEnd = dateTimeEnd[0].split("-")
        var endtDate = partsEnd[0] + "/" + partsEnd[1] + "/" + partsEnd[2];

        if(findEBorough.startsWith(borough.toUpperCase())) {
            output += "<tr><td>"
            output += data.event_name;
            output += "</td><td>"
            output += startDate;
            output += "</td><td>"
            output += endtDate;
            output += "</td><td>"
            output += data.event_type;
            output += "</td><td>"
            output += data.event_borough;
            output += "</td><td>"
            output += data.event_location;
            output += "</td><td>"
            output += data.event_type;
            output += "</td></tr>";
        }
    }
    document.getElementById("results").innerHTML = output;
}

function getSAge (age) {

    var output = "<tr><th>Date</th><th>Age</th><th>Fur color</th><th>Location</th><th>Running</th><th>Chasing</th><th>Climbing</th><th>Eating</th><th>Foraging</th></tr>";

    var findAge;

    for (var i = 0; i < l.length; i++) {
        var data = l[i];

        if (data.age != undefined) {
            findAge = data.age.toUpperCase();
        } else {
            continue;
        }

        if(findAge.startsWith(age.toUpperCase())) {
            output += "<tr><td>"
            output += data.date;
            output += "</td><td>"
            output += data.age;
            output += "</td><td>"
            output += data.primary_fur_color;
            output += "</td><td>"
            output += data.location;
            output += "</td><td>"
            output += data.running;
            output += "</td><td>"
            output += data.chasing;
            output += "</td><td>"
            output += data.climbing;
            output += "</td><td>"
            output += data.eating;
            output += "</td><td>"
            output += data.foraging;
            output += "</td></tr>"; 
        }
    }
    document.getElementById("results").innerHTML = output;
}

function getSColor (color) {

    var output = "<tr><th>Date</th><th>Age</th><th>Fur color</th><th>Location</th><th>Running</th><th>Chasing</th><th>Climbing</th><th>Eating</th><th>Foraging</th></tr>";

    var findColor;

    for (var i = 0; i < l.length; i++) {
        var data = l[i];

        if (data.primary_fur_color != undefined) {
            findColor = data.primary_fur_color.toUpperCase();
        } else {
            continue;
        }

        if(findColor.startsWith(color.toUpperCase())) {
            output += "<tr><td>"
            output += data.date;
            output += "</td><td>"
            output += data.age;
            output += "</td><td>"
            output += data.primary_fur_color;
            output += "</td><td>"
            output += data.location;
            output += "</td><td>"
            output += data.running;
            output += "</td><td>"
            output += data.chasing;
            output += "</td><td>"
            output += data.climbing;
            output += "</td><td>"
            output += data.eating;
            output += "</td><td>"
            output += data.foraging;
            output += "</td></tr>"; 
        }
    }
    document.getElementById("results").innerHTML = output;
}

function getStreet(street) {

    var output = "<tr><th>Date</th><th>Borough</th><th>Street Name</th><th>Cross Street Name</th><th>Contributing Factor Vehicle 1</th><th>Contributing Factor Vehicle 2</th><th>Vehicle 1 Type</th><th>Vehicle 2 Type</th></tr>";

    var findStreet;

    for (var i = 0; i < l.length; i ++) {
        var data = l[i];
        findStreet = "" + data.on_street_name;

        var dateTime = data.crash_date.split("T");
        var parts = dateTime[0].split("-")
        var findDate = parts[0] + "/" + parts[1] + "/" + parts[2];

        if(findStreet.startsWith(street.toUpperCase())) {
            output += "<tr><td>"
            output += findDate;
            output += "</td><td>"
            output += data.borough;
            output += "</td><td>"
            output += data.on_street_name;
            output += "</td><td>"
            output += data.off_street_name;
            output += "</td><td>"
            output += data.contributing_factor_vehicle_1;
            output += "</td><td>"
            output += data.contributing_factor_vehicle_2;
            output += "</td><td>"
            output += data.vehicle_type_code1
            output += "</td><td>"
            output += data.vehicle_type_code2;
            output += "</td></tr>"; 
        }
    }
    document.getElementById("results").innerHTML = output;
}

function getDate(date) {

    var output = "<tr><th>Date</th><th>Borough</th><th>Street Name</th><th>Cross Street Name</th><th>Contributing Factor Vehicle 1</th><th>Contributing Factor Vehicle 2</th><th>Vehicle 1 Type</th><th>Vehicle 2 Type</th></tr>";

    var findDate;

    for (var i = 0; i < l.length; i ++) {
        var data = l[i];
        var dateTime = data.crash_date.split("T");
        var parts = dateTime[0].split("-")
        findDate = parts[0] + "/" + parts[1] + "/" + parts[2];

        if(findDate.startsWith(date)) {
            output += "<tr><td>"
            output += findDate;
            output += "</td><td>"
            output += data.borough;
            output += "</td><td>"
            output += data.on_street_name;
            output += "</td><td>"
            output += data.off_street_name;
            output += "</td><td>"
            output += data.contributing_factor_vehicle_1;
            output += "</td><td>"
            output += data.contributing_factor_vehicle_2;
            output += "</td><td>"
            output += data.vehicle_type_code1
            output += "</td><td>"
            output += data.vehicle_type_code2;
            output += "</td></tr>"; 
        }
    }
    document.getElementById("results").innerHTML = output;
}