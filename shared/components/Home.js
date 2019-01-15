import React from 'react';
import Nav from './Navigation';
class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    console.log('rendering:home');
    return (
      <div>
        <Nav route={this.props.route} />
        <div id='greeting'>
          <h1>Hello this is Home Page</h1>
          <p>{this.props.mainProps}</p>
        </div>
      </div>
    );
  }
}
export default Home;
