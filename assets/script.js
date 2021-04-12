// Global Const
const $enterCity = document.querySelector('#enter-city');
const $userForm = document.querySelector('#user-form');
const $searchButton = document.querySelector ('#search-button');
const $clearHistory = document.querySelector ('#clear-history');
const $cityName = document.querySelector ('#city-name');
const $currentWeather = document.querySelector ('#current-weather');
const $currentWeatherImg = document.querySelector ('current-weather-img');
const $temperature = document.querySelector ('temperature');
const $feelsLike = document.querySelector ('feels-like')
const $humidity = document.querySelector ('humidity');
const $windSpeed = document.querySelector ('wind-speed');
const $currentUVIndex = document.querySelector ('UV-index');
const $history = document.querySelector ('search-history');
const $fiveDayForcast = document.querySelector ('five-day-forcast');
let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

// Obtain and assign API key
const API_KEY = '2154877dfa22839f66251364284b95a9';

// Connect to OpenWeather and request current weather from API
function requestWeather (requestCityName){
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${requestCityName}&units=metric&appid=${API_KEY}`;
    fetch (queryURL)
    .then( response => response.json())
    .then(function (data) {

        // Calculate current date through dayjs 
        const todayDate = dayjs().format('dddd, MMMM D, YYYY h:mm A');
        $("#currentDay").html(todayDate);
        // Request current weather for city, temp, humidity, feels like, wind speed and weather icon
        $cityName.innerHTML = `${data.city.name} (${todayDate})`;
        let weatherImg = data.city.weather[0].icon;
        $currentWeatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${weatherImg}@2x.pmg`);
        $currentWeatherImg.setAttribute('alt', data.weather[0].description);
        $temperature.innerHTML = 'Temperature: ' + data.main.temp + ' degrees';
        $feelsLike.innerHTML= 'Feels Like: ' + data.feels_like + ' degrees'
        $humidity.innerHTML = 'Humidity: ' + data.main.humidty + '%';
        $windSpeed.innerHTML = 'Wind Speed: ' + data.wind.speed + ' mph';
    
        // Request UV index
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let UVQueryURL = 'https://api.openweathermap.org/data/2.5/uvi/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&cnt=1';
        fetch (UVQueryURL)
        .then(function (response) {
            let UVIndex = document.createElement('span');

            // Set UV Index prompts to display red for high, yellow for medium and green for low
            if (response.data[0].value < 4){
                UVIndex.setAttribute('class', 'badge badge-low');
            }
            else if (response.data[0].value <8){
                UVIndex.setAttribute('class', 'badge badge-medium');
            }
            else {
                UVIndex.setAttribute('class', 'badge badge-high');
            }
            console.log(response.data[0].value)
            UVIndex.innerHTML = response.data[0].value;
            $currentUVIndex.innerHTML = 'UV Index: ';
            $currentUVIndex.append(UVIndex);

        });
    
    });
}

$userForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = $enterCity.value.trim();
    requestWeather(city);
})