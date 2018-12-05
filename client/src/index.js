import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import BookSearch from './BookSearch';
import Conversation from './Conversation';
import * as serviceWorker from './serviceWorker';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      userProfile:{}
    }
    this.handleConversation = this.handleConversation.bind(this);
  }

  handleConversation(data){
    this.setState({userProfile:data});
  }
  render(){
    return(
      <Router>
        <div>
          <ul>
            <li>
              <Link to ='/conversation'>Conversation</Link>
            </li>
            <li>
              <Link to='/booksearch'>Book Search</Link>
            </li>
          </ul>
          <hr />
          <Route path ='/conversation' render ={props => <Conversation{...props} triggerParentHandler={this.handleConversation}/>}/>
          <Route path ='/booksearch' component = {BookSearch}/>
          <div>
            <p>{JSON.stringify(this.state.userProfile)}</p>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Conversation />, document.getElementById('conversation'));
//ReactDOM.render(<BookSearch />, document.getElementById('bookSearch'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
