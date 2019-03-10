import React from 'react';
import '../styles/UserMessageInput.css';

const UserMessageInput = props => {
  // access the main userProfile state somehow
  return (
      <div className='user-message'>
        <span className='editText' contentEditable="true" onKeyDown={props.handleChange} onBlur={props.handleChange}>{props.value}</span>
      </div>
  );
};

export default UserMessageInput;
