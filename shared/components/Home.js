import React from 'react';
// import { Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Nav from './Navigation';
import Menu from './Menu';
import Conversation from './Conversation';
import ChatbotMessageDialogBubble from './ChatbotMessageDialogBubble';
import UserMessageBox from './UserMessageBox';
import Notification from './Notification';
import BookDisplayRow from './BookDisplayRow';
import '../styles/Home.css';
import uuidv4 from 'uuid/v4';

class Home extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      convVisible: false,
      bookRecList: [],
      notifVisible: false,
      notifMessage: '',
      notifButtons: [],
      recommendations: [],
      bookClicked: {},
      query: '',
      response: '',
      userProfile: {},
      sessionId:''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleNotifClose =this.handleNotifClose.bind(this);
    this.handleRecs = this.handleRecs.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
  };

  async componentDidMount () {

    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
    await this.hydrateStateWithLocalStorage();

    if (localStorage.getItem('recommendations')!=null){
      await this.setState({
        recommendations: JSON.parse(localStorage.getItem('recommendations')) });
    }
    else{
      this.setState({notifMessage: "Hi there! Looks like it's your first time here. Let's talk about what books you're interested in. Click on me to begin chatting."});
      this.setState({notifButtons: []});
      setTimeout(() => this.setState({notifVisible: true}), 3000);
    }

    this.handleRecs();
    var id = await uuidv4()
    this.setState({sessionId:id})

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

    //if recommendations is still empty or null
    //display notification with message "Looks like you left mid-conversation. Click me to continue."
    if(this.state.recommendations[0]==undefined||this.state.recommendations.length==0){
      this.setState({notifMessage: "Looks like you left mid-conversation. Click me to continue for recommendations."});
      this.setState({notifButtons: []});
      setTimeout(() => this.setState({notifVisible: true}), 2000);
    }
    else{
      this.setState({notifMessage: "Here are my recommendations based on our conversation. Click me anytime for another chat."});
      this.setState({notifButtons: [{type: 'confirm', class: 'btn btnPrimary', text:'OK got it'},]});
      setTimeout(() => this.setState({notifVisible: true}), 2000);
    }

    this.handleClick();
  }

  handleNotifClose(e){
    this.setState({notifVisible: false });
  }

  async handleRecs () {
    let localUserProfile = localStorage.getItem('userProfile');

    if(localUserProfile!=""){
      //console.log(localUserProfile)

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
      this.setState({notifMessage: "Here are my recommendations based on our conversation. Click me anytime for another chat."});
      this.setState({notifButtons: [{type: 'confirm', class: 'btn btnPrimary', text:'OK got it'},]});
      setTimeout(() => this.setState({notifVisible: true}), 2000);
      this.handleClick();
    }

  };

  handleBookClick(e){
    this.setState({bookClicked: e.book});
  }

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


    let row = 0;
    let bookArray = [[]];

    for (let i = 0; i < this.state.recommendations.length; i++) {
      bookArray[row].push(this.state.recommendations[i])
      if((i+1)%5 == 0){
        bookArray.push([]);
        row++;
      }
    }

    let bookLayout = bookArray.map((e,i) => {
      return (
        <BookDisplayRow bookRow = {e} rowNum = {i}/>
      );
    })
    //render five bookListItem class divs in a div
    //then render an div of height 0 with possible volumeInfo
    //handleBookclick will have to fill the appropriate div (maybe assign 'key' attribute)
    console.log(bookArray);
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
              updateUserProfile={this.handleUpdateUserProfile}
              sessionId={this.state.sessionId}
              handleRecs={this.handleRecs}/>
            </div></div>
          )}
          {this.state.notifVisible && (
              <Notification message={this.state.notifMessage}
              buttons={this.state.notifButtons}
              convActive={this.handleClick} notifClose = {this.handleNotifClose}/>
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
              <Notification message={this.state.notifMessage}
              buttons={this.state.notifButtons}
              convActive={this.handleClick} notifClose = {this.handleNotifClose}/>
          )}
          {bookLayout}
          <div>
            <ul className = "bookList">
              {this.state.recommendations.map((item,key)=>
                (item.book.volumeInfo.imageLinks!= undefined && item.book.volumeInfo.imageLinks.thumbnail!=undefined) ? (
                    <li onClick={() => this.handleBookClick(item)}
                    className="bookListItem" key={key}>
                      <img className="bookCover"
                      src={item.book.volumeInfo.imageLinks.thumbnail}/>
                    </li>
                ):(<li className="bookListItem" key={key}>
                  <img className="bookCover"
                  src='https://books.google.com/googlebooks/images/no_cover_thumb.gif'/>
                </li>)
              )}
              {JSON.stringify(this.state.bookClicked)!='{}'&& (
                <li>{this.state.bookClicked.volumeInfo.title}</li>
              )}
            </ul>
          </div>
        </div>
      );
    }

  }
}
export default Home;
