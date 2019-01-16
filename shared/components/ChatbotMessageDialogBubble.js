import React from 'react'; // imports allows for JSX syntax
import ChatbotMessage from './ChatbotMessage';

const ChatbotMessageDialogBubble = props => {
  return (
    <div>
      <ChatbotMessage message={props.message} />
    </div>
  );
};

export default ChatbotMessageDialogBubble;
