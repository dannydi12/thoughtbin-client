import React from 'react';
import ThoughtList from './ThoughtList/ThoughtList';
import './App.css';

function App() {
  return (
    <main>
      <header className='banner'>
        <h1>ThoughtBin</h1>
        <p>A place for your thoughts.</p>
      </header>
      <section>
        <h3>What's on your mind?</h3>
        <div>
          <button>Make a thought</button>
          <button>Make a thought</button>
        </div>
      </section>
    </main>
  );
}

export default App;
