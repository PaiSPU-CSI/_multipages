import { useState, useEffect } from "react";
import Variable from "../Variable/Variable";

import './Temperatures.css';
function Temperatures({theType,cValue}) {
  //render
  let [celsius, setCeisius] = useState(0);
  let [fahrenheit, setFahrenheit] = useState(0);
  let [kelvin, setKelvin] = useState(0);
  let [typeDis, setTypeDis] = useState('int');

  useEffect(() => {
    setCeisius(cValue || 0);
    setFahrenheit(celsiusToFahrenheit(cValue) ||0);
    setKelvin(celsiusToKelvin(cValue) || 0)
    setTypeDis(theType || 'int');
  }, [cValue]);

  const handleCeisiusClick = (theValue) =>{
    setCeisius(theValue);
    setFahrenheit(celsiusToFahrenheit(theValue));
    setKelvin(celsiusToKelvin(theValue)); 
  }

  const handleFahrenheitClick = (theValue) =>{
    setFahrenheit(theValue);
    setCeisius(fahrenheitToCelsius(theValue));
    setKelvin(fahrenheitToKelvin(theValue));
  }

  const handleKelvinClick = (theValue) =>{
    setKelvin(theValue);
    setCeisius(kelvinToCelsius(theValue));
    setFahrenheit(kelvinToFahrenheit(theValue));
  }
  
  const celsiusToFahrenheit = (c) => c * 9 / 5 + 32;
  const celsiusToKelvin = (c) => c + 273.15;
  const fahrenheitToCelsius = (f) => (f - 32) * 5 / 9;
  const fahrenheitToKelvin = (f) => (f + 459.67) * 5 / 9;
  const kelvinToCelsius = (k) => k - 273.15;
  const kelvinToFahrenheit = (k) => (k * 9 / 5) - 459.67;

  return (<div className="temperatures">
    <h3 className="temperatures-title">Temperatures</h3>
    <h2 className="temperatures-display">
      <span className='badge bg-primary'>{(typeDis == 'int' ? Math.floor(celsius) : celsius.toFixed(2))} &deg;C</span>
      <span className='badge bg-primary'>{(typeDis == 'int' ? Math.floor(fahrenheit) : fahrenheit.toFixed(2))} &deg;F</span>
      <span className='badge bg-primary'>{(typeDis == 'int' ? Math.floor(kelvin) : kelvin.toFixed(2))} &deg;K</span>
    </h2>
    <div className="temperatures-container">
      <Variable type={typeDis} name={'Celsius'} value={celsius} setValue={handleCeisiusClick} />
      <Variable type={typeDis} name={'Fahrenheit'} value={fahrenheit} setValue={handleFahrenheitClick} />
      <Variable type={typeDis} name={'Kelvin'} value={kelvin} setValue={handleKelvinClick} />
    </div>
  </div>);
}

export default Temperatures;