import React, { useState } from "react";
import Time from "../Time/Time";
import "./Weather.css";

const Weather = () => {
    const [weather, setWeather] = useState({
        city: "",
        country: null,
        weather: null,
        temperature: null,
        minTemp: null,
        maxTemp: null,
        responseOK: null
    });

    const [api] = useState({
        api: `https://api.openweathermap.org/data/2.5/weather?q=`,
        apiKey: "4c8959d814f38acd6c8efa2e10455e78"
    });

    const handleInputChange = (event) => {
            setWeather({
                city: event.target.value
            });
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`${api.api}${weather.city}&appid=${api.apiKey}`);
            if (response.ok) {
                const data = await response.json();
                setWeather({
                    city: data.name,
                    country: data.sys.country,
                    weather: data.weather[0].main,
                    temperature: data.main.temp - 273.15,
                    minTemp: data.main.temp_min - 273.15,
                    maxTemp: data.main.temp_max - 273.15,
                    responseOK: response.ok
                });
            }
            else {
                alert("Error fetch data !\nmake sure your connection is OK\nor enter a correct city or country name !");
                console.error("Error fetch data !");
            }
        }
        catch(error) {
            alert("Request Failed !");
            console.error(`Request Failed ! => ${error}`);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (weather.city) {
            fetchData();
        }
        else {
            alert("Input can  not be empty !");
        }
    }

    return (
        <form className="weather-container" onSubmit={handleSubmit}>
            <div className="logo-container">
                <h1 className="title">weather app</h1>
                <img src="./assets/images/logo.png" alt="logo" />
            </div>
            <input type="search" value={weather.city} placeholder="search city or country" className="input" onChange={(event) => handleInputChange(event)} />
            {weather.responseOK && (
                <>
                    <div className="separator"></div>
                    <h2 className="city">{weather.city} - {weather.country}</h2>
                    <Time />
                    <span className="weather">{weather.weather}</span>
                    <span className="temperature">{Math.floor(weather.temperature)} °C</span>
                    <span className="min-max">↓ {Math.floor(weather.minTemp)} °C / ↑ {Math.floor(weather.maxTemp)} °C</span>
                </>
            )}
        </form>
    );
}

export default Weather;