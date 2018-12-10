import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from '../../shared/App';

console.log('trying to render App');
ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root')
);

ReactDOM.render(
  <div>
    Hello there!
  </div>,
  document.getElementById('conversation')
);
//ReactDOM.render(<Conversation />, document.getElementById('conversation'));
//ReactDOM.render(<BookSearch />, document.getElementById('bookSearch'));
