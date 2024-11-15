

async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "your_actual_api_key_here";  // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 
 
    if (!city) {
        document.getElementById("weatherInfo").innerHTML = "<p>Please enter a city.</p>";
        document.getElementById("weatherInfo").style.display = "block";
        return;
    }
 
 
    try {
        const response = await fetch(url);
        const data = await response.json();
 
 
        // Log the response data to inspect it
        console.log(data);
 
 
        if (data.cod === "404") {
            document.getElementById("weatherInfo").innerHTML = "<p>City not found. Please try again.</p>";
            document.getElementById("weatherInfo").style.display = "block";
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506748686214-03399e597c8d')";  // Default background
        } else {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
 
 
            document.getElementById("weatherInfo").innerHTML = `
                <h2>Weather in ${city}</h2>
                <p><strong>Condition:</strong> ${weatherDescription}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
            `;
            document.getElementById("weatherInfo").style.display = "block";
 
 
            // Change background based on the weather condition
            if (weatherDescription.includes("clear")) {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1466790002277-44644a135a3b')"; // Sunny weather background
            } else if (weatherDescription.includes("cloudy")) {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506748686214-03399e597c8d')"; // Cloudy weather background
            } else if (weatherDescription.includes("rain")) {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1563245295-d7b05434ac4b')"; // Rainy weather background
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("weatherInfo").innerHTML = "<p>Error retrieving weather data. Please try again later.</p>";
        document.getElementById("weatherInfo").style.display = "block";
    }
 }
 
 
 