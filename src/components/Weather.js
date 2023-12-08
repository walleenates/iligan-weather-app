// Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const apiKey = 'c51eb163b2bb6284a6158ba26245a147';

const SearchBar = ({ fetchWeather }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    fetchWeather(searchQuery);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('srchBtn').click();
    }
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter barangay in Iligan City"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button id="srchBtn" onClick={handleSearch}>Search</button>
    </div>
  );
};

function Weather() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location},IliganCity&appid=${apiKey}&units=metric`
      );
      console.log('API Response:', response.data);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather('Iligan');
  }, []);

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return 'clear-sky-day.png';
      case '01n':
        return 'clear-sky-night.png';
      case '02d':
        return 'few-clouds-day.png';
      case '02n':
        return 'few-clouds-night.png';

      default:
        return null;
    }
  };

  if (!weather) {
    return <div className="loading">Loading...</div>;
  }

  const weatherIcon = getWeatherIcon(weather.weather[0].icon);

  const { main } = weather;
  const temperature = Math.round(main.temp);

  return (
    <div className="weather-container">
      <div className="logo">
        <img src="logoweather.png" alt="Logo" />
      </div>
      <SearchBar fetchWeather={fetchWeather} />
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${weatherIcon || 'few-clouds-night.png'})`,
        }}
      ></div>
      <div className="weather-content">
        <p className="time">{weather.time}</p>
        <h1 className="city">Iligan City Weather Forecast</h1>
        <p className="temperature">
          Temperature: {temperature} °c
        </p>
        {weather.weather[0].description && (
          <p className="weather-condition">{weather.weather[0].description}</p>
        )}
      </div>
    </div>
  );
}

export default Weather;