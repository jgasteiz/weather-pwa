import {REQUEST_DATAPOINTS, RECEIVE_DATAPOINTS_SUCCESS} from '../actions/dataPointsActionCreators';


const dataPointsReducer = (state, action) => {
    switch (action.type) {
        case REQUEST_DATAPOINTS:
            return {
                ...state,
                data: {
                    currentConditions: {},
                    hourlyForecast: [],
                    dailyForecast: [],
                    isLoading: true,
                }
            };
        case RECEIVE_DATAPOINTS_SUCCESS:
            return {
                ...state,
                data: {
                    currentConditions: action.weatherData.currentConditions,
                    hourlyForecast: action.weatherData.hourlyForecast,
                    dailyForecast: action.weatherData.dailyForecast,
                    isLoading: false,
                }
            };
        default:
            return state;
    }
};

export default dataPointsReducer;
