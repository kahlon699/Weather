import React, { useState,useEffect } from 'react';
import axios from 'axios';
import intl from 'react-intl-universal';
const WeatherApp = ({locale}) => {
  const [greeting, setGreeting] = useState('');
  const [btnGetWeather, setbtnGetWeather] = useState('');
  const [txtEnterCity, settxtEnterCity] = useState('');  
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const apiKey = 'c03664bedb1f9d07ca52d9ed9bbe60e3';

  useEffect(() => { 
    // Set initial values for greeting and buttontext
    // Initialize react-intl-universal with the correct locales
    intl.init({
      currentLocale: locale,
      locales: {
        // Add your locales here
        en: require('./locales/en.json'),
        pa: require('./locales/pa.json'),
      },
    });
    
    setGreeting(intl.get('greeting'));
    setbtnGetWeather(intl.get('btnGetWeather'));
    settxtEnterCity(intl.get('txtEnterCity'));

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
          <h5><img id="wicon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}  alt="Weather Icon" /></h5>   
          <p> 
          {intl.get('description')}: {weather.weather[0].description}         
            </p>
            <p>{intl.get('temperature')}: {Math.round(weather.main.temp)} °C</p>
            <p>{intl.get('feels_like')}: {Math.round(weather.main.feels_like)} °C</p>
            <p>{intl.get('temp_min')}: {Math.round(weather.main.temp_min)} °C</p>
            <p>{intl.get('temp_max')}: {Math.round(weather.main.temp_max)} °C</p>
            <p>{intl.get('pressure')}: {Math.round(weather.main.pressure)} Pa</p>
            <p>{intl.get('visibility')}: {Math.round(weather.visibility)} m</p>
            <p>{intl.get('wind')}:</p>
            <p>{intl.get('speed')}: {Math.round(weather.wind.speed)} km/s</p>
            <p>{intl.get('deg')}: {Math.round(weather.wind.deg)} °NW</p>  
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
