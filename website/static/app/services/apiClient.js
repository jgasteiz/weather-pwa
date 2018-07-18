const fetchApiForecast = () => {
    return fetch('/api/forecast/').then(res => res.json());
};


export default {
    fetchApiForecast
};
