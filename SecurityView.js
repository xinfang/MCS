'use strict';
// var React = require('react');
// var ReactNative = require('react-native');
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  Navigator,
  BackAndroid,
} from 'react-native'

var Api = require('./App/Network/Api');

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
class SecurityView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      security:props.route.security,
      date:new Date(),
      securityData:[],
      quote:[]
    };
    this.doSearch(props.route.security.PerformanceId,"");
    this.getQuote(props.route.security.PerformanceId,"");
  }

  doSearch(query, option) {
    if(!query.trim()) {
      return;
    }
    var that = this;
    Api.getSecurity(query, function(data) {
      that.setState({
        securityData:data[0]
      });
    });
  }
  getQuote(query, option) {
    if(!query.trim()) {
      return;
    }
    var that = this;
    Api.getSecurityQuote(query, function(data) {
      that.setState({
        quote:data[0]
      });
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
            <View style={styles.ticketCell}>
              <Text style={styles.ticketText}>{this.state.security.RegionAndTicker.split(':')[1]} | <Text style={styles.ratingText}>QQQ</Text></Text>
            </View>
            <View style={styles.ratingCell}>
              <Text style={styles.ratingText}>QQQ</Text>
            </View>
            <View style={styles.helpCell}>
               <Image style={styles.icon} source={require('./resources/icon-help-grey3.png')} />
            </View>
        </View>
        <View style={styles.fullName}>
            <Text style={styles.nameText}>{this.state.security.Name}</Text>
        </View>

        <View style={{height:2, backgroundColor: '#000000'}} />

        <View style={styles.quote}>
            <View style={styles.dataCell}>
              <Text style={styles.labelText}>Current Price</Text>
              <Text style={styles.valueText}>${this.state.quote.Price}</Text>
              <Text style={styles.precentText}>${this.state.quote.PriceChange}|${this.state.quote.PercentChange}%</Text>
           </View>
           <View style={styles.spaceCell}></View>
           <View style={styles.dataCell}>
             <Text style={styles.labelText}>Nameber of Shares</Text>
          </View>
          <View style={styles.iconCell}>
             <Image style={styles.editIcon} source={require('./resources/icon-edit-grey3.png')} />
          </View>
        </View>

        <View style={styles.quote}>
          <View style={{flex:0.5,height:1, backgroundColor: '#000000'}} />
          <View style={styles.spaceCell}></View>
          <View style={{flex:0.5,height:1, backgroundColor: '#000000'}} />
          <View style={{width:50,height:1, backgroundColor: '#000000'}} />
        </View>



        <View style={styles.quote}>
            <View style={styles.dataCell}>
              <Text style={styles.labelText}>Market Value</Text>
           </View>
           <View style={styles.spaceCell}></View>
           <View style={styles.dataCell}>
             <Text style={styles.labelText}>Fair Value of Shares</Text>
          </View>
          <View style={styles.iconCell}>
              <Image style={styles.editIcon} source={require('./resources/icon-edit-grey3.png')} />
          </View>
        </View>

        <View style={{height:2, backgroundColor: '#000000'}} />



        <View style={styles.priceFair}>
            <Text style={styles.labelText}>Price vs. Fair Value <Text style={styles.dateText}>12 May 2016</Text></Text>
       </View>


      </View>
    );
  }
};

// <View style={styles.ratingCell}>
//   <Text style={styles.ratingText}>
//     QQQ
//   </Text>
// </View>
module.exports = SecurityView;

var styles = StyleSheet.create({
  container: {
    marginLeft:5,
    marginRight:5,
    flexDirection: 'column'
  },
  heading: {
    marginTop:10,
    flex:1,
    flexDirection: 'row',
    alignItems:'flex-start',
    //backgroundColor:'red'
  },
  fullName: {
     flex:1,
     //backgroundColor:'#ffffff'
  },

  ticketCell: {
    width: 60,
    //backgroundColor:'#ff0000',
    height: 30
  },
  ratingCell: {
    width: 100,
    //backgroundColor:'#ffffff',
    height: 25
  },
  helpCell: {
    flex: 1,
    paddingTop:10,
    alignItems:'flex-end',
    //backgroundColor:'#ffaaaf',
    height: 30
  },
  ticketText: {
     fontFamily: 'UniversNextforMORN-CnLt',
     fontSize: 24,
     color: 'black',
     textAlign: 'left'
  },

  ratingText: {
     fontFamily: 'MorningstarSymbols',
     fontSize: 24,
     color: 'black',
     textAlign: 'left'
  },

  nameText: {
     fontFamily: 'UniversNextforMORN-CnBd',
     fontSize: 14,
     color: 'black',
     height: 25,
     textAlign: 'left'
  },

  quote: {
     flex:1,
     flexDirection: 'row',
     //backgroundColor:'#ffffff'
  },
  dataCell: {
    flex: 0.5,
    //backgroundColor:'#ffaaaf',
    height: 60
  },
  spaceCell: {
    width:24,
    //backgroundColor:'green',
    //height: 60
  },
  iconCell: {
    paddingTop:5,
    paddingLeft:5,
    width:20,
    alignItems:'flex-end',

    height: 30
  },

  labelText: {
     fontFamily: 'UniversNextforMORN-CnBd',
     fontSize: 12,
     color: 'black',
     textAlign: 'left'
  },
  valueText: {
     fontFamily: 'UniversNextforMORN-CnLt',
     fontSize: 14,
     color: 'black',
     textAlign: 'left'
  },
  precentText: {
     fontFamily: 'UniversNextforMORN-CnLt',
     fontSize: 12,
     color: 'green',
     textAlign: 'left'
  },
  dateText: {
     fontFamily: 'UniversNextforMORN-CnLt',
     fontSize: 12,
     color: 'green',
     textAlign: 'left'
  },

  priceFair: {
     flex:1,
     backgroundColor:'#ffcccc'
  },

  icon: {
    width: 20,
    height: 20
  },
  editIcon: {
    width: 10,
    height: 10
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

//http://codepen.io/johnnyo/pen/BoKbpb
