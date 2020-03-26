import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import NewThoughtForm from '../NewThoughtForm/NewThoughtForm';
import './ThoughtList.css';

function ThoughtList(props) {

  const match = useRouteMatch('/thoughts')
  let thoughtCards = makeCards();

  function makeCards() {
    if (match) {
      return props.thoughts.userThoughts.sort((a, b) => b.id - a.id).map(thought =>
        <ThoughtCard key={thought.id} thought={thought} />
      )
    } else {
      return props.thoughts.allThoughts.map(thought =>
        <ThoughtCard key={thought.id} thought={thought} />
      )
    }
  }

  useEffect(() => {
    if (match) {
      const createThoughtForm = document.getElementById(`create-new-thought`);
      createThoughtForm.focus();
    }
  }, [match]);

  return (
    <section className='thought-list'>
      {match && <NewThoughtForm />}
      {thoughtCards}
    </section>
  )
}

export default ThoughtList;
