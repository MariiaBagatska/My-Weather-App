$(document).ready (
    function() {
        //font customisation for different screens
        var fontSize = $(window).width()/50;
        $('body').css('font-size', fontSize);
	
        $(window).resize(function() {
            var fontSize = $(window).width()/50;
            $('body').css('font-size', fontSize);
	    });
  
        // getting day and date
        var date = new Date();
        var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        document.getElementById("weekDay").innerHTML=weekDays[date.getDay()];
        document.getElementById("date").innerHTML=date.toLocaleDateString();

        //getting latitude and longitude
        var lat, lon, api, myObj, cels, fahr;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude; 
                lon = position.coords.longitude.toFixed(7); 
                api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
                getWeather(api);
            });
        }
        else { 
            document.getElementByID("city").innerHTML = "Geolocation is not supported by this browser.";
            }
  
        // getting local weather
        function getWeather(api) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status ==200) {
                    myObj = JSON.parse(this.responseText);
                    document.getElementById("city").innerHTML = myObj.name + ",";
                    cels = Math.ceil(myObj.main.temp);
                    document.getElementById("temp").innerHTML = cels;
                    fahr = (9 / 5 * cels +32);
                    document.getElementById("img").src = myObj.weather[0].icon;
                    document.getElementById("description").innerHTML = myObj.weather[0].description;
                }
            }   
            xhttp.open("GET", api, true);
            xhttp.send(); 
        }
  
        // changing of measure
        $("#measure").click(function() {
            var element = document.getElementById("measure");
            if (element.innerHTML === "C") {
                element.innerHTML = "F";
                document.getElementById("temp").innerHTML = fahr;
            } 
            else {
                element.innerHTML = "C";
                document.getElementById("temp").innerHTML = cels;
            }
        });
    }
);


