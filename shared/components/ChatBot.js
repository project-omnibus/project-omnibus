import React from 'react';
import Nav from './Navigation';

class ChatBot extends React.Component {
  // Conversation component is used to route all user conversation
  // Its state should include the user profile and if conversation is done
  // User profile contains relevancy list, qAskedID, attribute, currentQ, answer

  constructor (props) {
    super(props);
    this.state = {
      userMessage: {
        type:"message_received",
        user: "1234",
        channel:"testChannel",
        text:"",
        raw_message:""
      },
      chatBotResponse:"",
      inputMessage:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount () {
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

  handleSubmit (event) {
    console.log('in chatbot handlesubmit');
    event.preventDefault();
    var userMessage1 = this.state.userMessage;
    userMessage1.text =this.state.inputMessage;
    this.setState({userMessage:userMessage1});

    fetch('/chatbot/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.userMessage)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({chatBotResponse: data });
        this.setState({inputMessage:""});
      });
  };

  handleChange (event) {
    this.setState({ inputMessage: event.target.value });
  }

  render () {
    return (
      <div>
        <Nav route={this.props.route} />
        <div id='response'>
          {this.state.chatBotResponse}
        </div>
        <div className='message'>
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Message:</strong>
            </p>
            <input
              type='text'
              value={this.state.inputMessage}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default ChatBot;
