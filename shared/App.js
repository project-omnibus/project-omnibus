import { renderRoutes } from 'react-router-config';
import routes from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BookSearch from './components/BookSearch';
import Conversation from './components/Conversation';

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

export default App;
