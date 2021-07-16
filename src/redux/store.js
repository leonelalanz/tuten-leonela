import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import userAuthenticated from './reducers/userAuthenticated'
import persistState from "redux-localstorage";



const reducers = combineReducers({
    userAuthenticated
});

const mainEnhancer = compose(persistState('userAuthenticated'), applyMiddleware(thunk));

const store = createStore(reducers, {}, mainEnhancer);
export default store;