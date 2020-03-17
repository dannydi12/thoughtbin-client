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
    <section className='thought-list'>
      <Route path='/thoughts'>
        <ThoughtForm />
      </Route>
      {allThoughts}
    </section>
  )
}

export default ThoughtList;
