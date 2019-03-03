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
      dummyProfile: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleNotifClose =this.handleNotifClose.bind(this);
    //this.handleRecs = this.handleRecs.bind(this);
  };

  async componentDidMount () {
    setTimeout(() => this.setState({notifVisible: true}), 3000);
    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
    const dummyProfile = {
      relevancy:[0,0,0,0,0,0,0,0,0,0,0,100],
      qAskedID:[0,1,2,3,4,5,6,7,8,9,10,11],
      attribute:{
        keywords:
        [
          ["like","convey","feelings","often","seem","hard","describe"],
          ["s","good","story","about","technology","vs","spirituality","those","seemingly","opposite","things","aren","t","very","polarized","contradictions"],
          ["s","pretty","interesting","far","s","getting","little","repetitive"],
          ["s","not","just","subject","matter","like","pace","their","story","rhythm","their","words","calmness","characters"],
          ["ok"]
        ],
        readerType: ["not","very","often"],
        likeGenre:
        [
          "surreal",
          "fiction",
          ["nonfiction","about","interesting","topics"]
        ],
        likeBook:
        [
          "american","gods",
          ["zen","art","motorcycle","maintence","about","similar","topic"]
        ],
        readBook:
        [
          "well","m","currently","reading","weapons","math","destruction"
        ],
        wantGenre:
        ["probably","some","kind","fiction","similar","neil","gaiman"]
      },
      currentQ:
      {
        qid:11,
        question:"OK I think I can help you in finding a book, let me take a look!",
        userInput:false,
        relevancy:10,
        specificity:2,
        userAttribute:null,
        followUpBy:[]
      },
      answer:"ok"
    };
    await this.setState({dummyProfile:dummyProfile});
    this.handleRecs();
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
    let keywords = this.state.dummyProfile.attribute.keywords.join().toString();

    //testing Google Books API
    //fill the state's query with the dummyProfile's keywords
    await this.setState({query: keywords});
    // keywords = keywords.toString().replace(","," and ");

    const response = await fetch('/v1/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.dummyProfile)
    })

    const body = await response.json();
    if (response.status !== 200) throw Error(body.error);
    this.setState({ recommendations: body });

    console.log(this.state.recommendations);
  };

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
              <Conversation userMainProfile={this.props.userMainProfile} triggerParentHandler={this.props.triggerParentHandler}/>
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
              <Conversation userMainProfile={this.props.userMainProfile} triggerParentHandler={this.props.triggerParentHandler}/>
            </div></div>
          )}
          {this.state.notifVisible && (
              <Notification convActive={this.handleClick} notifClose = {this.handleNotifClose}/>
          )}
          <div>
            <ul className = "bookList">
              {this.state.recommendations.map((item,key)=>
                <li className="bookListItem" key={key}><img className="bookCover" src={item.volumeInfo.imageLinks.thumbnail}/></li>
              )}
            </ul>
          </div>
        </div>
      );
    }

  }
}
export default Home;
