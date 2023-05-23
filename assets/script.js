var APIKey = '5247950f7c576368fc9eeff98c6e0b3a';
var searchbtn = document.getElementById('searchbtn');
var currentdate = dayjs().format('M/D/YYYY');
var searchHistory = document.getElementById('search-history');
var city;

function getWeather() {
    city = document.getElementById('city-search').value.trim();
    document.getElementById('city-search').value = "";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        city = data.name;
        if(!localStorage.hasOwnProperty(city.replace(' ', '-').toLowerCase())) {
            localStorage.setItem(city.replace(' ', '-').toLowerCase(), city);
            var newCity = document.createElement('button');
            newCity.id = city.replace(' ', '-').toLowerCase();
            newCity.textContent = localStorage.getItem(newCity.id);
            formatHistory(newCity);
        }
        var icon = data.weather[0].icon;
        var temperature = data.main.temp;
        var windSpeed = data.wind.speed;
        var humidity = data.main.humidity;
        var longitude = data.coord.lon;
        var latitude = data.coord.lat;
        displayCurrent(city, icon, temperature, windSpeed, humidity);
        getFiveDays(latitude, longitude);
    })
}

function displayCurrent(city, icon, temperature, windSpeed, humidity) {
    document.getElementById('current-city').textContent = city +  " (" + dayjs().format('M/D/YYYY') + ")";
    document.getElementById('current-weather-icon').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.getElementById('current-temperature').textContent = "Temp: " + temperature + " \xB0" + "F";
    document.getElementById('current-wind-speed').textContent = "Wind: " + windSpeed + " MPH";
    document.getElementById('current-humidity').textContent = "Humidity: " + humidity + " %";
}

function getFiveDays(latitude, longitude) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        var weatherDays = [];
        var date = dayjs(currentdate).format('YYYY-MM-DD');
       for(var i = 0; i < data.list.length-1; ++i) {
        if(data.list[i+1].dt_txt.split(' ')[0] !== date) {
            weatherDays.push(data.list[i+1]);
            date = data.list[i+1].dt_txt.split(' ')[0];
        }
       }
       for(var i = 0; i < 5; ++i) {
        document.getElementById('card-' + (i+1)).textContent = dayjs(weatherDays[i].dt_txt.split(' ')[0]).format('M/D/YYYY');
        document.getElementById('weather-icon-' + (i+1)).src = "https://openweathermap.org/img/wn/" + weatherDays[i].weather[0].icon + "@2x.png";
        document.getElementById('temp-' + (i+1)).textContent = "Temp: " + weatherDays[i].main.temp + " \xB0" + "F";
        document.getElementById('wind-' + (i+1)).textContent = "Wind: " + weatherDays[i].wind.speed + " MPH";
        document.getElementById('humidity-' + (i+1)).textContent = "Humidity: " + weatherDays[i].main.humidity + " %";
       }
;    })
}

function getWeatherFromHistory(event) {
    document.querySelector('#city-search').value = event.target.innerHTML;
    getWeather();
}

function displayHistory() {
if(localStorage.length > 0) {
  for(var i = 0; i < localStorage.length; ++i) {
    var entry = document.createElement('button');
    entry.innerHTML = localStorage.getItem(localStorage.key(i));
    entry.id = localStorage.key(i);
    formatHistory(entry);
   }
  }
}

function formatHistory(element) {
element.style.backgroundColor = 'lightgray';
    element.style.marginBottom = '0.8rem';
    element.addEventListener("click", getWeatherFromHistory);
    searchHistory.appendChild(element);
}


searchbtn.addEventListener("click", getWeather);
displayHistory();
