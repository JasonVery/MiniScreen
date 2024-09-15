//Simple weather api for mini screen app
//Not really error logging but simple enough to fix later if needed

document.addEventListener("DOMContentLoaded", function () { 
    //Get key from openweathermap
    const apiKey = "";
    // Hardcoded city as well, dont plan on moving soon
    const cityName = "Calgary";

    // Call to update weather every 10 minutes
    setInterval(() => fetchWeather(cityName, apiKey), 600000);
    fetchWeather(cityName, apiKey); 
});

// Function to fetch the current weather and display it
async function fetchWeather(cityName, apiKey) {
    // Create URL with params
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    // Got the response, now get specific data
    const data = await response.json();
    const { main, weather, name } = data;

    // Display the data
    const cityNameElement = document.getElementById("city");
    const weatherIcon = document.getElementById("weatherIcon");
    const temperature = document.getElementById("weatherTemp");
    const weatherInfo = document.getElementById("weatherInfo");

    cityNameElement.innerHTML = name; // Use the correct data for city name

    // Set temperature and weather info
    temperature.innerHTML = `${Math.round(main.temp)}°C` ;
    weatherInfo.innerHTML = weather[0].description;

    // Set weather icon if possible
    const iconCode = weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
}


