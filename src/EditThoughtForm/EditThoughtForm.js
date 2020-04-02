import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { updateThought } from '../services/thoughtService';
import { decodeToken } from '../services/authService';
import ThoughtContext from '../contexts/ThoughtContext';
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

    // On render, set cursor inside this form
    textarea.focus();
    textarea.selectionStart = textarea.value.length
  }, [props.thought.id]);

  const submitForm = (e) => {
    e.preventDefault()

    // Send PATCH request, update state, then close the form
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
    // Adapts the height of the form based on length of input
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
    <form onSubmit={submitForm} id={`thought-${props.thought.id}`} className='thought-form edit-thought-form'>
      <textarea onChange={(e) => formHandleChange(e.target, setThoughtForm)} name='thought' aria-label="Edit your thought" defaultValue={props.thought.content}></textarea>
      <p className='error'>{error ? error : ' '}</p>
      <div className='edit-thought-button-wrapper'>
        <button onClick={props.cancelEdit} type='button' className='cancel'>Cancel</button>
        <button disabled={error || thought.untouched} type='submit'>Re-Express</button>
      </div>
    </form>
  )
}

EditThoughtForm.propTypes = {
  thought: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.string,
    content: PropTypes.string.isRequired
  }),
  cancelEdit: PropTypes.func.isRequired
}

export default EditThoughtForm;
