import { createStore, combineReducers } from 'redux';
import dummy from './reducers/dummy-reducer';

const reducers = { dummy };

export default createStore(combineReducers(reducers));