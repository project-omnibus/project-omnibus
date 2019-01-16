import React from 'react';
import '../styles/UserMessageInput.css';

const UserMessageInput = props => {
  // access the main userProfile state somehow
  return (
    <form onSubmit={props.onSubmit}>
      <input className='user-message' placeholder='Reply back' value={props.value} onChange={props.handleChange} />
    </form>
  );
};

export default UserMessageInput;
