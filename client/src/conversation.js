import React from 'react';

class Conversation extends React.Component{
	//Conversation component is used to route all user conversation
	//Its state should include the user profile and if conversation is done
	//User profile contains relevancy list, qAskedID, attribute, currentQ, answer

	constructor(props){
		super(props);
		this.state = {userProfile:{
			relevancy:[],
			qAskedID:[],
			attribute:{},
			currentQ:{
					qid:-1,
					question:"Hey there! Looking for something to read but not entirely sure where to look?",
					userInput:false,
					relevancy:-1,
					specificity:-1,
					userAttribute:[],
					folloupBy:[]
			},
			answer:""},
			isDone:false,
			response:""};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount () {
    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
  }

	async callApi () {
    const response = await fetch('/livecheck');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

	handleSubmit(event) {
		event.preventDefault();
		var userProfileString = JSON.stringify(this.state.userProfile);
    fetch('/conversation', {
			method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
			//body: ""
    })
		.then(res => res.json())
		.then(data =>{
			console.log(JSON.stringify(data));
			var userProfile1 = this.state.userProfile;
			userProfile1.currentQ = data.currentQ;

			this.setState({ userProfile: data });
		})
		console.log('in HandleSumbitFunction now')
  };

	handleChange(event){
		//sdfsdf
		var userProfile1 = this.state.userProfile;
		userProfile1.answer = event.target.value;
		this.setState({userProfile:userProfile1})
	}


	render(){
		return (
			<div id="container">
			<div id="chatbot-message">
				<p>{this.state.userProfile.currentQ.question}</p>
			</div>

			<div id="message-box">
				<form id="message-form" onSubmit={this.handleSubmit}>
						<input type='text' value={this.state.userProfile.answer}
						onChange={this.handleChange} id="message-input" autofocus	/>
				</form>
			</div>
			<p>{JSON.stringify(this.state.userProfile)}</p>
			</div>
		);
	}
}
export default Conversation;
