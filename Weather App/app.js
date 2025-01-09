// weather app

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const forecastCard = document.querySelector(".forecastCard");  // Add a forecast section for the next 4 days
const apiKey = "5e9ffe5a6b9020ee2ff030adf6bccf52";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            const forecastData = await getForecastData(city);  // Fetch forecast data
            displayWeatherInfo(weatherData);
            displayForecastInfo(forecastData);  // Display forecast for the next 4 days
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Could not fetch weather data');
    }

    return await response.json();
}

async function getForecastData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Could not fetch forecast data');
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function displayForecastInfo(data) {
    forecastCard.textContent = "";  // Clear previous forecast
    forecastCard.style.display = "flex";

    const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);  // Extract data every 8th item (approx 24 hours)

    dailyForecasts.slice(1, 5).forEach(forecast => {  // Skip today (index 0) and show next 4 days
        const { dt, main: { temp }, weather: [{ description, id }] } = forecast;

        const date = new Date(dt * 1000);  // Convert from Unix timestamp to Date
        const dateString = date.toLocaleDateString();

        const dayDisplay = document.createElement("div");
        dayDisplay.classList.add("forecastDay");

        const dateDisplay = document.createElement("h2");
        const tempDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        dateDisplay.textContent = dateString;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        dayDisplay.appendChild(dateDisplay);
        dayDisplay.appendChild(tempDisplay);
        dayDisplay.appendChild(descDisplay);
        dayDisplay.appendChild(weatherEmoji);

        forecastCard.appendChild(dayDisplay);
    });
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "💨";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❔";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    forecastCard.textContent = "";  // Clear any previous forecast
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
