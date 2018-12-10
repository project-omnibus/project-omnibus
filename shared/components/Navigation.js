// shared/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
export default () => (
  <nav>
    <div className="navigation">
      <a href="/" className="brand-logo">Project Omnibus</a>
      <ul id="nav-mobile" className="right">
        <li><Link to ='/'> HOME </Link></li>
        <li><Link to ='/conversation'>Conversation</Link></li>
        <li><Link to='/booksearch'>Book Search</Link></li>
      </ul>
    </div>
  </nav>
);
