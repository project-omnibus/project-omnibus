import { renderRoutes } from 'react-router-config';
import routes from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Navigation';
import Main from './components/Main';

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
    console.log('In App now, trying to render Nav and Main');
    return(
        <div>
          <Nav />
          <Main />
          <h1> Hello </h1>
        </div>
    )
  }
}

export default App;
