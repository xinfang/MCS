'use strict';

import React, { Component } from 'react';
import Modal from 'react-native-root-modal';

import {
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native';

var Api = require('./App/Network/Api');

class EconomicMoatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       securityID:props.securityID,
       valuation:""
     };
  }

  render() {
    return (
        <View style={styles.container}>
          <View >
             <Text>Chart1</Text>
          </View>
          <View  style={styles.iconView}>
             <View style={{flex: 0.3,alignItems:'flex-end'}}>
              <Image style={styles.smallIcon} source={require('./resources/moat-wide-27x27.png')} />
             </View>
             <View style={{flex: 0.4,alignItems:'center'}}>
              <Image style={styles.LagreIcon} source={require('./resources/moat-narrow-50x50.png')} />
             </View>
             <View style={{flex: 0.3,alignItems:'flex-start'}}>
              <Image style={styles.smallIcon} source={require('./resources/moat-none-27x27.png')} />
            </View>
         </View>
         <View>
         <Text>Year</Text>
         </View>
         <View>
           <View style={styles.bar}>
           </View>
           <View style={styles.circle}></View>
         </View>
         <View>
         <Text>99.22</Text>
         </View>
       </View>
    )
  }
}

module.exports = EconomicMoatView;
var styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      //margin: 5,
      //backgroundColor:'black',
  },
  iconView: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height:50,
    flexDirection: 'row',
  },
  smallIcon: {
    width: 27,
    height: 27,
  },
  LagreIcon: {
    width: 50,
    height: 50,
  },
  circle: {
    top:-7,

    left:50,
    height: 8,
    width: 8,
    backgroundColor:'black',
    borderRadius: 5,
  },
  bar: {
    flex:1,
    alignSelf: 'center',
    borderRadius: 12,
    height: 5,
    width:300,
    justifyContent:"center",

    marginRight: 5,
    backgroundColor:'grey',
  },
});
