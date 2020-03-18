import React from 'react';
import './EditThoughtForm.css';

function EditThoughtForm(props) {
  return (
    <form className='thought-form'>
      {/* dont want a label but must still be a11y */}
      <textarea aria-label="Edit your thought" defaultValue={props.content}></textarea>
      <div className='edit-thought-button-wrapper'>
        <button onClick={props.cancelEdit} type='button'>Cancel</button>
        <button onClick={props.editThought} type='submit'>Re-Express</button>
      </div>
    </form>
  )
}

export default EditThoughtForm;
