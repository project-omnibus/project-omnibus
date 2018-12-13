import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from '../../shared/App';

console.log('trying to render App');
const renderRouter = Component => {
  ReactDOM.hydrate(
    <Router>
      <Component />
    </Router>, document.getElementById('root')
  );
};

renderRouter(App);
//ReactDOM.render(<Conversation />, document.getElementById('conversation'));
//ReactDOM.render(<BookSearch />, document.getElementById('bookSearch'));
