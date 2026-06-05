document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "7f936c6b70dcf7117addd8ff3295fd73"; // Your OpenWeatherMap API key

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    cityNameDisplay.textContent = data.name;
    temperatureDisplay.textContent = `Temperature: ${data.main.temp} °C`;
    descriptionDisplay.textContent = `Weather: ${data.weather[0].description}`;

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

  function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
});
