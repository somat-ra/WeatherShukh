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

  temperatureNumber.innerHTML = Math.round(response.data.main.temp);
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

let form = document.querySelector("#search-place");
form.addEventListener("submit", submit);
