import React, { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import NewThoughtForm from '../NewThoughtForm/NewThoughtForm';
import thoughtsList from './thought-fixture';
import './ThoughtList.css';

function ThoughtList() {
  const [thoughts, setThoughts] = useState({
    allThoughts: thoughtsList.sort((a, b) => b.id - a.id)
  })
  const match = useRouteMatch('/thoughts')

  const editThought = (updatedThought) => {
    setThoughts({
      allThoughts: thoughts.map(thought => updatedThought.id === thought.id ? updatedThought : undefined)
    })
  }

  const deleteThought = (id) => {
    setThoughts({
      allThoughts: thoughts.allThoughts.filter(thought => id !== thought.id)
    })
  }

  const createThought = (thought) => {
    setThoughts({
      allThoughts: [...thoughts.allThoughts, thought].sort((a, b) => b.id - a.id)
    })
  }

  const thoughtCards = thoughts.allThoughts.filter(thought => {
    if (match) {
      return thought.user === 1
    }
    else {
      return true
    }
  })
    .map(thought =>
      <ThoughtCard key={thought.id} thought={thought} deleteThought={deleteThought} editThought={editThought} />
    )

  useEffect(() => {
    if (match) {
      const createThoughtForm = document.getElementById(`create-new-thought`);
      createThoughtForm.focus();
    }
  }, [match]);

  return (
    <section className='thought-list'>
      {match && <NewThoughtForm allThoughts={thoughts.allThoughts} createThought={createThought} />}
      {thoughtCards}
    </section>
  )
}

export default ThoughtList;
