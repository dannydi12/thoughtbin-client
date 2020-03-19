import React, { useState, useEffect } from 'react';
import { formHandler } from '../Utils';
import './NewThoughtForm.css';

function NewThoughtForm(props) {
  const [ , setThoughtForm] = useState({
    length: null
  })

  useEffect(() => {
    setThoughtForm({
      length: document.getElementById('create-new-thought').value.length
    })
  }, [])


  return (
    <form className='thought-form'>
      <textarea id='create-new-thought'
        aria-label="Post a thought"
        placeholder='An essay on why bananas are green...'
        defaultValue={props.content}
        onChange={(e) => formHandler(e.target, setThoughtForm)} />
      <button type='submit'>Express</button>
    </form>
  )
}

export default NewThoughtForm;
