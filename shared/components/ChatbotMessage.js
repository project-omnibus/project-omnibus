import React from 'react';
// import styles from '../styles/ChatbotMessage.css'

class ChatbotMessage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chatbot_message: {
        message: "",
        datetime: "0000-00-00 00:00:00",
      },
    };
  }

  render(){
    return(
      <div>
        What's the last good book you read?
      </div>
    );

  }
};

export default ChatbotMessage;
