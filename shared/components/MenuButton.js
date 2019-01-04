import React from 'react';

class MenuButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <img height="110" src="/static/Navigation/icons/menu-icon.png"/>
    );
  }
};

export default MenuButton;
