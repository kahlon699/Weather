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
  return 'pa';
}

function App() {
  const [currentLocale, setCurrentLocale] = useState(determineLocale());

  console.log('Rendering with Locale:', currentLocale);

  useEffect(() => {
    const locale = determineLocale();
    console.log('Current Locale:', locale);

    init({
      currentLocale: locale,
      locales,
    });

    console.log('Locales initialized');
    setCurrentLocale(locale);
  }, []);

  return (
    <div className="App">
      <WeatherApp locale={currentLocale} />
    </div>
  );
}

export default App;
