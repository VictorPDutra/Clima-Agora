const apiKey = "f6a3fc8bb61b63614249805be0b4bc85";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-button");

const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");


const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const response = await fetch(apiWeatherURL);
    const data = await response.json();

    return data;
} 

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${parseInt(data.wind.speed)}km/h`;
    
    weatherContainer.classList.remove("hide");

}


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!cityInput.value) {
        document.querySelector("#input-error").style.display = "block";
        document.querySelector(".form input").style.border = "2px solid #ff0000";
    }

    else {
    document.querySelector("#input-error").style.display = "none";
    document.querySelector(".form input").style.border = "none";

    const city = cityInput.value;

    cityInput.value = "";
    cityInput.focus();

    showWeatherData(city);
    }
});