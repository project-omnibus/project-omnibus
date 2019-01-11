import React, { Component } from "react"; //imports allows for JSX syntax
import '../styles/ChatbotMessage.css'

const ChatbotMessage = props => {

    return(
      <div className="chatbotMessage">
        {props.message}
      </div>
    );

};

export default ChatbotMessage;
