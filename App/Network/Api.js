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
     var url = 'https://mobileservice.morningstar.com/service_p2/1.0/products/MCS/securities/search/' + query;
     return this.doRequest(url, callback);
  },

  getSecurity: function(query, callback) {
    var url = 'https://mobdev.morningstar.com/service_p2/1.0/products/MCS/securities/' + query;
    return this.doRequest(url, callback);
  },
  getSecurityQuote: function(query, callback) {
    var url = 'https://mobdev.morningstar.com/service_p2/1.0/products/MCS/securities/' + query + '/quote'
    return this.doRequest(url, callback);
  },
  getAnalystReport: function(query, callback) {
    var url = 'https://mobdev.morningstar.com/service_p2/1.0/products/MCS/securities/' + query + '/stub_analyst_report'
    return this.doRequest(url, callback);
  }
};

module.exports = Api;

//https://mobadv.morningstar.com/service/1.0/locales/en-US/products/RT/securities/USA:IBM/news/743724

//https://mobdev.morningstar.com/service_p2/1.0/products/MCS/securities/0P000000GY
///service_p2/1.0/products/MCS/securities/0P0000ZOQ0/stub_analyst_report
