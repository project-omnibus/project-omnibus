import React from 'react';
import '../styles/UserMessageBox.css'
import UserMessageInput from './UserMessageInput'

class UserMessageBox extends React.Component{
  render() {
    return (
      <div className="message-box">
      <UserMessageInput />
      </div>
    )
  }
};

export default UserMessageBox;
