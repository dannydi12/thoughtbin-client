import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import ShareButton from '../buttons/ShareButton/ShareButton';
import EditButton from '../buttons/EditButton/EditButton';
import DeleteButton from '../buttons/DeleteButton/DeleteButton';
import EditThoughtForm from '../EditThoughtForm/EditThoughtForm';
import './ThoughtCard.css';

function ThoughtCard(props) {
  const [isEditing, setIsEditing] = useState(false)
  const match = useRouteMatch('/thoughts')

  const copyLink = () => {
    console.log('copied')
  }

  const deleteThought = () => {
    console.log('deleted') // this should be imported from a service file
  }

  return (
    <div className='thought-card'>
      {isEditing && match ? <EditThoughtForm thought={props.thought} cancelEdit={() => setIsEditing(false)} />
        : <>
          <p>{props.thought.content}</p>
          <div className='button-wrapper'>
            {match && <EditButton clickFunction={() => setIsEditing(true)} />}
            {match && <DeleteButton clickFunction={() => props.deleteThought(props.thought.id)} />}
            <ShareButton clickFunction={copyLink} />
          </div>
        </>
      }
    </div>
  )
}

export default ThoughtCard;
