import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../shared/App';

console.log('trying to render App');
const renderRouter = Component => {
  ReactDOM.hydrate(
    <Router>
      <div className='App'>
        <Component />
      </div>
    </Router>, document.getElementById('root')
  );
};

renderRouter(App);
