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
      <button id="srchBtn" onClick={handleSearch}>
        Search
      </button>
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

  if (!weather) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="weather-container">
      <div className="card">
        <div className="background-image">
          <img src="logoweather.png" alt="Weather Logo" className="logo" loading="lazy" />
          <div className="overlay">
            <h1 className="city">{weather.name}</h1>
            <h2 className="temperature">{Math.round(weather.main.temp)}°C</h2>
            <h3 className="weather-condition">{weather.weather[0].description}</h3>
          </div>
        </div>
        <SearchBar fetchWeather={fetchWeather} />
      </div>
    </div>
  );
}

export default Weather;
