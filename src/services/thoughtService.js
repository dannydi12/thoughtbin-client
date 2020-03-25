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
