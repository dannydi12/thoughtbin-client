import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import ThoughtForm from '../ThoughtForm/ThoughtForm'
import './ThoughtCard.css';

function ThoughtCard(props) {
  const [isEditing, setIsEditing] = useState(false)
  const match = useRouteMatch('/thoughts')
  return (
    <div className='thought-card'>
      {isEditing ? <ThoughtForm content={props.content} /> : <p>{props.content}</p>}
      <div className='button-wrapper'>
        <button>Share</button>

        {
          match &&
          <>
            <button onClick={() => setIsEditing(true)}>Edit icon</button>
            <button>Trash icon</button>
          </>
        }
      </div>
    </div>
  )
}

export default ThoughtCard;
