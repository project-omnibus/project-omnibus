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
      recommendations: [],
      query: '',
      response: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleNotifClose =this.handleNotifClose.bind(this);
  };

  componentDidMount () {
    setTimeout(() => this.setState({notifVisible: true}), 3000);
    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
  }

  async callApi () {
    const response = await fetch('/livecheck');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
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

  handleNotifClose(e){
    this.setState({notifVisible: false });
  }

  handleRecs = async e => {
    e.preventDefault();
    if (this.state.query.length === 0) {
      alert('Value should not be empty!');
      return;
    }

    const response = await fetch('/v1/books?q=' + this.state.query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.error);
    this.setState({ recommendations: body.relatedBooks });
  };

  render () {
    console.log('rendering:home');

    return (
      <div>
        <Nav convBrand={this.handleClick} route={this.props.route} />
        {this.state.convVisible && (
          <div>
          <div className="conversation-overlay" >

          </div>
          <div className="modal-content" ref={node => { this.node = node; }}>
            <Conversation userMainProfile={this.props.userMainProfile} triggerParentHandler={this.props.triggerParentHandler}/>
          </div></div>
        )}
        {this.state.notifVisible && (
            <Notification convActive={this.handleClick} notifClose = {this.handleNotifClose}/>
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
