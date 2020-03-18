import React from 'react';
import './ThoughtForm.css';

function ThoughtForm(props) {
  return (
    <form className='new-thought-form'>
      {/* dont want a label but must still be a11y */}
      <textarea placeholder='An essay on why bananas are green...' defaultValue={props.content} />
      <button type='submit'>Express</button>
    </form>
  )
}

export default ThoughtForm;
