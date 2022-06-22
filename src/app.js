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

function displayForcast() {
  let forecastColumn = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forcast-day">${day}</div>
                <div class="weather-forecast-image">
                  <img
                    src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                    alt="weatherimage"
                  />
                </div>
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">20˚</span>
                  <span class="weather-forecast-temp-min">13˚</span>
                </div>
              </div>
           `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastColumn.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
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
}

function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityInput");
  console.log(cityElement);

  let apiKey = "602c4f12fdc5707a356fb2740b6b3e24";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityElement.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(displayTemperature);
}

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

displayForcast();
