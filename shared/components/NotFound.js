import React from 'react';
import Nav from './Navigation';

const style = {
  padding: '16px'
};

export default ({ route }) => (
  <div>
    <Nav route={route} />
    <div className='ui main text container'>
      <div style={style}>
        <h1>Sorry!</h1>
        <p>Something went horribly wrong…</p>
      </div>
    </div>
  </div>
);
