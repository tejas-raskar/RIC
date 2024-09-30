import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const apiKey = '7c8e848722e9c82fe92391d2ff845aef';
  const lat = '44.34';
  const lon = '10.99';

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => setWeatherData(data));

    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => setForecastData(data));
  }, [apiKey]);

  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Weather Forecast Dashboard</h1>
      <div className="current-weather">
        <h2>Current Weather</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
      <div className="forecast">
        <h2>7-Day Forecast</h2>
        {forecastData.list.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>Day {index + 1}</p>
            <p>Temperature: {day.temp.day}°C</p>
            <p>Humidity: {day.humidity}%</p>
            <p>Wind Speed: {day.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;