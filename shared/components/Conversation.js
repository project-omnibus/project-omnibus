import React from 'react';
import Nav from './Navigation';
import ChatbotMessageDialogBubble from './ChatbotMessageDialogBubble';
import UserMessageBox from './UserMessageBox';
import '../styles/Conversation.css';

class Conversation extends React.Component {
  // Conversation component is used to route all user conversation
  // Its state should include the user profile and if conversation is done
  // User profile contains relevancy list, qAskedID, attribute, currentQ, answer

  constructor (props) {
    super(props);
    this.state = {
      userProfile: {
        relevancy: [], //relevancy scores of all questions in database
        qAskedID: [], //array of questions already asked by chatbot (starts blank)
        attribute: {// container for keywords (to be searched later), likeBook, likeGenre, readerType
          keywords:[],
          likeBook:[],
          likeGenre:[],
          likeAuthor:[],
          readerType:[],
        },
        currentQ: {
          qid: -1,
          question: '',
          userInput: false,
          relevancy: -1,
          specificity: -1,
          userAttribute: [],
          folloupBy: []
        },
        answer: ''
      },
      isDone: false, // trigger Conversation to end with suggestion
      response: '', //user's response
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRecs = this.handleRecs.bind(this);
  };

  componentDidMount () {
    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
    if (Object.keys(this.props.userMainProfile).length !== 0) {
      this.setState({ userProfile: this.props.userMainProfile });
    }
    fetch('/conversation/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.userProfile)
    })
    .then(res => res.json())
    .then(data => {
      var userProfile1 = data;
      userProfile1.answer = "";
      this.props.triggerParentHandler(userProfile1);
      this.setState({ userProfile: userProfile1 });
    });
  }

  async callApi () {
    const response = await fetch('/livecheck');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  handleSubmit (event) {
    console.log('in conversation handlesubmit');
    event.preventDefault(); // check for errors in event
    // var userProfileString = JSON.stringify(this.state.userProfile);
    // make POST request to the api URL

    fetch('/conversation/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.userProfile)
    })
      .then(res => res.json())
      .then(data => {
        var userProfile1 = data;
        userProfile1.answer = "";
        this.props.triggerParentHandler(userProfile1);
        this.setState({ userProfile: userProfile1 });
        if (this.state.userProfile.currentQ.question=="Hmmm...well, here are some books you may like.") {
          this.setState({ isDone: true });
        };
      });
    localStorage.setItem('userProfile',JSON.stringify(this.state.userProfile));
  };

  handleChange = e => {
    let userProfileCopy = this.state.userProfile;
    userProfileCopy.answer = e.target.value;
    this.setState({ userProfile: userProfileCopy });
  }

  handleRecs = e => {
    e.preventDefault();
    this.props.handleRecs();
  }

  render () {
    return (
      <div className="conversationWrapper">
        <ChatbotMessageDialogBubble message={this.state.userProfile.currentQ.question}
        handleRecs = {this.handleRecs}/>
        {!this.state.isDone && (
        <UserMessageBox value={this.state.userProfile.answer}
        onSubmit={this.handleSubmit}
        handleChange={this.handleChange} />)}
      </div>
    );
  }
}
export default Conversation;
