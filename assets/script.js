// Global Const
const $enterCity = document.querySelector('enter-city');
const $searchButton = document.querySelector ('search-button');
const $clearHistory = document.querySelector ('clear-history');
const $cityName = document.querySelector ('city-name');
const $currentWeather = document.querySelector ('current-weather');
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
const APIKey = '2154877dfa22839f66251364284b95a9';

// Connect to OpenWeather and request current weather from API
function requestWeather (requestCityName){
    let queryURL = ('https://api.openweathermap.org/data/2.5/forecast?q=' + requestCityName '&units=metric&appid=' + APIkey);
    fetch (queryURL)
    .then(function (response {

        // Calculate current date through dayjs 
        const todayDate = dayjs().format('dddd, MMMM D, YYYY h:mm A');
        $("#currentDay").html(todayDate);
        // Request current weather for city, temp, humidity, feels like, wind speed and weather icon
        $cityName.innerHTML = response.data.name + '('todayDate')':
        let weatherImg = response.data.weather[0].icon;
        $currentWeatherImg.setAttribute ('src ='https://openweathermap.org/img/wn/' + weatherImg + '@2x.pmg');
        $currentWeatherImg.setAttribute ('alt', response.data.weather[0].description);
        $temperature.innerHTML = 'Temperature: ' + k2C(response.data.main.temp) + '&#17C';
        $feelsLike.innerHTML= 'Feels Like: ' + response.data.feels.like + 'degrees'
        $humidity.innerHTML = 'Humidity: ' + response.data.main.humidty + '%';
        $windSpeed.innerHTML = 'Wind Speed: ' + response.data.wind.speed + ' mph';
    
        // Request UV index
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
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
    
    }))
}
