import {combineReducers} from 'redux';
import datapointReducer from './dataPointsReducer';

const reducers = {
    data: datapointReducer,
    navigationItems: (state = {}) => state,
};

export default combineReducers(reducers);
