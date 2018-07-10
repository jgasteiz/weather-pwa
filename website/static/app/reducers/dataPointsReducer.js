import {REQUEST_DATAPOINTS, RECEIVE_DATAPOINTS} from '../actions/dataPointsActionCreators';


const dataPointsReducer = (
    state = {
        dataPoints: {},
        isLoading: true,
    },
    action
) => {
    switch (action.type) {
        case REQUEST_DATAPOINTS:
            return {
                ...state,
                dataPoints: {},
                isLoading: true,
            };
        case RECEIVE_DATAPOINTS:
            return {
                ...state,
                dataPoints: action.dataPoints,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default dataPointsReducer;
