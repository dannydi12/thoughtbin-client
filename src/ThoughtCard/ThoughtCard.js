import React from 'react';
import './ThoughtCard.css';

function ThoughtCard(props) {
  return (
    <div>
      <p>{props.content}</p>
    </div>
  )
}

export default ThoughtCard;
