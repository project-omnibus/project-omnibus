import React from 'react'; // imports allows for JSX syntax
import ChatbotMessage from './ChatbotMessage';
import '../styles/ChatbotMessageDialogBubble.css';

const ChatbotMessageDialogBubble = props => {

  return (
    <div className='chatbotBubbleWrapper'>
      <ChatbotMessage message={props.message} handleRecs = {props.handleRecs}/>
    </div>
  );
};

export default ChatbotMessageDialogBubble;
