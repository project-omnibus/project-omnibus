import React from 'react';
import Nav from './Navigation'

class Conversation extends React.Component{
	//Conversation component is used to route all user conversation
	//Its state should include the user profile and if conversation is done
	//User profile contains relevancy list, qAskedID, attribute, currentQ, answer

	constructor(props){
		super(props);
		this.state = {
			userProfile:{
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
				answer:""
			},
			isDone:false,
			response:""};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	};

	/*componentDidMount () {
    this.callApi()
      .then(res => this.setState({ response: res.status }))
      .catch(err => console.log(err));
  }

	async callApi () {
    const response = await fetch('/livecheck');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }*/

	handleSubmit(event) {
		event.preventDefault();
		//var userProfileString = JSON.stringify(this.state.userProfile);
    fetch('/conversation', {
			method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
			body:JSON.stringify(this.state.userProfile)
    })
		.then(res => res.json())
		.then(data =>{
			var userProfile1 = data;
			userProfile1.answer="";
			this.props.triggerParentHandler(userProfile1);

			this.setState({ userProfile: userProfile1 });
		})
  };

	handleChange(event){
		//sdfsdf
		var userProfile1 = this.state.userProfile;
		userProfile1.answer = event.target.value;
		this.setState({userProfile:userProfile1})
	}


	render(){
		return (
      <div>
				<Nav route ={this.props.route}/>
				<div id='question'>
					{this.state.userProfile.currentQ.question}
				</div>
				<div className = 'Answer'>
	        <form onSubmit={this.handleSubmit}>
	          <p>
	            <strong>Answer:</strong>
	          </p>
	          <input
	            type='text'
	            value={this.state.userProfile.answer}
	            onChange={this.handleChange}
	          />
	        </form>
	        <p>{JSON.stringify(this.state.userProfile)}</p>
	      </div>
			</div>
		);
	}
}
export default Conversation;