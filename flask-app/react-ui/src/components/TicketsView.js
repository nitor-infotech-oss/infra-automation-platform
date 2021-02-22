import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, createStore } from 'redux';
import * as actionCreators from '../actions/tickets';
import EnhancedTable from './DataTable';
import $ from 'jquery';

class TicketsView extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchTicketsData(token);
    console.log(this.props)
  }

  approveTicketFromDT(event) {
    console.log("approveTicket")
    console.log("event")
    var elements = $('.MuiTableRow-root[aria-checked="true"]').find('[role="cell"]')
    var ticketIdArray =elements.map(function(){
         return $.trim($(this).text());
      }).get();
    console.log("ticketIdArray")
    console.log(ticketIdArray)
    const token = this.token;
    console.log(token)
    this.approveTicket({"ticketIDs": ticketIdArray}, this.token);

    setTimeout(function () {
      window.location.reload(true);
    }, 5000);

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
            <h4 class="MuiTypography-root makeStyles-title-7 MuiTypography-h6">Open Tickets</h4>
          </div>
          <div>
            <EnhancedTable tableType="tickets" tableData={this.props.data.data} store={this.approveTicketFromDT} approveTicket={this.props.approveTicket} token={this.props.history}/>
          </div>
        </div>
      )}
      </div>
    );
  }
}

TicketsView.propTypes = {
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
)(TicketsView);
