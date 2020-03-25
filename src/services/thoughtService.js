import config from '../config';

export function getAllThoughts() {
  return fetch(`${config.API_URL}/thoughts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response)
      }
      return response.json();
    })
    .then(thoughts => {
      return thoughts
    })
    .catch(err => {
      console.log(err)
    })
}

export function createNewThought(thought) {
  return fetch(`${config.API_URL}/thoughts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(thought)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response)
      }
      return response.json();
    })
    .then(thoughts => {
      return thoughts
    })
    .catch(err => {
      console.log(`Bearer ${localStorage.getItem('token')}`)
    })
}