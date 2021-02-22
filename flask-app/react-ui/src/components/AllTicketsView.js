import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, createStore } from 'redux';
import * as actionCreators from '../actions/tickets';
import EnhancedTable from './DataTable';


class AllTicketsView extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchAllTicketsData(token);
    console.log(this.props)
  }

  approveTicketFromDT(event) {
    console.log("approveTicket")
    console.log(this.props)
    const token = this.token;
    console.log(event)
    this.approveTicket({"test": "test"}, this.token);
  }

  render() {
    return (
      <div>
      <h1> {this.props.loaded} </h1>
      {!this.props.loaded ? (
        <h1>Loading data...</h1>
      ) : (
        <div>
          <div class="MuiToolbar-root MuiToolbar-regular makeStyles-root-5 MuiToolbar-gutters">
            <h4 class="MuiTypography-root makeStyles-title-7 MuiTypography-h6">Tickets History</h4>
          </div>
          <div>
            <EnhancedTable tableType="alltickets" tableData={this.props.data.data} store={this.approveTicketFromDT} approveTicket={this.props.approveTicket} token={this.props.history}/>
          </div>
        </div>
      )}
      </div>
    );
  }
}

AllTicketsView.propTypes = {
  approveTicket: PropTypes.func,
  fetchTicketsData: PropTypes.func,
  loaded: PropTypes.bool,
  data: PropTypes.any,
  token: PropTypes.string
};

function mapStateToProps(state) {
  return { data: state.data, token: state.auth.token, loaded: state.data.loaded, isFetching: state.data.isFetching };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTicketsView);
