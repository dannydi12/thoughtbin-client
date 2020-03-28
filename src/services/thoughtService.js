import config from '../config';
import { decodeToken } from '../services/authService';

export function getAllThoughts(offset) {
  return fetch(`${config.API_URL}/thoughts${offset ? `?offset=${offset}` : ``}`, {
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
    .catch(err => {
      console.log(err)
    })
}

export function getThoughtById(thoughtId) {
  return fetch(`${config.API_URL}/thoughts/${thoughtId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) })
      }
      return response.json();
    })
}

export function getUserThoughts(offset) {
  const token = localStorage.getItem('token')

  return fetch(`${config.API_URL}/thoughts?userId=${decodeToken(token).userId}${offset ? `&offset=${offset}` : ``}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response)
      }
      return response.json();
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
        return response.text().then(text => { throw new Error(text) })
      }
      return response.json();
    })
}

export function updateThought(thought) {
  return fetch(`${config.API_URL}/thoughts/${thought.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(thought)
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) })
      }
      return response.json();
    })
}

export function deleteThought(id) {
  return fetch(`${config.API_URL}/thoughts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response)
      }
      return;
    })
    .catch(err => {
      console.log(err)
    })
}
