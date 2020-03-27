import React, { useEffect, useState, useContext } from 'react';
import { updateThought } from '../services/thoughtService';
import { decodeToken } from '../services/authService';
import ThoughtContext from '../contexts/ThoughtContext';
// import { formHandleChange } from '../Utils';
import './EditThoughtForm.css';

function EditThoughtForm(props) {
  const [thought, setThoughtForm] = useState({
    untouched: true,
    content: null
  })

  const [error, setError] = useState(null)

  const thoughtContext = useContext(ThoughtContext);

  useEffect(() => {
    const textarea = document.getElementById(`thought-${props.thought.id}`).elements.thought;

    textarea.focus();
    textarea.selectionStart = textarea.value.length
  }, [props.thought.id]);

  const submitForm = (e) => {
    e.preventDefault()
    updateThought({
      id: props.thought.id,
      userId: decodeToken().userId,
      content: thought.content
    })
      .then(updatedThought => {
        thoughtContext.editThoughtInList(updatedThought)
        props.cancelEdit()
      })
      .catch(error => {
        setError(error.message)
      })
  }

  useEffect(() => {
    validateContent()
  }, [thought.content])

  const formHandleChange = (thoughtEvent) => {
    thoughtEvent.style.height = 'inherit';
    thoughtEvent.style.height = thoughtEvent.scrollHeight + 'px';

    setThoughtForm({
      content: thoughtEvent.value,
    })
  }

  const validateContent = () => {
    if(thought.untouched) {
      return;
    }

    if (thought.content === props.thought.content) {
      setError('You must change your thought to re-express.')
      return;
    }

    if (thought.content.length > 500) {
      setError('Your thought must be shorter than 500 characters.')
      return;
    }

    if (thought.content.length <= 3) {
      setError('Your thought must be longer than 3 characters.')
      return;
    }

    setError(false)
  }

  return (
    <form onSubmit={submitForm} id={`thought-${props.thought.id}`} className='thought-form'>
      <textarea onChange={(e) => formHandleChange(e.target, setThoughtForm)} name='thought' aria-label="Edit your thought" defaultValue={props.thought.content}></textarea>
      {error && <p className='error'>{error}</p>}
      <div className='edit-thought-button-wrapper'>
        <button onClick={props.cancelEdit} type='button'>Cancel</button>
        <button disabled={error || thought.untouched} type='submit'>Re-Express</button>
      </div>
    </form>
  )
}

export default EditThoughtForm;
