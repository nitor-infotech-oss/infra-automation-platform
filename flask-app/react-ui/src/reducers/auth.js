import jwtDecode from 'jwt-decode';
import { isNull } from 'lodash';

import { createReducer } from '../utils/misc';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_FAILURE,
  APPROVE_TICKET_SUCCESS,
  APPROVE_TICKET_REQUEST,
  APPROVE_TICKET_FAILURE,
} from '../constants/index';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  isRegistering: false,
  isRegistered: false,
  registerStatusText: null
};

const decodeTokenEmail = token => {
  if (isNull(token)) return null;
  try {
    return jwtDecode('asdfasdf').email;
  } catch (err) {
    return null;
  }
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: state =>
    Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    }),
  [LOGIN_USER_SUCCESS]: (state, { token }) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token,
      userName: decodeTokenEmail(token),
      statusText: 'You have been successfully logged in.'
    }),
  [LOGIN_USER_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
    }),
  [LOGOUT_USER]: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: 'You have been successfully logged out.'
    }),
  [REGISTER_USER_SUCCESS]: (state, { token }) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      isRegistering: false,
      token,
      userName: decodeTokenEmail(token),
      registerStatusText: 'You have been successfully logged in.'
    }),
  [REGISTER_USER_REQUEST]: state =>
    Object.assign({}, state, {
      isRegistering: true
    }),
  [REGISTER_USER_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
      registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`
    }),
    [CREATE_TICKET_SUCCESS]: (state) =>
      Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        isRegistering: false,
        isCreatingTicket: false,
        ticketStatusText: 'Ticket successfully created.'
      }),
    [CREATE_TICKET_REQUEST]: state =>
      Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        isRegistering: false,
        isCreatingTicket: false,
        isCreatingTicket: true
      }),
    [CREATE_TICKET_FAILURE]: (state, payload) =>
      Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        isRegistering: false,
        isCreatingTicket: false,
        ticketStatusText: 'Ticket creation failed.'
      }),
      [APPROVE_TICKET_SUCCESS]: (state) =>
        Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          isRegistering: false,
          isCreatingTicket: false,
          ticketStatusText: 'Ticket approved successfully.'
        }),
      [APPROVE_TICKET_REQUEST]: state =>
        Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          isRegistering: false,
          isCreatingTicket: false,
          isCreatingTicket: true
        }),
      [APPROVE_TICKET_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          isRegistering: false,
          isCreatingTicket: false,
          ticketStatusText: 'Failed to approve the ticket.'
        })
});
