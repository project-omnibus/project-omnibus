import React from 'react'; // imports allows for JSX syntax
import '../styles/ChatbotMessage.css';

const ChatbotMessage = props => {

  if (props.message == "Hmmm...well, here are some books you may like.") {
    return (
      <div className='chatbotMessage'>
        Hmmm...well, <span className='clickable' onClick={props.handleRecs}>here</span> are some books you may like.
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
