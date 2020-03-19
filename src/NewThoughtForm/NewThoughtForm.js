import React from 'react';
import './NewThoughtForm.css';

function NewThoughtForm(props) {
  const autoExpand = (field) => {
    field.style.height = 'inherit';
    field.style.height = field.scrollHeight + 'px';
  };

  return (
    <form className='thought-form'>
      <textarea id='create-new-thought'
        aria-label="Post a thought"
        placeholder='An essay on why bananas are green...'
        defaultValue={props.content}
        onChange={(e) => autoExpand(e.target)} /> {/* Should call a handler that keeps character count, autoexpands, etc */}
      <button type='submit'>Express</button>
    </form>
  )
}

export default NewThoughtForm;
