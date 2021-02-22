import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router';
import * as actionCreators from '../../actions/ticket_ops';
import $ from 'jquery';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.state                = {OSelectedValue: 'Linux', envSelectedValue: 'Cloud', platformValue: 'AWS', storageValue: 100};
    this.handleChange         = this.handleChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleEnvSelectValue = this.handleEnvSelectValue.bind(this);
    this.handleStorageChange  = this.handleStorageChange.bind(this);
    this.handleRamButtonClick = this.handleRamButtonClick.bind(this);
    this.handlePlatformSelectValue = this.handlePlatformSelectValue.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleStorageChange(event) {
    this.setState({storageValue: event.target.value});
  }

  handleSubmit(event) {
    console.log("Inside Create")
    let ramSize = $('#ramSize > button.active').val()
    if(!ramSize){
      ramSize = ''
    }
    this.state = {
          OSelectedValue:   $('#os').val(),
          envSelectedValue: $('#formEnv:checked').val(),
          platformValue:    $('#platform').val(),
          region:           $('#region').val(),
          instanceType: $('#instanceType').val(),
          instanceName: $('#instanceName').val(),
          machineUsername: $('#machineUsername').val(),
          imageId: $('#imageId').val(),
          ramSize: ramSize,
          storageSize: $('#storageSize').val(),
          token: this.props.history,
          description: $('#description').val()
        };
    console.log(this.state, this.props)
    this.props.createNewTicket(this.state, this.props.history);
    event.preventDefault();
  }

  handleRamButtonClick(event){
    $($('button.active')).removeClass('active')
    $(event.target).addClass("active");
    this.setState({ramSize: event.target.value});
    console.log(this.state.ramSize)
  }

  handlePlatformSelectValue(event) {
    console.log(event)
    console.log("Platform Select Event")
    this.setState({platformValue: event.target.value});
    console.log(this.state.platformValue)
  }

  handleEnvSelectValue(event) {
    console.log(event)
    console.log("Envoiroment Select Event")
    this.setState({envSelectedValue: event.target.value});
    console.log(this.state.envSelectedValue)
  }

  handleOSSelectValue(event) {
    alert('A name was submitted: ' + this.state.OSelectedValue);
    event.preventDefault();
  }

  handleVMTypeSelectValue(event) {
    alert('A name was submitted: ' + this.state.VMTypeselectedValue);
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={ this.handleSubmit }>
      <fieldset>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={3}>
            Envoiroment
          </Form.Label>
          <Col sm={3}>
            <Form.Check
              type="radio"
              label="Cloud"
              checked={this.state.envSelectedValue === 'Cloud'}
              value="Cloud"
              name="formHorizontalRadios"
              id="formEnv"
              onChange={this.handleEnvSelectValue}
            />
          </Col>
          <Col sm={3}>
          <Form.Check
            inline
            type="radio"
            label="On Premise"
            name="formHorizontalRadios"
            id="formEnv"
            value="On Premise"
            checked={this.state.envSelectedValue === 'On Premise'}
            onChange={this.handleEnvSelectValue}
          />
          </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
        Select OS
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="os" as="select">
            <option id="Windows" >Windows</option>
            <option id="Linux" >Linux</option>
          </Form.Control>
          </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Platform
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="platform" as="select" disabled={ this.state.envSelectedValue!='Cloud' ? true : false } onChange={this.handlePlatformSelectValue}>
            <option id="AWS">AWS</option>
            <option id="Azure">Azure</option>
            <option id="GCP">GCP</option>
          </Form.Control>
          </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Instance Type
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="instanceType" as="select" disabled={ this.state.envSelectedValue!='Cloud' || this.state.platformValue !='AWS' ? true : false }>
            <option>t2.micro</option>
            <option>t2.small</option>
            <option>t2.large</option>
          </Form.Control>
          </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Region
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="region" as="select" disabled={ this.state.envSelectedValue!='Cloud' || this.state.platformValue !='AWS' ? true : false }>
            <option>us-east-1</option>
            <option>us-east-2</option>
            <option>us-west-1</option>
            <option>us-west-2</option>
          </Form.Control>
          </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Instance Name
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="instanceName" type="input" placeholder="Enter name of instace" disabled={ this.state.envSelectedValue =='On Premise' || this.state.platformValue =='AWS' ? false : true } required={true}/>
          </Col>
      </Form.Group>

      <Form.Group hidden as={Row}>
        <Form.Label as="legend" column sm={3}>
          Image Id
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="imageId" type="input" placeholder="Enter Name of Machine" disabled={ this.state.envSelectedValue!='Cloud' ? true : false }/>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Machine Username
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="machineUsername" type="input" placeholder="Enter username used for machine" disabled={ this.state.envSelectedValue!='Cloud' || this.state.platformValue !='Azure' ? true : false }/>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Other Installations
        </Form.Label>
        <Col sm={1}>
          <Form.Control class="installation checkbox" style={{ width: 20 }} id="java-installation" type="checkbox" placeholder="Enter name of instace" disabled={ this.state.envSelectedValue =='On Premise' ? false : true }/>
        </Col>
        <Col sm={2}>
          <p style={{ marginLeft: -30, marginTop: 7}}>7-Zip</p>
        </Col>
        <Col sm={1}>
          <Form.Control class="installation checkbox" style={{ width: 20 }} id="java-installation" type="checkbox" placeholder="Enter name of instace" disabled={ this.state.envSelectedValue =='On Premise' ? false : true }/>
        </Col>
        <Col sm={2}>
          <p style={{ marginLeft: -30, marginTop: 7}}>Python</p>
        </Col>
    </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          RAM Size
        </Form.Label>
        <Col sm={9}>
          <ButtonToolbar  className="mb-3" aria-label="Toolbar with Button groups">
            <ButtonGroup id="ramSize" className="mr-2" aria-label="First group">
              <Button onClick={ this.handleRamButtonClick } disabled={ this.state.envSelectedValue=='Cloud' ? true : false } variant="info" value="2">2</Button>{' '}
              <Button onClick={ this.handleRamButtonClick } disabled={ this.state.envSelectedValue=='Cloud' ? true : false } variant="info" value="4">4</Button>{' '}
              <Button onClick={ this.handleRamButtonClick } disabled={ this.state.envSelectedValue=='Cloud' ? true : false } variant="info" value="8">8</Button>{' '}
              <Button onClick={ this.handleRamButtonClick } disabled={ this.state.envSelectedValue=='Cloud' ? true : false } variant="info" value="16">16</Button>
              <Button onClick={ this.handleRamButtonClick } disabled={ this.state.envSelectedValue=='Cloud' ? true : false } variant="info" value="32">32</Button>
              <Button onClick={ this.handleRamButtonClick } disabled={ this.state.envSelectedValue=='Cloud' ? true : false } variant="info" value="64">64</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Storage Size
        </Form.Label>
        <Col sm={8}>
          <Form.Control disabled={ this.state.envSelectedValue=='Cloud' ? true : false } id="storageSize" type="range" min="0" max="1000" step = "10" value={this.state.storageValue} onChange={this.handleStorageChange} />
        </Col>
        <Col sm={1}>
          { this.state.storageValue } GB
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Comments
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="description" as="textarea"  required={true}/>
        </Col>
      </Form.Group>

      <Button type="submit">Create Ticket</Button>

      </Form>
    );
  }
}



TicketForm.propTypes = {
  handleChange: PropTypes.func,
  createNewTicket: PropTypes.func
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TicketForm)
);
