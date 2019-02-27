import React from 'react';
import '../styles/Notification.css'

class Notification extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      message: "Hey! Looks like this is your first time here. Let's talk about your reading interests and I'll make some recommendations.",
    };
  };
  render () {
    return(
      <div className='notifOverlay'>
      <div className='bubble'>
        <div className='messageText'>{this.state.message}</div>
      </div>
      </div>
    );
  }
}
export default Notification;
