import React from 'react';
import '../styles/Notification.css'

class Notification extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      message: "Hey! Looks like this is your first time here. Let's talk about your reading interests and I'll make some recommendations.",
      buttons: [
        {type: 'startChat',
        class: 'btn btnPrimary',
        text:'OK'},
        {type: 'cancel',
        class: 'btn',
        text:'No thanks'},
      ],
    };
    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  };

  handleButtonClick(){
    this.props.notifClose();
  }
  handleChatClick(){
    this.props.convActive();
    this.handleButtonClick();
  }
  render () {
    let buttonDisplay = this.state.buttons.map((e,i) => {
      if (e.type=='startChat'){
        return (<button key={i} className={e.class} onClick={this.handleChatClick}>{e.text}</button>);
      }
      else{
        return (<button key={i} className={e.class} onClick={this.handleButtonClick}>{e.text}</button>);
      }

    });
    return(

        <div className='bubble'>
          <div className='messageText'>{this.state.message}</div>
          <div className='messageButtons'>
            {buttonDisplay}
          </div>
        </div>
    );
  }
}
export default Notification;
