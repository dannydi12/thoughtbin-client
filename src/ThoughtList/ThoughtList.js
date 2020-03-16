import React from 'react';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import thoughts from './thought-fixture';
import './ThoughtList.css';

function ThoughtList() {
  const allThoughts = thoughts.map(thought => <ThoughtCard key={thought.id} id={thought.id} content={thought.content} />)
  //TO-DO: if on /thoughts, filter array for thoughts with matching user id

  return (
    <section>
      {/* Input here for thoughts */}
      {allThoughts}
    </section>
  )
}

export default ThoughtList;
