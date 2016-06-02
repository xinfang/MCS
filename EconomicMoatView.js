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
        <View>
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
       </View>
    )
  }
}

module.exports = EconomicMoatView;
var styles = StyleSheet.create({
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
  }
});
