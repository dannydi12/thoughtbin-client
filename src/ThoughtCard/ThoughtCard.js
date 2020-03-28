import React, { useState, useContext, useEffect } from 'react';
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
  const [showCopied, setShowCopied] = useState(false)
  const match = useRouteMatch('/thoughts') || ''

  const thought = useContext(ThoughtContext);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setShowCopied(false)
    }, 3000)
    return () => clearTimeout(notificationTimeout)
  }, [showCopied])

  const copyLink = () => {
    const text = document.createElement('textarea');
    text.value = `https://thoughtbin.tk/thoughts/${props.thought.id}`;
    text.setAttribute('readonly', '');
    text.style.position = 'absolute';
    text.style.left = '-9999px';

    document.body.appendChild(text);
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);

    setShowCopied(true)
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
            {showCopied && <p className='copied-notif'> Copied link </p>}
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
