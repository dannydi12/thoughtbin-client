import React from 'react';
import { useRouteMatch } from "react-router-dom";
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import ThoughtForm from '../ThoughtForm/ThoughtForm';
import thoughts from './thought-fixture';
import './ThoughtList.css';

function ThoughtList() {
  const match = useRouteMatch('/thoughts')
  const allThoughts = thoughts.map(thought => <ThoughtCard key={thought.id} id={thought.id} content={thought.content} />)
  //TO-DO: if on /thoughts, filter array for thoughts with matching user id

  return (
    <section className='thought-list'>
      {match && <ThoughtForm />}
      {allThoughts}
    </section>
  )
}

export default ThoughtList;
