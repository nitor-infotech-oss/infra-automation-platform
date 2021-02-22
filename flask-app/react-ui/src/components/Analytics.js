import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import TicketForm from './TicketForm';

const Analytics = () => (
  <div className="col-md-8">
    <TicketForm />
  </div>
);

function mapStateToProps(state) {
  return {
    isRegistering: state.auth.isRegistering,
    registerStatusText: state.auth.registerStatusText
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analytics);
