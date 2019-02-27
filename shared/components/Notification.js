import React from 'react';
import '../styles/Notification.css'

class Notification extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      message: "Hey! Looks like this is your first time here. Let's talk about your reading interests and I'll make some recommendations.",
      buttons: [
        {type: 'submit',
        class: 'btn btnPrimary',
        text:'OK'},
        {type: 'cancel',
        class: 'btn',
        text:'No thanks'},
      ],
    };
  };
  render () {
    let buttonDisplay = this.state.buttons.map((e,i) => {
      return (<button className={e.class}>{e.text}</button>);
    });
    return(
      <div className='notifOverlay'>
        <div className='bubble'>
          <div className='messageText'>{this.state.message}</div>
          <div className='messageButtons'>
            {buttonDisplay}
          </div>
        </div>
      </div>
    );
  }
}
export default Notification;
