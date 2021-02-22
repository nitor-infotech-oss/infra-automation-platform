import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import $ from 'jquery';
import * as actionCreators from '../../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  dispatchNewRoute(route) {
    this.props.history.push(route);
    this.setState({ open: false });
  }

  handleClickOutside() {
    this.setState({ open: false });
  }

  logout(e) {
    e.preventDefault();
    this.props.logoutAndRedirect(this.props.history);
    this.setState({ open: false });
  }

  openNav() {
    if(this.state.open == false){
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }

  render() {
    console.log("this.props.isAuthenticated")
    console.log(this.props.isAuthenticated)
    console.log(this.setState.loaded)
    // LoadJQuery()
    return (
      <header>
        <div class="menubar">
          <LeftNav id="menu-bar-parent-el" open={this.state.open}>
          <Menu id="menu-bar-chlid">
            {!this.props.isAuthenticated ? (
              <div class="custom-sidebar">
                <MenuItem onClick={() => this.dispatchNewRoute('/login')}>Login</MenuItem>
                <MenuItem onClick={() => this.dispatchNewRoute('/register')}>Register</MenuItem>
              </div>
            ) : (
              <div class="custom-sidebar">
                <div id="user-id" value={ this.props.isAuthenticated } hidden>
                </div>
                <MenuItem onClick={() => this.dispatchNewRoute('/raise_ticket')}>Create New Ticket</MenuItem>
                <Divider />
                <MenuItem onClick={() => this.dispatchNewRoute('/tickets')}>Open Tickets</MenuItem>
                <Divider />
                <MenuItem onClick={() => this.dispatchNewRoute('/alltickets')}>Approved Tickets</MenuItem>
                <Divider />
                <MenuItem onClick={() => this.dispatchNewRoute('/mytickets')}>My Tickets</MenuItem>
                <Divider />
                <MenuItem onClick={() => this.dispatchNewRoute('/healthcheck')}>Health Check</MenuItem>
                <Divider />
              </div>
            )}
            </Menu>
          </LeftNav>
        </div>
        <div class="appbar">
          <AppBar
            title="Nitor Help Desk"
            onClick={e => this.openNav()}
            iconElementRight= {!this.props.isAuthenticated ? (
              <div></div>
            ) : (
                <FlatButton label="Log Out" onClick={e => this.logout(e)} />
            )}
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logoutAndRedirect: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

function mapStateToProps(state) {
  return { token: state.auth.token, userName: state.auth.userName, isAuthenticated: state.auth.isAuthenticated };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
