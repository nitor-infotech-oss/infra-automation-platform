import {
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_FAILURE
} from '../constants/index';

import { parseJSON } from '../utils/misc';
import { getToken, createTicket } from '../utils/http_functions';

export const redirectToRoute = route => {
  return () => {
    this.props.history.push(route);
  };
};

export function createTicketRequest() {
  return { type: CREATE_TICKET_REQUEST };
}

export function createTicketSuccess() {
  return { type: CREATE_TICKET_SUCCESS };
}

export function createTicketFailure(error) {
  return {
    type: CREATE_TICKET_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export const createNewTicket = (jsonParams, history) => dispatch => {
  dispatch(createTicketRequest());
  console.log(jsonParams)
  console.log("It is inside ticket create new ticket ops")
  let token = localStorage.getItem('token');
  jsonParams['token'] = token
  return createTicket(jsonParams)
    .then(parseJSON)
    .then(response => {
      try {
        console.log(token)
        console.log("Success")
        console.log(response)
        dispatch(createTicketSuccess());
        history.push('/mytickets');
      } catch (e) {
        dispatch(
          createTicketFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          })
        );
      }
    })
    .catch(error => {
      dispatch(
        createTicketFailure({
          response: {
            status: 403,
            statusText: 'User with that email already exists',
            error
          }
        })
      );
    });
};
