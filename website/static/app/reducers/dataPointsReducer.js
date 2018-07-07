import {REQUEST_DATAPOINTS, RECEIVE_DATAPOINTS} from '../actions/dataPointsActionCreators';


const dataPointsReducer = function(
    state = {
        dataPoints: {},
        isLoading: true,
    },
    action
) {
    switch (action.type) {
        case REQUEST_DATAPOINTS:
            return Object.assign({}, state, {
                dataPoints: {},
                isLoading: true,
            });
        case RECEIVE_DATAPOINTS:
            return Object.assign({}, state, {
                dataPoints: action.dataPoints,
                isLoading: false,
            });
        default:
            return state;
    }
};

export default dataPointsReducer;
