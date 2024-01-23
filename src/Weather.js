import React, { useState, useEffect } from 'react';
import axios from 'axios';
import intl from 'react-intl-universal';

const WeatherApp = ({ locale }) => {
  const [greeting, setGreeting] = useState('');
  const [btnGetWeather, setBtnGetWeather] = useState('');
  const [txtEnterCity, setTxtEnterCity] = useState('');

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = 'c03664bedb1f9d07ca52d9ed9bbe60e3';

  useEffect(() => {
    // Set initial values for greeting, button text, and placeholder
    setGreeting(intl.get('greeting'));
    setBtnGetWeather(intl.get('btnGetWeather'));
    setTxtEnterCity(intl.get('txtEnterCity'));
  }, [locale]);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h1>{greeting}</h1>
      <input
        type="text"
        placeholder={txtEnterCity}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeatherData}>{btnGetWeather}</button>

      {weather && (
        <div>
          {/* Your weather details rendering code here */}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
