import React from 'react';

class Brand extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <a className="navbar-brand" href="#"><img height="110" src="/static/Navigation/icons/icon-placeholder.png"/></a>

    );
  }
};

export default Brand;
