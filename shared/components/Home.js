import React from 'react';
// import { Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Nav from './Navigation';
import Conversation from './Conversation'
import '../styles/Home.css'

class Home extends React.Component {
  constructor (props) {
    super(props);


  }



  render () {
    console.log('rendering:home');

    return (
      <div>
        <Nav route={this.props.route} />

      </div>
    );
  }
}
export default Home;
