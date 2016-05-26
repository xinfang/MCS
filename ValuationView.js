'use strict';
// var React = require('react');
// var ReactNative = require('react-native');
import React, { Component } from 'react';
import PageControlIOS from 'react-native-pagecontrol';
import {
  Image,
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  Navigator,
  TouchableHighlight,
  TouchableElement,
  TouchableWithoutFeedback,
  BackAndroid,
} from 'react-native'

var Api = require('./App/Network/Api');


class ValuationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       securityID:props.securityID,
       valuation:""
     };
  }

  componentDidMount() {
       this.getAnalystReport(this.props.securityID,"");
  }

  getAnalystReport(query, option) {
       if(!query.trim()) {
         return;
       }
       var that = this;
       Api.getAnalystReport(query, function(data) {
         that.setState({
           valuation:data.analysis.valuation
         });
       });
  }

  render() {
    return <View><Text style={styles.valuationText}>{this.state.valuation}</Text></View>;
  }
}

module.exports = ValuationView;

var styles = StyleSheet.create({
  valuationText: {
    fontFamily: 'UniversNextforMORN-CnLt',
    fontSize: 16,
    color: 'black',
    textAlign: 'left'
  }
});
