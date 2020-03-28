import React, { useState, useContext } from 'react';
import { useRouteMatch } from "react-router-dom";
import { deleteThought } from '../services/thoughtService';
import ThoughtContext from '../contexts/ThoughtContext';
import ShareButton from '../buttons/ShareButton/ShareButton';
import EditButton from '../buttons/EditButton/EditButton';
import DeleteButton from '../buttons/DeleteButton/DeleteButton';
import EditThoughtForm from '../EditThoughtForm/EditThoughtForm';
import './ThoughtCard.css';

function ThoughtCard(props) {
  const [isEditing, setIsEditing] = useState(false)
  const match = useRouteMatch('/thoughts') || ''

  const thought = useContext(ThoughtContext);

  const copyLink = () => {
    console.log('copied')
  }

  const removeThought = () => {
    deleteThought(props.thought.id)
      .then(thought.removeFromThoughtList(props.thought.id))
  }

  return (
    <div className='thought-card'>
      {isEditing && match ? <EditThoughtForm thought={props.thought} cancelEdit={() => setIsEditing(false)} />
        : <>
          <p>{props.thought.content}</p>
          <div className='button-wrapper'>
            {match.isExact && <EditButton clickFunction={() => setIsEditing(true)} />}
            {match.isExact && <DeleteButton clickFunction={removeThought} />}
            <ShareButton clickFunction={copyLink} />
          </div>
        </>
      }
    </div>
  )
}

export default ThoughtCard;
