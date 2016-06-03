'use strict';

import React, { Component } from 'react';
import Modal from 'react-native-root-modal';

import {
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
    Svg,
    Rect,
    G,

    ClipPath,
    Path,
    Defs
} from 'react-native-svg';

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

          <View style={styles.popView}>
              <View style={{flex: 0.3,alignItems:'flex-end'}}>
                <Svg  width="96.14460678118655" height="59">
                  <G transform="translate(1.7071067811865475,0.5)">
                    <Path fill="none" stroke="red" scaleX="1" scaleY="-1" y="59" x="0" strokeWidth="1" d="M0 0 H88.9375 Q92.9375 0 92.9375 4 V54  Q92.9375 58 88.9375 58 H11 Q7 58 7 54 V7 L0 0Z" transform="translate(0,0)"></Path>
                 </G>
                </Svg>
                </View>
                <View style={{flex: 0.4,alignItems:'center'}}>
                <Svg  width="96.14460678118655" height="59">
                  <G transform="translate(1.7071067811865475,0.5)">
                    <Path fill="none" stroke="red" scaleX="1" scaleY="-1" y="59" x="0" strokeWidth="1" d="M0 0 H88.9375 Q92.9375 0 92.9375 4 V54  Q92.9375 58 88.9375 58 H11 Q7 58 7 54 V7 L0 0Z" transform="translate(0,0)"></Path>
                 </G>
                </Svg>
                </View>
                <View style={{flex: 0.3,alignItems:'flex-start'}}>
                  <Svg  width="96.14460678118655" height="59">
                    <G transform="translate(1.7071067811865475,0.5)">
                      <Path fill="none" stroke="red" scaleX="1" scaleY="-1" y="59" x="0" strokeWidth="1" d="M0 0 H88.9375 Q92.9375 0 92.9375 4 V54  Q92.9375 58 88.9375 58 H11 Q7 58 7 54 V7 L0 0Z" transform="translate(0,0)"></Path>
                   </G>
                  </Svg>
               </View>
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

         <View style={styles.yearView}>
            <Text>Year</Text>
         </View>

         <View style={styles.yearView}>
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
  popView: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height:70,
    flexDirection: 'row',
  },
  iconView: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height:50,
    flexDirection: 'row',
  },
  yearView: {
    flex:1,
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
