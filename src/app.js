function timeDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    ,
  ];

  return `${days[day]} ${hour}:${minutes}`;
}

function getForcast(coordinates) {
  let apiKey = "602c4f12fdc5707a356fb2740b6b3e24";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    coordinates.lat +
    "&lon=" +
    coordinates.lon +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(displayForcast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp);

  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForcast(response) {
  let forecast = response.data.daily;

  let forecastColumn = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <div class="weather-forcast-day">${formatDay(forecastDay.dt)}</div>
        <div class="weather-forecast-image">
        <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt="weatherimage"
        />
        </div>
        <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}˚</span>
        <span class="weather-forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}˚</span>
        </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastColumn.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureNumber = document.querySelector("#temperature");
  let cityWord = document.querySelector("#city");
  let descriptionWord = document.querySelector("#description");
  let pressureWord = document.querySelector("#pressure");
  let humidityWord = document.querySelector("#humidity");
  let windWord = document.querySelector("#wind");
  let dateWord = document.querySelector("#date");
  let image = document.querySelector("#image-weather");

  celciusTemp = response.data.main.temp;

  temperatureNumber.innerHTML = Math.round(celciusTemp);
  cityWord.innerHTML = response.data.name;
  descriptionWord.innerHTML = response.data.weather[0].description;
  pressureWord.innerHTML = response.data.main.pressure;
  humidityWord.innerHTML = response.data.main.humidity;
  windWord.innerHTML = Math.round(response.data.wind.speed);
  dateWord.innerHTML = `Last updated: ${timeDate(response.data.dt)}`;
  image.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  image.alt = response.data.weather[0].description;

  getForcast(response.data.coord);
}

function search(city) {
  let apiKey = "602c4f12fdc5707a356fb2740b6b3e24";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(displayTemperature);
}

function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityInput");
  search(cityElement.value);
}

search("Kyiv");

function changeFahrenheit(event) {
  event.preventDefault();

  let fahrenheitElement = (celciusTemp * 9) / 5 + 32;
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitElement);
}

function changeCelsius(event) {
  event.preventDefault();
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let form = document.querySelector("#search-place");
form.addEventListener("submit", submit);

let fahrenheitTemperature = document.querySelector("#fahrenheitTemp");
fahrenheitTemperature.addEventListener("click", changeFahrenheit);

let celsiusTemperature = document.querySelector("#celsiusTemp");
celsiusTemperature.addEventListener("click", changeCelsius);
