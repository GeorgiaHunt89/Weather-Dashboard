// Global Const
const $enterCity = document.querySelector('#enter-city');
const $userForm = document.querySelector('#user-form');
const $searchButton = document.querySelector ('#search-button');
const $clearHistory = document.querySelector ('#clear-history');
const $cityName = document.querySelector ('#city-name');
const $currentWeather = document.querySelector ('#current-weather');
const $currentWeatherImg = document.querySelector ('#current-weather-img');
const $temperature = document.querySelector ('#temperature');
const $feelsLike = document.querySelector ('#feels-like')
const $humidity = document.querySelector ('#humidity');
const $windSpeed = document.querySelector ('#wind-speed');
const $minTemperature = document.querySelector ('#min-temperature');
const $maxTemperature = document.querySelector ('#max-temperature');
const $currentUVIndex = document.querySelector ('#UV-index');
const $history = document.querySelector ('#search-history');
const $fiveDayForcast = document.querySelector ('#five-day-forcast');
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
        const todayDate = dayjs().format('dddd, MMMM D, YYYY, h:mmA');
        $("#currentDay").html(todayDate);
        // Request current weather for city, temp, humidity, feels like, wind speed and weather icon
        $cityName.innerHTML = `${data.city.name} (${todayDate})`;
        let weatherImg = data.list[2].weather.icon;
        $currentWeatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${weatherImg}@2x.pmg`);
        $currentWeatherImg.setAttribute('alt', data.list[2].weather.description);
        $temperature.innerHTML = `${'Temperature: '}${data.list[1].main.temp}${' \u00B0C'}`;
        $feelsLike.innerHTML=  `${'Feels Like: '}${data.list[1].main.feels_like}${' \u00B0C'}`
        $humidity.innerHTML = `${'Humidity: '}${data.list[1].main.humidity}${' %'}`;
        $windSpeed.innerHTML = `${'Wind Speed: '}${data.list[4].wind.speed}${' mph'}`;
        $minTemperature.innerHTML = `${'Min Temperature: '}${data.list[1].main.temp_min}${' \u00B0C'}`;
        $maxTemperature.innerHTML = `${'Max Temperature: '}${data.list[1].main.temp_max}${' \u00B0C'}`;
    
        // Request UV index
        let lat = `${data.city.coord.lat}`;
        let lon = `${data.city.coord.lon}`;
        let UVQueryURL = 'https://api.openweathermap.org/data/2.5/uvi/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY + '&cnt=1';
        fetch (UVQueryURL)
        .then(function (response) {
            let UVIndex = document.createElement('span');

            // Set UV Index prompts to display red for high, yellow for medium and green for low
            if (response < 4){
                UVIndex.setAttribute('class', 'badge badge-low');
            }
            else if (response < 8){
                UVIndex.setAttribute('class', 'badge badge-medium');
            }
            else {
                UVIndex.setAttribute('class', 'badge badge-high');
            }
            console.log(response)
            UVIndex.innerHTML = response;
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