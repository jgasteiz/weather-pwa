import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import dataPointsReducer from './reducers/dataPointsReducer';


const configureStore = (preloadedState) => {
    return createStore(
        dataPointsReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    );
};

export default configureStore;
