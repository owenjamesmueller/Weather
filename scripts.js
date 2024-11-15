document.addEventListener('DOMContentLoaded', function () {
  // Event listener for the "Get Weather" button
  document.getElementById('get-weather').addEventListener('click', function () {
    const city = document.getElementById('city').value.trim(); // Get the city from the input field

    if (city === "") {
      alert("Please enter a city name.");
      return; // Stop execution if no city is entered
    }

    const apiKey = "20ed546b6cd5e3eb828c4d35530d1fd0"; // Replace with your OpenWeather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch weather data from OpenWeather API
    fetch(apiUrl)
      .then(response => response.json()) // Parse JSON data
      .then(data => {
        if (data.cod === "404") {
          // City not found
          document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
        } else {
          // Successfully received weather data
          const weatherDescription = data.weather[0].description;
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;

          // Build the weather info HTML
          const weatherHTML = `
            <h3>Weather in ${data.name}, ${data.sys.country}</h3>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Condition:</strong> ${weatherDescription}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
          `;
          
          // Insert the weather info into the page
          document.getElementById('weather-info').innerHTML = weatherHTML;
        }
      })
      .catch(error => {
        // In case of any error (e.g., network issue)
        document.getElementById('weather-info').innerHTML = `<p>There was an error fetching the weather data. Please try again later.</p>`;
        console.error('Error fetching weather data:', error);
      });
  });
});
