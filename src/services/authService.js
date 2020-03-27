import jwt from 'jsonwebtoken';
import config from '../config';

export function getToken() {
  return fetch(`${config.API_URL}/token`, {
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

export function decodeToken() {
  return jwt.decode(localStorage.getItem('token'));
}