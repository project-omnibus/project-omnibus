import React from 'react';
import '../styles/UserMessageInput.css';

class UserMessageInput extends React.Component {
  constructor (props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
  };



  onKeyDown = e =>{

    if(e.keyCode == 13){
      e.preventDefault();

      this.props.onSubmit(e);
      e.target.innerText='';
    }
  }
  render(){

    return (
        <div className='user-message' >
          <span contentEditable="true"
          className='editText'
          onClick = {this.onClick}
          onChange={this.props.handleChange}
          onKeyDown={this.onKeyDown}
          autofocus>
            {this.props.text}
          </span>
        </div>
    );
  }

};

export default UserMessageInput;
