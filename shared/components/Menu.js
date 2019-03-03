import React from 'react';
import '../styles/Menu.css';

class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <h4>Menu</h4>

        <p>Chat</p>
        <p>Recommendations</p>
        <p>My Profile</p>
        <p>Community</p>
      </div>
    );
  }
};

export default Menu;
