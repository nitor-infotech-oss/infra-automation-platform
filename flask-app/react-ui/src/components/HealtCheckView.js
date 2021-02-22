import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

class HealtCheckView extends Component {
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchProtectedData(token);
    console.log("fetchData from Protected View - ", token)
  }

  render() {
    return (
      <div>
        {!this.props.loaded ? (
          <h1>Loading data...</h1>
        ) : (
          <div>
              <iframe src="http://10.11.26.219:5805/app/kibana#/dashboard/81b69500-d002-11ea-b593-777dc86d0277?embed=true&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:9,i:'3662d479-5a40-4145-9f8a-25b8cafe7cb6',w:20,x:1,y:0),id:ac0960c0-cffe-11ea-b593-777dc86d0277,panelIndex:'3662d479-5a40-4145-9f8a-25b8cafe7cb6',type:visualization,version:'7.7.0'),(embeddableConfig:(),gridData:(h:9,i:'44928fed-25e7-4b5e-82cf-28e72e601764',w:19,x:21,y:0),id:'77f75750-cfff-11ea-b593-777dc86d0277',panelIndex:'44928fed-25e7-4b5e-82cf-28e72e601764',type:visualization,version:'7.7.0'),(embeddableConfig:(),gridData:(h:8,i:'7c48447c-96f7-4b33-af22-7f57c8d17765',w:20,x:1,y:9),id:'81911d90-d000-11ea-b593-777dc86d0277',panelIndex:'7c48447c-96f7-4b33-af22-7f57c8d17765',type:visualization,version:'7.7.0')),query:(language:kuery,query:''),timeRestore:!f,title:'Final%20VM%20Combine%20Dashboard',viewMode:view)&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))" height="600" width="105%"></iframe>
          </div>
        )}
      </div>
    );
  }
}

HealtCheckView.propTypes = {
  fetchProtectedData: PropTypes.func,
  loaded: PropTypes.bool,
  userName: PropTypes.string,
  userID: PropTypes.string,
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
)(HealtCheckView);
