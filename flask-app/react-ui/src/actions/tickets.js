import {
  RECEIVE_TICKET_DATA,
  FETCH_TICKET_DATA_REQUEST,
  APPROVE_TICKET_SUCCESS,
  APPROVE_TICKET_REQUEST,
  APPROVE_TICKET_FAILURE
} from '../constants/index';


import { parseJSON } from '../utils/misc';
import { dataAboutMyTickets, dataAboutTickets, dataAboutAllTickets, approveNewTicket } from '../utils/http_functions';


export function receiveTicketsData(data) {
  console.log('RECEIVE_TICKET_DATA')
  return {
    type: RECEIVE_TICKET_DATA,
    payload: {
      data
    }
  };
}

export function fetchTicketsDataRequest() {
  return {
    type: FETCH_TICKET_DATA_REQUEST
  };
}

export const fetchTicketsData = token => dispatch => {
  dispatch(fetchTicketsDataRequest());
  dataAboutTickets(token)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveTicketsData(response.result));
    })
    .catch(error => {
      if (error.status === 401) {
        console.log("ERROR - fetchTicketsData")
      }
    });
};

export const fetchMyTicketsData = token => dispatch => {
  dispatch(fetchTicketsDataRequest());
  dataAboutMyTickets(token)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveTicketsData(response.result));
    })
    .catch(error => {
      if (error.status === 401) {
        console.log("ERROR - fetchTicketsData")
      }
    });
};

export const fetchAllTicketsData = token => dispatch => {
  dispatch(fetchTicketsDataRequest());
  dataAboutAllTickets(token)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveTicketsData(response.result));
    })
    .catch(error => {
      if (error.status === 401) {
        console.log("ERROR - fetchTicketsData")
      }
    });
};

export function approveTicketRequest() {
  return { type: APPROVE_TICKET_REQUEST };
}

export function approveTicketSuccess() {
  return { type: APPROVE_TICKET_SUCCESS };
}

export function approveTicketFailure(error) {
  return {
    type: APPROVE_TICKET_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export const approveTicket = (jsonParams, history) => dispatch => {
  dispatch(approveTicketRequest());
  console.log(approveTicket)
  console.log("It is inside ticket approve new ticket ops")
  let token = localStorage.getItem('token');
  return approveNewTicket(jsonParams)
    .then(parseJSON)
    .then(response => {
      try {
        console.log(token)
        console.log("Success")
        console.log(response)
        dispatch(approveTicketSuccess());
        history.push('/tickets');
      } catch (e) {
        dispatch(
          approveTicketFailure({
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
        approveTicketFailure({
          response: {
            status: 403,
            statusText: 'User with that email already exists',
            error
          }
        })
      );
    });
};
