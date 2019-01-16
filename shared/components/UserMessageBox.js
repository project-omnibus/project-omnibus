import React from 'react';
import '../styles/UserMessageBox.css';
import UserMessageInput from './UserMessageInput';

const UserMessageBox = props => {
  return (
    <div className='message-box'>
      <UserMessageInput value={props.value} onSubmit={props.onSubmit} handleChange={props.handleChange} />
    </div>
  );
};

export default UserMessageBox;
