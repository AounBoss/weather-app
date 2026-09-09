import { useEffect, useState } from 'react';
import WeatherSearch from './Search';
import './App.css'

function App() {

  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [temp, setTemp] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [time, setTime] = useState();
  const [cityName, setCityName] = useState();



  const fetchweather = async (city = 'Karachi') => {
    try {
      setLoading(true);
      setError('');

      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
      );
      if (!geoResponse.ok) {
        throw new Error('Could not find city.');
      }
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found.Please check spelling.');
      }
      const { latitude, longitude, name, country } = geoData.results[0];
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Unable to fetch Weather.');
      }
      const data = await response.json();
      console.log('data:', data);

      setCityName(`${name},${country}`);
      setTime(data.current.time);
      setTemp(data.current.temperature_2m);
      setWindSpeed(data.current.wind_speed_10m);


      setLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchweather();
  }, []);




  return (
    <>
      <section id="center">
        <div className="hero">
          <WeatherSearch onSearch={fetchweather} />

          {loading ? (<h1>Loading</h1>) : error ? (<h1>{error}</h1>) : (<div><h2>{cityName}</h2><h1>{temp}°C</h1>
            <h1>{time}</h1><h1>{windSpeed}</h1>km/hr</div>)}
        </div>
      </section >

      <div className="ticks"></div>

      <section id="spacer"></section>
    </>


  );
}

export default App;
