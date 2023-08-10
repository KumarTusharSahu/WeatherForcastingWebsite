import React, { useState, useEffect } from "react";
import "./styles/CurrentWeather.css";
import axios from 'axios';

import Clock from 'react-live-clock';

const CurrentWeather = () => {
  const date = new Date().toDateString();

  const [currLocation, setCurrLocation] = useState({});
  const [temp, setTemp] = useState();
  const getLocation = async () => {

    const location = await axios.get('https://ipapi.co/json');
    setCurrLocation(location.data);

  }
  useEffect(() => {
    getLocation();
  }, [])
  const city = currLocation.city;
  const country = currLocation.country;

  const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e3fb2970596a339641181651dcabfe08`;

    const response = await fetch(url);
    const resJson = await response.json();
    setTemp(resJson.main.temp);
    // console.log(resJson.main.temp);
  }

  if (city) {
    getWeather(city);
  }
  else {
    console.log("current data not found");
  }

  return (
    <div className="background">
      <h1>{city}</h1>
      <h3>{country}</h3>
      <div className="bottom">
        <span className='check'>

          <div className="time">
            <Clock format={'HH:mm:ss'} ticking={true} />
          </div>
          <div className="date">{date}</div>
        </span>
        <span className="temperature">
          {temp}°C
        </span>
      </div>
    </div>
  )
}

export default CurrentWeather
