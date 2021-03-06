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
    this.handleRecs = this.handleRecs.bind(this);
  };

  async componentDidMount () {
    setTimeout(() => this.setState({notifVisible: true}), 3000);
    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
    await this.hydrateStateWithLocalStorage();
    console.log(localStorage.getItem('recommendations'));
    if (localStorage.getItem('recommendations')!=null){
      await this.setState({
        recommendations: JSON.parse(localStorage.getItem('recommendations')) });
    }
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

  async handleRecs () {
    let localUserProfile = localStorage.getItem('userProfile');

    if(localUserProfile!=""){
      console.log(localUserProfile)

      const response = await fetch('/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: localUserProfile
      })

      const body = await response.json();
      if (response.status !== 200) throw Error(body.error);
      this.setState({ recommendations: body });
      localStorage.setItem('recommendations',JSON.stringify(body));
      this.handleClick();
    }

  };

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  render () {
    console.log('rendering:home');

    if(this.state.recommendations[0]==undefined||this.state.recommendations.length==0){
      return (
        <div>
          <Nav convBrand={this.handleClick} route={this.props.route} />
          {this.state.convVisible && (
            <div>
            <div className="conversation-overlay" >

            </div>
            <div className="modal-content" ref={node => { this.node = node; }}>
              <Conversation userMainProfile={this.props.userMainProfile}
              triggerParentHandler={this.props.triggerParentHandler}
              handleRecs={this.handleRecs}/>
            </div></div>
          )}
          {this.state.notifVisible && (
              <Notification convActive={this.handleClick} notifClose = {this.handleNotifClose}/>
          )}
          <div>
            <ul className = "bookList">
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
              <li className="bookListItem"><div className="bookPlaceholder"></div></li>
            </ul>
          </div>
        </div>
      );
    } else if (this.state.recommendations.length >0){
      return (
        <div>
          <Nav convBrand={this.handleClick} route={this.props.route} />
          {this.state.convVisible && (
            <div>
            <div className="conversation-overlay" >

            </div>
            <div className="modal-content" ref={node => { this.node = node; }}>
              <Conversation userMainProfile={this.props.userMainProfile}
              triggerParentHandler={this.props.triggerParentHandler}
              handleRecs = {this.handleRecs}/>
            </div></div>
          )}
          {this.state.notifVisible && (
              <Notification convActive={this.handleClick} notifClose = {this.handleNotifClose}/>
          )}
          <div>
            <ul className = "bookList">
              {this.state.recommendations.map((item,key)=>
                (item.volumeInfo.imageLinks!= undefined && item.volumeInfo.imageLinks.thumbnail!=undefined) ? (
                    <li className="bookListItem" key={key}><img className="bookCover" src={item.volumeInfo.imageLinks.thumbnail}/></li>
                ):(<li className="bookListItem" key={key}><img className="bookCover" src='https://books.google.com/googlebooks/images/no_cover_thumb.gif'/></li>)
              )}
            </ul>
          </div>
        </div>
      );
    }

  }
}
export default Home;
