'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
   Alert,
} = ReactNative;

var myHeaders = new Headers();

var Api = {
  doRequest: function(url, callback) {
    fetch(url, {headers: myHeaders})
    .then((response) => response.json())
    //  .then((responseData) => {
    //     console.log(responseData.movies);
    //     //Alert.alert(responseData.movies);
    //   })
   .then(function(ret) {
     callback && callback(ret);
   })
    .catch((err) => {
      console.log(err);
      return callback && callback(false);
    })
    .done();
  },

  getSearchSecurities: function(query, callback) {
  //    var url = 'https://mobdev.morningstar.com/service_p2/1.0/products/MCS/securities/search/fb?no_token'
    var url = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
    return this.doRequest(url, callback);
  }
};

module.exports = Api;
