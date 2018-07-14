import React from 'react';


const AboutPage = () =>
    <div>
        <h1>About</h1>
        <p className="lead">This is a PWA weather app, built by <a target="_blank" href="https://github.com/jgasteiz">Javi Manzano</a>.</p>

        <h2>Upcoming features</h2>
        <ul>
            <li>Current location weather.</li>
            <li>Weather in multiple locations.</li>
            <li>Weather maps.</li>
        </ul>

        <h2>Resources</h2>
        <ul>
            <li>
                <a target="_blank" href="https://openweathermap.org/">OpenWeatherMap</a> for fetching the current weather conditions.
            </li>
            <li>
                <a target="_blank" href="https://www.accuweather.com/">AccuWeather</a> for fetching the 12-hour weather forecast.
            </li>
            <li>
                <a target="_blank" href="https://www.metaweather.com/">MetaWeather</a> for fetching the 5-day weather forecast.
            </li>
            <li>
                <a target="_blank" href="https://erikflowers.github.io/weather-icons/">Weather Icons</a> by <a href="https://github.com/erikflowers">Eric Flowers</a>.
            </li>
        </ul>
    </div>;

export default AboutPage;
