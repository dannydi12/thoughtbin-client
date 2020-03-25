import config from '../config';

export function getToken() {
  fetch(`${config.API_URL}/token`, {
    method: 'POST'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response)
      }
      return response.json();
    })
    .then(token => {
      localStorage.setItem('token', token.token)
    })
    .catch(err => {
      console.log(JSON.stringify(err))
    })
}
