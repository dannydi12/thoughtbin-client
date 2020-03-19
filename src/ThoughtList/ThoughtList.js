import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import NewThoughtForm from '../NewThoughtForm/NewThoughtForm';
import thoughts from './thought-fixture';
import './ThoughtList.css';

function ThoughtList() {
  const match = useRouteMatch('/thoughts')
  const allThoughts = thoughts.map(thought => <ThoughtCard key={thought.id} id={thought.id} content={thought.content} />)
  //TO-DO: if on /thoughts, filter array for thoughts with matching user id

  useEffect(() => {
    if (match) {
      const createThought = document.getElementById(`create-new-thought`);
      createThought.focus();
    }
  }, [match]);

  return (
    <section className='thought-list'>
      {match && <NewThoughtForm />}
      {allThoughts}
    </section>
  )
}

export default ThoughtList;
