function displayTemperature(response) {
  console.log(response.data);
  let temperatureNumber = document.querySelector("#temperature");
  let cityWord = document.querySelector("#city");
  let descriptionWord = document.querySelector("#description");
  let pressureWord = document.querySelector("#pressure");
  let humidityWord = document.querySelector("#humidity");
  let windWord = document.querySelector("#wind");

  temperatureNumber.innerHTML = Math.round(response.data.main.temp);
  cityWord.innerHTML = response.data.name;
  descriptionWord.innerHTML = response.data.weather[0].description;
  pressureWord.innerHTML = response.data.main.pressure;
  humidityWord.innerHTML = response.data.main.humidity;
  windWord.innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "602c4f12fdc5707a356fb2740b6b3e24";
let cityName = "Kyiv";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  apiKey +
  "&units=metric";

axios.get(apiUrl).then(displayTemperature);
