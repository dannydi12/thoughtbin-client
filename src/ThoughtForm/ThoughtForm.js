import React from 'react';
import './ThoughtForm.css';

function ThoughtForm(props) {
  return (
    <form>
      {/* dont want a label but must still be a11y */}
      <textarea placeholder='An essay on why bananas are green...' defaultValue={props.content}></textarea>
      <button type='submit'>Express</button>
    </form>
  )
}

export default ThoughtForm;
