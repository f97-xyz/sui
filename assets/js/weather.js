const iconElement = document.querySelector('#weather-icon');
const tempElement = document.querySelector('#weather-text');
const locationElement = document.querySelector('#weather-location');

// App data
const weather = {};
weather.temperature = {
    unit: 'celsius',
};

// Change to 'F' for Fahrenheit
var tempUnit = 'C';

// Here you can change your position
// You can use https://www.latlong.net/ to get it! 
latitude = 15.572840;
longitude = 108.470978;
locale = 'Tam Kỳ';

const KELVIN = 273.15;
// Use your own key for the Weather, Get it here: https://openweathermap.org/
const key = 'fafa12fe16f2f85bab757995af7d38f3';

// Get the weather
getWeather();

// Get the Weather data
function getWeather() {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(api);

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            let celsius = Math.floor(data.main.temp - KELVIN);
            weather.temperature.value = (tempUnit == 'C') ? celsius : (celsius * 9/5) + 32;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
        })
        .then(function () {
            displayWeather();
        });
}

// Display Weather info
function displayWeather() {
    iconElement.innerHTML = `<img src="./assets/icons/OneDark/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `<span class="weather-temp">${weather.temperature.value}°${tempUnit}</span><span class="weather-description">${weather.description}</span>`;
    locationElement.innerHTML = locale;
}
