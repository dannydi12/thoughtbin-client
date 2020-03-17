import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import ThoughtForm from '../ThoughtForm/ThoughtForm';
import ShareButton from '../buttons/ShareButton/ShareButton';
import EditButton from '../buttons/EditButton/EditButton';
import './ThoughtCard.css';
import DeleteButton from '../buttons/DeleteButton/DeleteButton';

function ThoughtCard(props) {
  const [isEditing, setIsEditing] = useState(false)
  const match = useRouteMatch('/thoughts')

  const copyLink = () => {
    console.log('copied')
  }

  const deleteThought = () => {
    console.log('deleted')
  }

  return (
    <div className='thought-card'>
      {isEditing ? <ThoughtForm content={props.content} /> : <p>{props.content}</p>}
      <div className='button-wrapper'>
        {match && <EditButton clickFunction={() => setIsEditing(true)} />}
        {match && <DeleteButton clickFunction={deleteThought}/>}
        <ShareButton clickFunction={copyLink} />

      </div>
    </div>
  )
}

export default ThoughtCard;
