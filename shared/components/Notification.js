import React from 'react';
import '../styles/Notification.css'

class Notification extends React.Component {
  constructor (props) {
    super(props);

    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  };

  componentDidMount(){
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  handleButtonClick(){
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.props.notifClose();
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
    let buttonDisplay = this.props.buttons.map((e,i) => {
      if (e.type=='startChat'){
        return (<button key={i} className={e.class} onClick={this.handleChatClick}>{e.text}</button>);
      }
      else{
        return (<button key={i} className={e.class} onClick={this.handleButtonClick}>{e.text}</button>);
      }

    });
    return(

        <div className='bubble' ref={node => { this.node = node; }}>
          <div className='messageText'>{this.props.message}</div>
          {(this.props.buttons != undefined && this.props.buttons.length > 0) && (
            <div className='messageButtons'>
              {buttonDisplay}
            </div>
          )}
        </div>
    );
  }
}
export default Notification;
