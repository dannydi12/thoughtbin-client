import React from 'react';
import ThoughtList from './ThoughtList/ThoughtList';
import { useHistory, useLocation } from "react-router-dom";
import './App.css';

function App() {
  const history = useHistory();
  const location = useLocation();

  const handleClick = path => {
    history.push(path)
  }

  return (
    <main>
      <header className='banner'>
        <h1>ThoughtBin</h1>
        <p>A place for your thoughts.</p>
      </header>
      <section>
        <h3>What's on your mind?</h3>
        <div>
          <button onClick={() => handleClick('/thoughts/create')}>Make a thought</button>
          {
            location.pathname === '/' ?
              <button onClick={() => handleClick('/thoughts')}>My Thoughts</button>
              : <button onClick={() => handleClick('/')}>Others' Thoughts</button>
          }
        </div>
      </section>
      <ThoughtList />
    </main>
  );
}

export default App;
