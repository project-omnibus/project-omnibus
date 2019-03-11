// shared/components/Navigation.js
import React from 'react';
import Brand from './Brand.js';
import MenuButton from './MenuButton';
import Menu from './Menu';
import '../styles/Navigation.css'
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuVisible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleChatClick = this.handleChatClick.bind(this);
  }

  handleClick() {
    if (!this.state.menuVisible) {
     // attach/remove event handler
     document.addEventListener('click', this.handleOutsideClick, false);
    }
    else {
     document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({menuVisible: !this.state.menuVisible });
  }

  handleChatClick(e){
    //move brand logo to the center

    //display the conversation component

    this.props.convBrand();
    //close the menu if applicable
    this.handleClick();
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
     return;
    }

    this.handleClick();
  }

  render () {
    // console.log('props.route.path = ' + this.props.route.path);
    // let selected = '';
    // if (typeof this.props.route.path === 'string') {
    //   selected = this.props.route.path.split('/').pop();
    // }
    let boxClass;
    if (this.props.chatbotPos){
      boxClass = 'shiftLogo'
    }
    else{
      boxClass = 'shiftLogoReturn'
    }
    return (
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className={boxClass}></div>
        <button className='btn btn-link' onClick={this.props.convBrand}><Brand /></button>

      </nav>
    );
    //<button className='btn btn-link' onClick={this.handleClick}><MenuButton menuClick = {this.handleClick}/></button>
    // {this.state.menuVisible && (
    //   <div className="overlay" >
    //     <div className="overlay-content" ref={node => { this.node = node; }}>
    //       <h4 className="menuTitle">Menu</h4>
    //       <ul className="menuList">
    //         <li className="menuItem"><span onClick={this.handleChatClick}>Chat</span></li>
    //         <li className="menuItem" onClick={this.handleClick} ><Link to="/">Recommendations</Link></li>
    //         <li className="menuItem">Community</li>
    //         <li className="menuItem">My Profile</li>
    //       </ul>
    //     </div>
    //   </div>
    // )}
  }
};

export default Nav;
