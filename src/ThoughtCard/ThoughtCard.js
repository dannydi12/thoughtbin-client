import React, { useState, useContext, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import PropTypes from 'prop-types';
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
    // 'Copied' notification to let the user know the link has been copied to their clipboard
    const notificationTimeout = setTimeout(() => {
      setShowCopied(false)
    }, 3000)
    return () => clearTimeout(notificationTimeout)
  }, [showCopied])

  const copyLink = () => {
    // Create a temporary textarea to copy link to clipboard
    const text = document.createElement('textarea');
    text.value = `${window.location.href}${match ? '/' : 'thoughts/'}${props.thought.id}`;

    // Set it far away so the user doesn't see a flash
    text.setAttribute('readonly', '');
    text.style.position = 'absolute';
    text.style.left = '-9999px';

    // This part should make sense on its own... I hope...
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

ThoughtCard.propTypes = {
  thought: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.string,
    content: PropTypes.string.isRequired
  })
}

export default ThoughtCard;
