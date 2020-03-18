import React, { useEffect } from 'react';
import './EditThoughtForm.css';

function EditThoughtForm(props) {
  useEffect(() => {
    const thoughtElement = document.getElementById(`thought-${props.id}`).elements.thought;
    thoughtElement.focus();
    thoughtElement.selectionStart = thoughtElement.value.length
  });

  return (
    <form id={`thought-${props.id}`} className='thought-form'>
      <textarea name='thought' aria-label="Edit your thought" defaultValue={props.content}></textarea>
      <div className='edit-thought-button-wrapper'>
        <button onClick={props.cancelEdit} type='button'>Cancel</button>
        <button onClick={props.editThought} type='submit'>Re-Express</button>
      </div>
    </form>
  )
}

export default EditThoughtForm;
