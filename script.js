// ===== Weather App JavaScript =====

// Step 1: Get API key from config.js (keeps it secret from GitHub)
const API_KEY = CONFIG.API_KEY;

// Step 2: Get references to HTML elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Step 3: Function to fetch weather data from API
async function getWeather(city) {
    // Build the API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        // Fetch data from the API
        const response = await fetch(url);

        // Convert response to JSON
        const data = await response.json();

        // Log response for debugging (open browser Console with F12)
        console.log("API Response:", data);

        // If API returned an error code
        if (data.cod !== 200) {
            showError(data.message || "City not found. Please try again.");
            return;
        }

        // Display the weather data
        displayWeather(data);

    } catch (error) {
        // Log error for debugging
        console.log("Error:", error);
        // Handle network errors
        showError("Something went wrong. Check your connection.");
    }
}

// Step 4: Function to display weather on the page
function displayWeather(data) {
    // Hide error message
    errorMsg.textContent = "";

    // Fill in the weather card with data
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    wind.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h

    // Show the weather card
    weatherCard.style.display = "block";
}

// Step 5: Function to show error messages
function showError(message) {
    errorMsg.textContent = message;
    weatherCard.style.display = "none"; // Hide weather card on error
}

// Step 6: Add click event to search button
searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim(); // Get input and remove extra spaces

    // Check if input is empty
    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    // Fetch weather for the entered city
    getWeather(city);
});

// Step 7: Allow pressing Enter key to search
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click(); // Trigger the button click
    }
});
