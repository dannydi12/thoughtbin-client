import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <header className='banner'>
      <h1><Link to='/'>ThoughtBin</Link></h1>
      <p>A place for your thoughts.</p>
    </header>
  );
}

export default Header;