// shared/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand.js';
import MenuButton from './MenuButton.js';

class Nav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuVisible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  render () {
    // console.log('props.route.path = ' + this.props.route.path);
    // let selected = '';
    // if (typeof this.props.route.path === 'string') {
    //   selected = this.props.route.path.split('/').pop();
    // }

    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-between'>
        <button className='btn btn-link' onClick={this.props.convBrand}><Brand /></button>
        <MenuButton />
        {this.state.menuVisible && (
          <div className="overlay" >
            <div className="overlay-content" ref={node => { this.node = node; }}>
                <Menu />
            </div>
          </div>
        )}
      </nav>
    );

    // return(
    //   <nav>
    //     <div className="navigation">
    //       <a href="/" className="brand-logo">Project Omnibus</a>
    //       <ul id="nav-mobile" className="right">
    //         <li className={selected === '' ? 'active' : ''}><Link to ='/'> HOME </Link></li>
    //         <li className={selected === 'conversation' ? 'active' : ''}><Link to ='/conversation'>Conversation</Link></li>
    //         <li className={selected === 'book search' ? 'active' : ''}><Link to='/booksearch'>Book Search</Link></li>
    //       </ul>
    //     </div>
    //   </nav>
    // );
  }
};

export default Nav;
