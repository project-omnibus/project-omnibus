import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Nav from './Navigation'
class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {}
	}

	render(){
    console.log('rendering:home')
		return (
      <div>
        <Nav route ={this.props.route}/>
				<div id='greeting'>
					<h1>Hello this is Home Page</h1>
				</div>
			</div>
		);
	}
}
export default Home;