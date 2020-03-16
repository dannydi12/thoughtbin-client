import React from 'react';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import thoughts from './thought-fixture';
import { Route } from "react-router-dom";
import './ThoughtList.css';

function ThoughtList() {
  const allThoughts = thoughts.map(thought => <ThoughtCard key={thought.id} id={thought.id} content={thought.content} />)
  //TO-DO: if on /thoughts, filter array for thoughts with matching user id

  return (
    <section>
      <Route path='/thoughts'>
        <form>
          {/* dont want a label but must still be a11y */}
          <textarea>hey</textarea>
          <button type='submit'>Express</button>
        </form>
      </Route>
      {allThoughts}
      {/* when clicking the edit button on a thought, a form renders inside the card with the existing text */}
    </section>
  )
}

export default ThoughtList;
