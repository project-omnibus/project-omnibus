import { renderRoutes } from 'react-router-config';
import routes from './routes';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userProfile: {},
      words: 'hello this is a propr of the app'
    };
    this.handleConversation = this.handleConversation.bind(this);
  }

  handleConversation (data) {
    this.setState({ userProfile: data });
  }
  render () {
    console.log('Rendering App - App.js');
    return (
      <div>
        {renderRoutes(routes)}
      </div>
    );
  }
}

export default App;
