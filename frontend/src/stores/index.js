import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import CardApp from '../reducers/index.js'



const store =  createStore(CardApp); 
//applyMiddleware(thunkMiddleware)

export default store;