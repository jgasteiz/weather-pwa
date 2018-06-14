export default class Weather {

    /**
     * Get the forecast data for the next 12 hours.
     */
    static getForecastData(callback) {
        fetch('/api/forecast/')
            .then(res => res.json())
            .catch(error => alert(error))
            .then(res => callback(res));
    }
}
