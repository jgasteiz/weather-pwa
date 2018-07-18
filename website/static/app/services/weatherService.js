import apiClient from './apiClient';


const getCurrentConditions = (dataPoints) => {
    if (!dataPoints || !dataPoints.hasOwnProperty('current_conditions')) {
        return {};
    }
    const currentWeather = dataPoints['current_conditions'];
    return {
        locationName: currentWeather['location_name'],
        dataTimestamp: currentWeather['datapoint_time'],
        temperature: currentWeather['temperature'],
        weatherIcon: currentWeather['weather_icon'],
        weatherName: currentWeather['weather_icon_name'],
        mobileLink: currentWeather['mobile_link'],
    };
};

const getHourlyForecast = (dataPoints) => {
    if (!dataPoints || !dataPoints.hasOwnProperty('hourly_forecast')) {
        return [];
    }
    return dataPoints['hourly_forecast'];
};

const getDailyForecast = (dataPoints) => {
    if (!dataPoints || !dataPoints.hasOwnProperty('daily_forecast')) {
        return [];
    }
    return dataPoints['daily_forecast'];
};


/**
 * Fetch the weather datapoints and transform them into current conditions,
 * hourly forecast and daily forecast.
 */
const fetchWeatherDataPoints = async () => {
    return await apiClient.fetchApiForecast()
        .then(dataPoints => ({
            currentConditions: getCurrentConditions(dataPoints),
            hourlyForecast: getHourlyForecast(dataPoints),
            dailyForecast: getDailyForecast(dataPoints)
        }));
};

export default {
    fetchWeatherDataPoints
};
