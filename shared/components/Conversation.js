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
        relevancy: [],
        qAskedID: [],
        attribute: {},
        currentQ: {
          qid: -1,
          question: 'Hey there! Looking for something to read but not entirely sure where to look?',
          userInput: false,
          relevancy: -1,
          specificity: -1,
          userAttribute: [],
          folloupBy: []
        },
        answer: ''
      },
      isDone: false,
      response: '',
      modalVisible: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  };

  componentDidMount () {
    if (Object.keys(this.props.userMainProfile).length !== 0) {
      this.setState({ userProfile: this.props.userMainProfile });
    }
    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
    if (Object.keys(this.props.userMainProfile).length !== 0) {
      this.setState({ userProfile: this.props.userMainProfile });
    }
  }

  async callApi () {
    const response = await fetch('/livecheck');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

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
        userProfile1.answer = '';
        // updates userProfile in the parent component, so that consistency is
        // maintained for userProfile across pages
        this.props.triggerParentHandler(userProfile1);
        this.setState({ userProfile: userProfile1 });
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    let userProfileCopy = this.state.userProfile;
    userProfileCopy.answer = e.target.value;
    this.setState({ userProfile: userProfileCopy });
  }

  render () {
    return (
      <div>
        <ChatbotMessageDialogBubble message={this.state.userProfile.currentQ.question} />
        <UserMessageBox value={this.state.userProfile.answer} onSubmit={this.handleSubmit} handleChange={this.handleChange} />
      </div>
    );
  }
}
export default Conversation;
