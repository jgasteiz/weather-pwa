import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import appReducers from './reducers/appReducers';


const configureStore = (preloadedState) => {
    return createStore(
        appReducers,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    );
};

export default configureStore;
