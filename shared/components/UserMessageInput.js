import React from 'react';
import '../styles/UserMessageInput.css';

const UserMessageInput = props => {
  // access the main userProfile state somehow
  return (
      <div className='user-message'>
        <span className='editText' contentEditable="true" onChange={props.handleChange}
        onBlur={props.handleChange}
        autoFocus="autofocus"
        onKeyDown={(e) => {
          if(e.keyCode == 13){
            props.onSubmit(e);
          }
        }}>
          {props.value}
        </span>
      </div>
  );
};

export default UserMessageInput;
