import React from 'react';
import ThoughtList from './ThoughtList/ThoughtList';
import { useLocation, Link } from "react-router-dom";
import './App.css';

function App() {
  const location = useLocation();

  return (
    <main>
      <nav>
        <Link to='/thoughts'>Your thoughts</Link>
      </nav>
      <header className='banner'>
        <h1>ThoughtBin</h1>
        <p>A place for your thoughts.</p>
      </header>
      <section>
        <h3>What's on your mind?</h3>
        {location.pathname === '/' && <Link to='/thoughts/create'>Express a thought</Link>}
      </section>
      <ThoughtList />
    </main>
  );
}

export default App;
