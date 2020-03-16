import React from 'react';
import { Route } from "react-router-dom";
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import ThoughtForm from '../ThoughtForm/ThoughtForm';
import thoughts from './thought-fixture';
import './ThoughtList.css';

function ThoughtList() {
  const allThoughts = thoughts.map(thought => <ThoughtCard key={thought.id} id={thought.id} content={thought.content} />)
  //TO-DO: if on /thoughts, filter array for thoughts with matching user id

  return (
    <section>
      <Route path='/thoughts'>
        <ThoughtForm />
      </Route>
      {allThoughts}
      {/* when clicking the edit button on a thought, a form renders inside the card with the existing text */}
    </section>
  )
}

export default ThoughtList;
