import React, { useEffect, useState } from 'react';
import { formHandler } from '../Utils';
import './EditThoughtForm.css';

function EditThoughtForm(props) {
  const [, setThoughtForm] = useState({
    length: null
  })

  useEffect(() => {
    const textarea = document.getElementById(`thought-${props.id}`).elements.thought;
    
    setThoughtForm({
      length: textarea.value.length
    })

    textarea.focus();
    textarea.selectionStart = textarea.value.length
  }, [props.id]);

  return (
    <form id={`thought-${props.id}`} className='thought-form'>
      <textarea onChange={(e) => formHandler(e.target, setThoughtForm)} name='thought' aria-label="Edit your thought" defaultValue={props.content}></textarea>
      <div className='edit-thought-button-wrapper'>
        <button onClick={props.cancelEdit} type='button'>Cancel</button>
        <button onClick={props.editThought} type='submit'>Re-Express</button>
      </div>
    </form>
  )
}

export default EditThoughtForm;
