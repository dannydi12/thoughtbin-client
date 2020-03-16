import React, { useState } from 'react';
import ThoughtForm from '../ThoughtForm/ThoughtForm'
import './ThoughtCard.css';

function ThoughtCard(props) {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div>
      {isEditing ? <ThoughtForm content={props.content} /> : <p>{props.content}</p>}
      <div>
        <button>Share</button>
        <button onClick={() => setIsEditing(true)}>Edit icon</button>
        <button>Trash icon</button>
      </div>
    </div>
  )
}

export default ThoughtCard;
