import React, { useState, useEffect, useContext } from 'react';
import ThoughtContext from '../contexts/ThoughtContext';
import { createNewThought } from '../services/thoughtService';
import { decodeToken } from '../services/authService';
import './NewThoughtForm.css';

function NewThoughtForm(props) {
  const [error, setError] = useState(null)
  const [thought, setThoughtForm] = useState({
    untouched: true,
    content: null
  })

  const thoughtContext = useContext(ThoughtContext)

  const submitForm = (e) => {
    e.preventDefault()
    e.persist()
    createNewThought({
      userId: decodeToken().userId,
      content: thought.content
    })
      .then(newThought => {
        thoughtContext.addToThoughtList(newThought);
        e.target.thought.value = ''
      })
      .catch(error => {
        setError(error.message)
      })
  }

  const formHandleChange = (thoughtEvent) => {
    thoughtEvent.style.height = 'inherit';
    thoughtEvent.style.height = thoughtEvent.scrollHeight + 'px';

    setThoughtForm({
      content: thoughtEvent.value,
    })
  }

  useEffect(() => {
    validateContent()
  }, [thought.content])

  const validateContent = () => {
    if (thought.untouched) {
      return;
    }

    if (thought.content.length > 400) {
      setError('Your thought must be shorter than 400 characters.')
      return;
    }

    if (thought.content.length <= 3) {
      setError('Your thought must be longer than 3 characters.')
      return;
    }

    setError(false)
  }

  return (
    <form onSubmit={submitForm} className='thought-form'>
      <textarea id='create-new-thought'
        name='thought'
        aria-label="Post a thought"
        placeholder='An essay on why bananas are green...'
        onChange={(e) => formHandleChange(e.target)} />
      <p className='error'>{error ? error : ' '}</p>
      <button disabled={error || thought.untouched} type='submit'>Express</button>
    </form>
  )
}

export default NewThoughtForm;
