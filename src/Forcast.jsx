import React, { useState, useEffect } from 'react'
import Info from "./Info";
import "./styles/Forcast.css"

import clear from "./images/clear.png";
import cloudy from "./images/cloudy.png";
import drizzle from "./images/drizzle.png";
import mist from "./images/mist.png";
import rainy from "./images/rainy.png";
import snowing from "./images/snowing.png";
import thunderstorm from "./images/thunderstorm.png";
import wind from "./images/wind.png";
import haze from "./images/haze.png";
import smoke from "./images/smoke.png";
import no from "./images/no-search-found.webp"

const Forcast = () => {

    const [city, setCity] = useState("jaipur");
    const [tempInfo, setTempInfo] = useState({});
    const [imgsrc, setImgsrc] = useState(no);

    const getWeatherInfo = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e3fb2970596a339641181651dcabfe08`
            // console.log({city});

            const response = await fetch(url);
            // console.log(response);

            const resJson = await response.json();
            // console.log(resJson);

            const { temp, humidity, feels_like } = resJson.main;
            // console.log(temp);
            // console.log(humidity);
            const searchedCity = resJson.name;
            // console.log(searchedCity)
            const { country } = resJson.sys;
            // console.log(country);
            const visibility = resJson.visibility;
            // console.log(visibility);
            const { speed } = resJson.wind;
            // console.log(speed);

            const { main } = resJson.weather[0];
            // console.log(main);

            const myNewWeatherInfo = {
                temp,
                humidity,
                feels_like,
                searchedCity,
                speed,
                country,
                visibility,
                main
            };

            setTempInfo(myNewWeatherInfo);
            // console.log(tempInfo);
            setCity("");


            switch (main) {
                case "Thunderstorm": setImgsrc(thunderstorm);
                    break;
                case "Drizzle": setImgsrc(drizzle);
                    break;
                case "Rain": setImgsrc(rainy);
                    break;
                case "Snow": setImgsrc(snowing);
                    break;
                case "Mist": setImgsrc(mist);
                    break;
                case "Smoke": setImgsrc(smoke);
                    break;
                case "Haze": setImgsrc(haze);
                    break;
                case "Dust": setImgsrc(wind);
                    break;
                case "Sand": setImgsrc(wind);
                    break;
                case "Clear": setImgsrc(clear);
                    break;
                case "Clouds": setImgsrc(cloudy);
                    break;
                default: setImgsrc(no);
                    break;
            }
        } catch (error) {
            alert("Data not found! Please check that spelling is correct or City may not exist");
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);


    return (
        <>
            <div className="blacky">
                <img src={imgsrc} alt={tempInfo.main} className="weatherIcon animated" />
                <h1>{tempInfo.main}</h1>
                <hr />
                <input type="search" placeholder="Search any city" onChange={(event) => { setCity(event.target.value) }} value={city} />
                <i className="fa-solid fa-magnifying-glass" onClick={getWeatherInfo}></i>
                <h3>{tempInfo.searchedCity}, {tempInfo.country}</h3>

                <Info property="Temperature" value={`${tempInfo.temp}°C`} />
                <Info property="Feels like" value={`${tempInfo.feels_like}°C`} />
                <Info property="Humidity" value={`${tempInfo.humidity}%`} />
                <Info property="Visibility" value={`${tempInfo.visibility}mi`} />
                <Info property="Wind Speed" value={`${tempInfo.speed}Km/h`} />
            </div >
        </>
    )
}

export default Forcast
