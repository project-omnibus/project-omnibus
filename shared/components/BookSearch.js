import React from 'react';
import Nav from './Navigation'
import fetch from 'isomorphic-fetch'

class BookSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }*/ // commented out because async isn't working with babel runtime right now
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.post.length === 0) {
      alert('Value should not be empty');
      return;
    }

    fetch('/v1/books?q=' + this.state.post, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status !== 200) throw Error(body.error);
      return res.json();
    })
    .then(data => {
      console.log(data);
      this.setState({ responseToPost: data.relatedBooks });
    })
  };

  render () {
    return (
      <div className='App'>
        <Nav route ={this.props.route}/>
        <p>Status of Omnibus server on port 5000 is {this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type='text'
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type='submit'>Submit</button>
        </form>
        {this.state.responseToPost.map((item, index) => (
          <p id={index}>{item}</p>
        ))}
      </div>
    );
  }
}

export default BookSearch;
