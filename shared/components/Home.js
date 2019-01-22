import React from 'react';
// import { Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Nav from './Navigation';
import '../styles/Home.css'

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      modalVisible: false,
    };
  }

  handleClick() {
     if (!this.state.modalVisible) {
       // attach/remove event handler
       document.addEventListener('click', this.handleOutsideClick, false);
     } else {
       document.removeEventListener('click', this.handleOutsideClick, false);
     }

     this.setState({modalVisible: !this.state.modalVisible });
     console.log(this.state.modalVisible);
   }

   handleOutsideClick(e) {
     // ignore clicks on the component itself
     if (this.node.contains(e.target)) {
       return;
     }

     this.handleClick();
   }

  render () {
    console.log('rendering:home');

    return (
      <div>
        <Nav brandClick = {this.handleClick} route={this.props.route} />
        {this.state.modalVisible && (
          <div className="conversation-overlay" >
            <div className="modal-content" ref={node => { this.node = node; }}>
              Stuff!
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Home;
