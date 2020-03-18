import React from 'react';
import './NewThoughtForm.css';

function NewThoughtForm(props) {
  return (
    <form className='thought-form'>
      {/* dont want a label but must still be a11y */}
      <textarea placeholder='An essay on why bananas are green...' defaultValue={props.content} />
      <button type='submit'>Express</button>
    </form>
  )
}

export default NewThoughtForm;
