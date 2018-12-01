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
			currentQ:"Hey there! Looking for something to read but not entirely sure where to look?",
			answer:""},
			isDone:false,
			response:""};
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
  handleSubmit = async e => {
    e.preventDefault();
		var userProfileString = JSON.stringify(this.userProfile);
    const response = await fetch('/conversation' + userProfileString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await response.json();
    this.setState({ userProfile: body });
  };


	render(){
		return (
      <div className='Convesation'>
        <p>Status of Omnibus server on port 5000 is {this.state.response}</p>
				<div id='question'>
					<p className = 'Question'>{this.state.userProfile.currentQ}</p>
				</div>
				<div className = 'Answer'>
	        <form onSubmit={this.handleSubmit}>
	          <p>
	            <strong>Answer:</strong>
	          </p>
	          <input
	            type='text'
	            value=""
	            onChange={e => {
								var userProfile = this.state.userProfile;
								userProfile.answer = e.target.value;
								this.setState({userProfile})}
							}
	          />
	          <button type='submit'>Submit</button>
	        </form>
	        <p>{JSON.stringify(this.state.userProfile)}</p>
	      </div>
			</div>
		);
	}
}
export default Conversation;
