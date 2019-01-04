import React from 'react';
import ChatbotMessage from './ChatbotMessage';

class ChatbotMessageDialogBubble extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div>
        <ChatbotMessage />
      </div>
    );

  }
};

export default ChatbotMessageDialogBubble;
