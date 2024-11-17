function getweather() {
    const apiKey = `5e9ffe5a6b9020ee2ff030adf6bccf52`
    const city = document.getElementById('city').value

    if (!city) {
        alert('please enter a city')
        return
    }
}
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon=${city}&appid=${apiKey}`
    const forecastUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon=${city}&appid=${apiKey}`


function getweather() {
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data =>{
            displayWeather(data)
        })
        .catch(error => {
            console.error(`Error fetching current weather
    data:`, error)
            alert(`Error fetching current weather data. Please
    try again.`)
        })
}

function getweather() {
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data =>{
        displayHourlyForcast(data.List)
    })
    .catch(error => {
        console.error(`Error fetching current weather
    data:`, error)
            alert(`Error fetching current weather data. Please
    try again.`)
    })
}

function displayWeather(data) {

    const tempDivInfo = document.getElementById('temp-div')
    const weatherInfoDiv = document.getElementById('weather-info')
    const weatherIcon = document.getElementById('weather-icon')
    const hourlyForcastDiv = document.getElementById('hourly-forecast')

    // Clear previous content
    weatherInfoDiv.innerHTML = ''
    hourlyForcastDiv.innerHTML = ''
    tempDivInfo.innerHTML = ''
}

function displayWeather(data) {
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
    } else {
        const cityName = data.name
        const temperature = Math.round(data.main.temp - 273.15)
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.src = description;

        showImage();
    }
}

function displayHourlyForcast(hourlyData) {
    const hourlyForcastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temprerature = Math.round(item.main.temp - 273.15)
        const iconCode = item.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt"Hourly Weather Icon">
                <span>${temprerature}°C</span>
            </div>    
        `;
        hourlyForcastDiv.innerHTML += hourlyItemHtml;

    })
}

function showImage() {
    
    const weatherIcon = document.getElementById(`weather-icon`);
    weatherIcon.style.display = 'block'
}