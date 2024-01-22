import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { get } from 'react-intl-universal';
const WeatherApp = (locale) => {
  const [greeting, setGreeting] = useState('');
  const [btnGetWeather, setbtnGetWeather] = useState('');
  const [txtEnterCity, settxtEnterCity] = useState('');
  
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = 'c03664bedb1f9d07ca52d9ed9bbe60e3';


  useEffect(() => { 
    // Set initial values for greeting and buttontext
    setGreeting(get('greeting'));
    setbtnGetWeather(get('btnGetWeather'));
    settxtEnterCity(get('txtEnterCity'));
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
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{get('temperature')}: {Math.round(weather.main.temp)} °C</p>
          <p> <div>
          <h5><img id="wicon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}  alt="Weather Icon" /></h5>
            
          </div>
          <div>
          {get('description')}: {weather.weather[0].description}
          </div>
            </p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
