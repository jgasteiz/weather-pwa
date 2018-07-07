import {REQUEST_DATAPOINTS, RECEIVE_DATAPOINTS} from '../actions/dataPointsActionCreators';


const dataPointsReducer = function(state = {}, action) {
    switch (action.type) {
        case REQUEST_DATAPOINTS:
            return Object.assign({}, state, {
                dataPoints: {}
            });
        case RECEIVE_DATAPOINTS:
            return Object.assign({}, state, {
                dataPoints: action.dataPoints
            });
        default:
            return state;
    }
};

export default dataPointsReducer;
