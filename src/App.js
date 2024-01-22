import React, { useEffect } from 'react';
import './App.css';
import WeatherApp from './Weather';
import {  init } from 'react-intl-universal';


const locales = {
  en: require('./locales/en.json'), // Replace with the actual path to your English translations
  pa: require('./locales/pa.json'), // Replace with the actual path to your Punjabi translations
};
function determineLocale() {
  // Implement your logic to determine the current locale (e.g., from user preferences or browser settings)
  // For simplicity, we'll return 'en' for English in this example
  return 'en';
}


function App() {
  useEffect(() => {
    const currentLocale = determineLocale();
    console.log('Current Locale:', currentLocale);

    init({
      currentLocale,
      locales,
    });

    console.log('Locales initialized');
  }, []);

  const currentLocale = determineLocale();
  console.log('Rendering with Locale:', currentLocale);

  return (
    <div className="App">
      <WeatherApp locale={currentLocale} />
    </div>
  );
}

export default App;
