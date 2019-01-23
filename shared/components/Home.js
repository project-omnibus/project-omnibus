import React from 'react';
// import { Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Nav from './Navigation';
import Conversation from './Conversation';
import ChatbotMessageDialogBubble from './ChatbotMessageDialogBubble';
import UserMessageBox from './UserMessageBox';
import '../styles/Conversation.css';
import '../styles/Home.css'

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  };

  handleClick() {
    if (!this.state.modalVisible) {
     // attach/remove event handler
     document.addEventListener('click', this.handleOutsideClick, false);
    } else {
     document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({modalVisible: !this.state.modalVisible });
    console.log(this.state.modalVisible);
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
     return;
    }

    this.handleClick();
  }


  render () {
    console.log('rendering:home');

    return (
      <div>
        <Nav convBrand={this.handleClick} route={this.props.route} />
        {this.state.modalVisible && (
          <div className="conversation-overlay" >
            <div className="modal-content" ref={node => { this.node = node; }}>
              <Conversation userMainProfile={this.props.userMainProfile}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Home;
