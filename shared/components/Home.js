import React from 'react';
// import { Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Nav from './Navigation';
import Menu from './Menu';
import Conversation from './Conversation';
import ChatbotMessageDialogBubble from './ChatbotMessageDialogBubble';
import UserMessageBox from './UserMessageBox';
import Notification from './Notification'
import '../styles/Home.css'

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      convVisible: false,
      bookRecList: [],
      notifVisible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  };

  componentDidMount () {
    setTimeout(() => this.setState({notifVisible: true}), 5000);
  }
  handleClick() {
    if (!this.state.convVisible) {
     // attach/remove event handler
     document.addEventListener('click', this.handleOutsideClick, false);
    } else {
     document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({convVisible: !this.state.convVisible });
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
        {this.state.convVisible && (
          <div className="conversation-overlay" >
            <div className="modal-content" ref={node => { this.node = node; }}>
              <div className="conversationWrapper">
                <Conversation userMainProfile={this.props.userMainProfile} triggerParentHandler={this.props.triggerParentHandler}/>
              </div>
            </div>
          </div>
        )}
        {this.state.notifVisible && (
            <Notification />
        )}
        <div>
          <ul className = "bookList">
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
            <li className="bookListItem"><div className="bookImage"></div></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Home;
