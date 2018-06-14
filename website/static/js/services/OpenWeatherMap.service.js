export default class OpenWeatherMap {

    /**
     * Get the weather.
     */
    static getWeatherData(callback) {
        fetch('/api/weather/')
            .then(res => res.json())
            .catch(error => alert(error))
            .then(res => callback(res));
    }
}
