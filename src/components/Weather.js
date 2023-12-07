// Weather.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

const apiKey = "c51eb163b2bb6284a6158ba26245a147";

function Weather() {
  const [searchQuery, setSearchQuery] = useState("Iligan");
  const [weather, setWeather] = useState(null);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      );
      console.log("API Response:", response.data);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather(searchQuery);
  }, [searchQuery]);

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
        return "clear-sky-day.png";
      case "01n":
        return "clear-sky-night.png";
      case "02d":
        return "few-clouds-day.png";
      case "02n":
        return "few-clouds-night.png";

      default:
        return null;
    }
  };

  if (!weather) {
    return <div className="loading">Loading...</div>;
  }

  const weatherIcon = getWeatherIcon(weather.weather[0].icon);

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Enter city name"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <button onClick={() => fetchWeather(searchQuery)}>Search</button>
      </div>
      <div className="logo">
        <img src="logoweather.png" alt="Logo" />
      </div>

      <div
        className="background-image"
        style={{
          backgroundImage: `url(${weatherIcon || "few-clouds-night.png"})`,
        }}
      ></div>
      <div className="weather-content">
        <p className="time">{new Date().toLocaleTimeString()}</p>
        <h1 className="city">Iligan City Weather Forecast</h1>
        <p className="temperature">
          Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C
        </p>
        {weather.weather[0].description && (
          <p className="weather-condition">{weather.weather[0].description}</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
