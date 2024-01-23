import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherApp from './Weather';
import { init } from 'react-intl-universal';

const locales = {
  en: require('./locales/en.json'),
  pa: require('./locales/pa.json'),
};

function determineLocale() {
  // Implement your logic to determine the current locale
  // For simplicity, we'll return 'pa' for Punjabi in this example
  return 'en';
}

function App() {
  const [currentLocale, setCurrentLocale] = useState(determineLocale());
  console.log('Rendering with Locale:', currentLocale);

  useEffect(() => {
    initializeLocale();
  }, [currentLocale]);

  const initializeLocale = () => {
    init({
      currentLocale,
      locales,
    });
    console.log('Locales initialized');
  };

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'pa' : 'en';
    setCurrentLocale(newLocale);
  };

  return (
    <div className="App">
      <div>
        <button onClick={toggleLocale}>
          {currentLocale === 'en' ? 'Switch to Punjabi' : 'Switch to English'}
        </button>
      </div>
      <WeatherApp locale={currentLocale} />
    </div>
  );
}

export default App;
