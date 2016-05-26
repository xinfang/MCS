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
  WebView,
  BackAndroid,
} from 'react-native'

var Api = require('./App/Network/Api');
var Button = require('react-native-button');

var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';
var BGWASH = 'rgba(255,255,255,0.8)';


var _navigator ;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

class AnalystReportView extends React.Component {
  constructor(props) {
    _navigator = props.navigator;
    super(props);
    this.state = {
       securityID:props.route.securityID,
       valuation:""
     };
  }

  _handleClick() {
    _navigator.pop();
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.heading}>
            <View>
              <Text style={styles.titleText}>Morningstars Task</Text>
            </View>
            <View style={styles.close}>
                <Button
                style={styles.closeButton}
                onPress={this._handleClick}
                >
                Close
              </Button>
            </View>
          </View>

          <View style={{height:1, backgroundColor: 'grey',}} />

          <WebView
          style={{
            backgroundColor: BGWASH,
            height: 440,
          }}
          source={{uri: 'https://mobadv.morningstar.com/service/1.0/locales/en-US/products/RT/securities/USA:IBM/news/743724'}}
          scalesPageToFit={this.state.scalingEnabled}
          />

      </View>
    )
  }
}

module.exports = AnalystReportView;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin:5,
  },
  heading: {
    flex:1,
    flexDirection: 'row',
    alignItems:'flex-start',
  },
  titleText: {
    marginBottom:5,
    fontFamily: 'UniversNextforMORN-CnLt',
    fontSize: 24,
    color: 'black',
    textAlign: 'left',
  },
  close: {
    flex: 1,
    alignItems:'flex-end',
  },
  closeButton: {
    marginTop:5,
    fontFamily: 'UniversNextforMORN-CnLt',
    fontSize: 16,
    color: 'blue',
    textAlign: 'right',
  },
  webView: {
     backgroundColor: BGWASH,
     height: 350,
  }

});
