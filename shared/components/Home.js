import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Nav from './Navigation'
import Conversation from './Conversation'
import ChatbotMessageDialogBubble from './ChatbotMessageDialogBubble'

class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
    console.log('rendering:home')
		return (
			<div>
				<Nav route ={this.props.route}/>
				<div className="container">
					<ChatbotMessageDialogBubble />
				</div>
			</div>
		);
		// return (
    //   <div>
    //     <Nav route ={this.props.route}/>
		// 		<div id='greeting'>
		// 			<h1>Hello this is Home Page</h1>
		// 			<p>{this.props.mainProps}</p>
		// 		</div>
		// 	</div>
		// );
	}
}
export default Home;
