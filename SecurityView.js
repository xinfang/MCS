'use strict';
// var React = require('react');
// var ReactNative = require('react-native');
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Alert,
AppRegistry,
  TextInput,
  StyleSheet,
  Navigator,
  BackAndroid,
} from 'react-native'


// var {
//   Image,
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ViewPagerAndroid,
//   ListView,
//   TouchableOpacity,
//   TouchableHighlight,
//   Navigator,
//   BackAndroid,
// } = ReactNative;

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

var _navigator ;

// var imageUrls = [
//   'https://img.alicdn.com/bao/uploaded/i3/TB1vkdZKFXXXXaAXVXXXXXXXXXX_!!0-item_pic.jpg',
//   'https://img.alicdn.com/bao/uploaded/i5/TB1CGo3KXXXXXb6XpXXYXGcGpXX_M2.SS2',
//   'https://img.alicdn.com/bao/uploaded/i1/TB1jkifKVXXXXXhXXXXXXXXXXXX_!!0-item_pic.jpg',
//   'https://img.alicdn.com/bao/uploaded/i2/TB1GCgoKVXXXXcaXpXXXXXXXXXX_!!0-item_pic.jpg',
//   'https://img.alicdn.com/bao/uploaded/i1/TB1D6A7KVXXXXaQXVXXXXXXXXXX_!!0-item_pic.jpg',
// ]

var SecurityView = React.createClass({
  getInitialState: function() {
    _navigator = this.props.navigator;
    return {
      security:this.props.route.security
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
        <Text>{this.state.security.Name}</Text>
        </View>
      </View>
    );
  }
});

module.exports = SecurityView;
//AppRegistry.registerComponent('SecurityView', () => SecurityView);
//export default SecurityView

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    backgroundColor: '#DDDDDD'
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});
