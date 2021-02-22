import axios from 'axios';

const tokenConfig = token => ({
  headers: {
    Authorization: token // eslint-disable-line quote-props
  }
});

export function validateToken(token) {
  return axios.post('/api/is_token_valid', {
    token
  });
}

export function getGithubAccess() {
  window.open(
    '/github-login',
    '_blank' // <- This is what makes it open in a new window.
  );
}

export function createUser(name, email, password) {
  return axios.post('api/create_user', {
    name,
    email,
    password
  });
}

export function createTicket(jsonParams) {
  return axios.post('api/create_ticket', jsonParams);
}

export function getToken(email, password) {
  return axios.post('api/getToken', {
    email,
    password
  });
}

export function hasGithubAccess(token) {
  return axios.get('api/hasGithubAccess', tokenConfig(token));
}

export function dataAboutUser(token) {
  return axios.get('api/user', tokenConfig(token));
}

export function dataAboutTickets(token) {
  return axios.get('api/get_tickets', tokenConfig(token));
}

export function dataAboutMyTickets(token) {
  return axios.get('api/get_my_tickets', tokenConfig(token));
}

export function dataAboutAllTickets(token) {
  return axios.get('api/get_all_tickets', tokenConfig(token));
}


export function approveNewTicket(jsonParams) {
  return axios.post('api/approve_ticket', jsonParams);
}
