var APIKey = '5247950f7c576368fc9eeff98c6e0b3a';

var city;

var searchbtn = document.getElementById('searchbtn');

//query url https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key};

//icon url https://openweathermap.org/img/wn/10d@2x.png

searchbtn.addEventListener("click", function() {
    city = document.getElementById('city-search').value;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial"; 
    fetch(queryURL)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log(data);
        city = data.name;
        var icon = data.weather[0].icon;
        var temperature = data.main.temp;
        var windSpeed = data.wind.speed;
        var humidity = data.main.humidity;
        var longitude = data.coord.lon;
        var latitude = data.coord.lat;
        displayCurrent(city, icon, temperature, windSpeed, humidity);
    })

}); 

function displayCurrent(city, icon, temperature, windSpeed, humidity) {
    document.getElementById('current-city').textContent = city;
    document.getElementById('current-weather-icon').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.getElementById('current-temperature').textContent = "Temp: " + temperature + " \xB0" + "F";
    document.getElementById('current-wind-speed').textContent = "Wind: " + windSpeed + " MPH";
    document.getElementById('current-humidity').textContent = "Humidity: " + humidity + " %";
}
