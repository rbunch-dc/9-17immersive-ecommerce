import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Get the createStore method from the redux module
// as well as the applyMiddleWare method 
import { createStore, applyMiddleware } from 'redux';

// createStore needs a reducer. More specifically, a root reducer
import RootReducer from './reducers/RootReducer';
// we are going to need AJAX a lot. We will use it in our
// Redux Actions which means... we need redux-promise.
import reduxPromise from 'redux-promise';

ReactDOM.render(
	<App />, 
	document.getElementById('root'
));

