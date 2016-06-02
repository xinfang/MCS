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
  AsyncStorage,
  BackAndroid,
} from 'react-native'

var Api = require('./App/Network/Api');

var STORAGE_KEY = '@AsyncStorageNumber:key';
class SecurityQuoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       securityID:props.securityID,
       quote:[],
       numberOfShares:"11",
       valuation:""
     };
  }

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({numberOfShares: value});
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  componentDidMount() {
       this._loadInitialState().done();
       this.getQuote(this.props.securityID,"");
  }

 _onTyping(text: Object) {
   try {
     AsyncStorage.setItem(STORAGE_KEY, text.text);
   } catch (error) {
     console.log('AsyncStorage error: ' + error.message);
   }
   this.setState({
     numberOfShares: text.text,
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
    return <View>
        <View style={styles.quote}>
            <View style={styles.dataCell}>
              <Text style={styles.labelText}>Current Price</Text>
              <Text style={styles.valueText}>${this.state.quote.Price}</Text>
              <Text style={styles.precentText}>${this.state.quote.PriceChange}|${this.state.quote.PercentChange}%</Text>
           </View>
           <View style={styles.spaceCell}></View>
           <View style={styles.dataCell}>
             <Text style={styles.labelText}>Nameber of Shares</Text>
             <TextInput
                ref='numberofShares'  style={styles.input}
                value={this.state.numberOfShares}
                onChangeText={(text) => this._onTyping({text})}
               />
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
    </View>;
  }
}

module.exports = SecurityQuoteView;

var styles = StyleSheet.create({
  nameText: {
     fontFamily: 'UniversNextforMORN-CnBd',
     fontSize: 14,
     color: 'black',
     height: 25,
     textAlign: 'left'
  },
  input: {
      //backgroundColor:'red',
      height:45,
      fontFamily: 'UniversNextforMORN-CnLt',
      borderWidth:1,
      borderColor:'#ccc',
      textAlign:'left',

    },
  quote: {
     flex:1,
     flexDirection: 'row',
     paddingBottom:5,
     paddingTop:5,
  },
  dataCell: {
    flex: 0.5,
    height: 60
  },
  spaceCell: {
    width:24,
  },
  editIcon: {
    width: 10,
    height: 10
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
  }



});
