// shared/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render(){
    console.log('props.route.path = '+ this.props.route.path)
    let selected = '';
    if(typeof this.props.route.path === 'string') {
      selected = this.props.route.path.split('/').pop();
    }
    return(
      <nav>
        <Brand />
        <MenuButton />
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
