function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date();
  let currentDay = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let formattedDate = `${currentDay}, ${hours}:${minutes}`;

  return formattedDate;
}

let dateTime = document.querySelector(".dateTime");
dateTime.innerHTML = formatDate();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h3 = document.querySelector("h3");
  if (searchInput.value) {
    h3.innerHTML = `Searching for ${searchInput.value}...`;
    const weather = searchCityWeather(searchInput.value);
  } else {
    h3.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let city = "";
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  
  let humidityComp = document.querySelector("#lblHumidity");
  let windComp = document.querySelector("#lblWind");
  
  celsiusTemperature = response.data.main.temp;

  humidityComp.innerHTML = response.data.main.humidity;
  windComp.innerHTML = Math.round(response.data.wind.speed * 3.6);
  
  let mainLabel = document.querySelector("#mainTemp");
  mainLabel.innerHTML = temperature + "°C";
  city = response.data.name;
  let message = `It is ${temperature}°C in ${city}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;
}

function searchCityWeather(city) {
  let apiKey = "e15ddd1e1139e9ce1b12520a5c0ecfeb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showTemperature);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `It is currently ${temperature}°C in ${response.data.name}`;
}

function showPosition(position) {
  let p = document.querySelector("p");
  let apiKey = "e15ddd1e1139e9ce1b12520a5c0ecfeb";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  p.innerHTML = `Your Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLoc = document.querySelector("button");
currentLoc.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemp");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature) + "°F";
  let searchInput = document.querySelector("#search-text-input").value;
  document.querySelector("h1").innerHTML = `It is ${fahrenheiTemperature}°F in ${city}`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "°C";
  let searchInput = document.querySelector("#search-text-input").value;
  document.querySelector("h1").innerHTML = `It is ${celsiusTemperature}°C in ${city}`;
}

let celsiusTemperature = null;

document.querySelector("#fLink").addEventListener("click", displayFahrenheitTemperature);
document.querySelector("#cLink").addEventListener("click", displayCelsiusTemperature);