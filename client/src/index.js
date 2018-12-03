import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import './index.css';
import App from './App';
import Conversation from './Conversation';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Conversation />, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('bookSearch'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
