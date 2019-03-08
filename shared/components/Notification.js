import React from 'react';
import '../styles/Notification.css'

class Notification extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      message: "Hi there! Looks like it's your first time here. Let's talk about what books you're interested in. Click on me to begin chatting.",
      buttons: [
        // {type: 'startChat',
        // class: 'btn btnPrimary',
        // text:'Yeah!'},
        // {type: 'cancel',
        // class: 'btn',
        // text:'No thanks'},
      ],
    };
    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  };

  componentDidMount(){
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  handleButtonClick(){
    this.props.notifClose();
    document.removeEventListener('click', this.handleNotifClose, false);
  }

  handleChatClick(){
    this.props.convActive();
    this.handleButtonClick();
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
     return;
    }

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

        <div className='bubble' ref={node => { this.node = node; }}>
          <div className='messageText'>{this.state.message}</div>
          <div className='messageButtons'>
            {buttonDisplay}
          </div>
        </div>
    );
  }
}
export default Notification;
