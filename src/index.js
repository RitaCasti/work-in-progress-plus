function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showPosition);

function searchPosition(position) {
  let apiKey = "754e983504b813887227b74c34ced100";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

function searchCity(city) {
  let apiKey = "754e983504b813887227b74c34ced100";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}
function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  let heading = document.querySelector("#city");
  heading.innerHTML = `${cityName.value}`;

  searchCity(cityName.value);
}
let form = document.querySelector("#form-city");
form.addEventListener("search", showCity);
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let cityTemp = document.querySelector("#city-temp");
  cityTemp.innerHTML = `${temperature}`;
  console.log(`${temperature}º ${city}`);
  let heading = document.querySelector("#city");
  heading.innerHTML = city;

  let cityDescription = document.querySelector("#description");
  let description = response.data.weather[0].description;
  let cityWind = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  let cityHumidity = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  cityDescription.innerHTML = `${description}`;
  cityWind.innerHTML = `Wind: ${wind}km/h`;
  cityHumidity.innerHTML = `Humidity:${humidity}%`;
}

let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes}`;
  let cityDate = document.querySelector("#date-now");
  cityDate.innerHTML = formattedDate;
}
console.log(formatDate(currentTime));
