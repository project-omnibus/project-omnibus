import React from 'react';

class Brand extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className="navbar-brand"><img height="80" src="/static/Navigation/icons/icon-placeholder.png"/></div>

    );
  }
};

export default Brand;
