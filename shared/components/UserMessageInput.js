import React from 'react';
import '../styles/UserMessageInput.css'

class UserMessageInput extends React.Component{
  constructor () {
    super();
    this.state = {
      userMessage:"",
    };
  }

  onInputChange = e => {
    this.setState({userMessage: e.target.value });
  }
  onSubmit = e =>  {
		// e.preventDefault();
		// //var userProfileString = JSON.stringify(this.state.userProfile);
    // fetch('/conversation/api', {
		// 	method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
		// 	body:JSON.stringify(this.state.userProfile)
    // })
		// .then(res => res.json())
		// .then(data =>{
		// 	var userProfile1 = data;
		// 	userProfile1.answer="";
		// 	this.props.triggerParentHandler(userProfile1);  //commented because don't knwo how to pass props to parent through router-config yet
    //
		// 	this.setState({ userProfile: userProfile1 });
		// })
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      <input className="user-message" placeholder="Reply back" value={this.state.userMessage} onChange = {this.onInputChange} />
      </form>
    )
  }
};

export default UserMessageInput;
