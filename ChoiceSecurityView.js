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

var selctedSecurity;
class AnalystReportView extends React.Component {
  constructor(props) {
    _navigator = props.navigator;
    selctedSecurity = props.route.security
    super(props);
    this.state = {
       security:props.route.security
     };
  }

  onBack() {
    _navigator.pop();
  }

  onSelectedSecurity() {
    _navigator.push({title:'SecurityView',id:'detail',security:selctedSecurity});
  }

  render() {
    return (
        <View style={styles.container}>
            <View>
              <Text style={styles.titleText}>Your selected compnay stock is:</Text>
            </View>
            <View>
              <Text style={styles.titleText}>{this.state.security.RegionAndTicker.split(":")[1]}</Text>
            </View>
            <View>
              <Text style={styles.titleText}>{this.state.security.Name}</Text>
            </View>
            <View>
              <Text style={styles.noteText}>This is the last chance to change you stock</Text>
            </View>
            <View style={{height:1, backgroundColor: 'grey',}} />

          <View style={styles.quote}>
              <View style={styles.buttoncontainer}>
                <View>
                <TouchableHighlight onPress={this.onBack}>
                  <View style={[styles.button, this.state.active ? styles.activeButton: {} ]}>
                    <Text style={[styles.buttonText, this.state.active ? styles.activeText: {}]}>Change</Text>
                  </View>
                </TouchableHighlight>
                </View>
                <View>
                <TouchableHighlight onPress={this.onSelectedSecurity}>
                  <View style={[styles.button, this.state.active ? styles.activeButton: {} ]}>
                    <Text style={[styles.buttonText, this.state.active ? styles.activeText: {}]}>Next</Text>
                  </View>
                </TouchableHighlight>
                </View>
              </View>
          </View>
      </View>
    )
  }
}

module.exports = AnalystReportView;

var styles = StyleSheet.create({
  container: {
      flex: 1,
    justifyContent: 'center',
     alignItems:'center',

    margin:5,
  },

  titleText: {
    marginBottom:5,
    fontFamily: 'UniversNextforMORN-CnLt',
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  noteText: {
    marginBottom:5,
    fontFamily: 'UniversNextforMORN-CnLt',
    fontSize: 18,
    color: 'grey',
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
  buttoncontainer: {
      paddingTop: 10, flex: 1, alignItems: 'center',flexDirection: 'row',justifyContent: 'space-around',
  }
  ,
  button: {
      flex:1, flexDirection:'row', justifyContent: 'center', alignItems:'center', width: 100, height: 30, borderColor:'grey', borderWidth:1, borderRadius:15, backgroundColor: 'white', shadowColor: "#57c6fa", shadowOffset: {
          width: 2, height: 2
      }
      ,
      shadowOpacity:0.5,
      shadowRadius:5,
  }
  ,
  buttonText: {
      padding: 5, marginTop: 5, color: "grey", fontFamily: 'UniversNextforMORN-CnLt',
  }
  ,
  activeButton: {
      //backgroundColor:"#00afc7",
  }
  ,
  activeText: {
      color: "grey", fontWeight: 'bold', fontFamily: 'UniversNextforMORN-CnLt',
  }

});
