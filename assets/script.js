// Global Const
const $enterCity = document.querySelector('enter-city');
const $searchButton = document.querySelector ('search-button');
const $clearHistory = document.querySelector ('clear-history');
const $cityName = document.querySelector ('city-name');
const $currentWeather = document.querySelector ('current-weather');
const $currentWeatherImg = document.querySelector ('current-weather-img');
const $temperature = document.querySelector ('temperature');
const $humidity = document.querySelector ('humidity');
const $windSpeed = document.querySelector ('wind-speed');
const $uvIndex = document.querySelector ('UV-index');
const $history = document.querySelector ('search-history');
const $fiveDayForcast = document.querySelector ('five-day-forcast');
let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

