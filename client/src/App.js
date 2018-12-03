import React from'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import './App.css';

class App extends React.Component {
  state = {
    response: '',
    post: '',
    responseToPost: []
  };
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
    if (this.state.post.length === 0) {
      alert('Value should not be empty');
      return;
    }

    const response = await fetch('/v1/books?q=' + this.state.post, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.error);
    this.setState({ responseToPost: body.relatedBooks });
  };

  render () {
    return (
      <div className='App'>
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
          <p>{item}</p>
        ))}
      </div>
    );
  }
}

export default App;
