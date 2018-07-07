var fahrenheit;

function changeToF(temperature) {
    fahrenheit = temperature * 9 / 5 + 32;
    $("#temperature").text(fahrenheit + " " + "°");
    $("#temperature").append("<a onclick='changeToC(fahrenheit)'>F</a>");
}

function changeToC(fahrenheit) {
    temperature = (fahrenheit - 32) * 5 / 9;
    $("#temperature").text(temperature + " " + "°");
    $("#temperature").append("<a onclick='changeToF(temperature)'>C</a>");
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeather(lat, lon) {
    /*Get weather from location function*/
    $.ajax({
        /*
                 Alternate URL
                 url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=690660b930904f0cee1975853d5a2375",
                 */
        url:
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        lon,
        dataType: "jsonp",
        success: function (results) {
            /* alert(JSON.stringify(results));*/
            temperature = results.main.temp;
            var country = results.sys.country;
            var city = results.name;
            var desc = results.weather[0].main;
            var icon = results.weather[0].icon;
            $("#loc").text(city + ", " + country);
            $("#temperature").text(temperature + " " + "°");
            $("#temperature").append(
                "<a id='tempToggle' onclick='changeToF(temperature)'>C</a>"
            );
            $("#description").text(desc);
            $("#imgIcon").attr("src", icon);
        }
    });
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    getWeather(lat, lon);
}

getLocation();
