import React from 'react'; // imports allows for JSX syntax
import '../styles/ChatbotMessage.css';

const ChatbotMessage = props => {
  if (props.message == "Hmmm...well, here are some books you make like.") {
    return (
      <div className='chatbotMessage'>
        Hmmm...well, <span className='clickable'>here</span> are some books you make like.
      </div>
    );
  } else {
    return (
      <div className='chatbotMessage'>
        {props.message}
      </div>
    );
  }

};

export default ChatbotMessage;
