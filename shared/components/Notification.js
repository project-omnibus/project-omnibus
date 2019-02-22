import React from 'react';
import '../styles/Notification.css'

class Notification extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      message: 'Hey there!',
    };
  };
  render () {
    <div className='bubble'>
      <div className='messageText'>{this.props.message}</div>
    </div>
  }
}
export default Notification;
