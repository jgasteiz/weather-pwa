import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import dataPointsReducer from './reducers/dataPointsReducer';


export default function configureStore(preloadedState) {
    return createStore(
        dataPointsReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    );
}
