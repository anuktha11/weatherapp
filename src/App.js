import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const KEY = '7f34096a40e061c3cf4ddf521e8e4942'

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data');
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>WEATHER APP</h3>
        <div>
          <input
            type="text"
            placeholder="Search city / town ..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchData}>Search</button>
        </div>
        {error && <p>{error}</p>}
        {weatherData && (
          <div>
            <p>{weatherData.name}, {weatherData.sys.country}</p>
            <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>{weatherData.weather[0].main}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
