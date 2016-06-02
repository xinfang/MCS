'use strict';

import React, { Component } from 'react';
import Modal from 'react-native-root-modal';

import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import {
    Svg,
    Circle,
    Rect,
    G,
    Text,
    ClipPath,
    Path,
    Polygon,
    Defs,
    Line
} from 'react-native-svg';

var Api = require('./App/Network/Api');

class ValuationCapsuleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       securityID:props.securityID,
       rotation: 122,
       valuation:""
     };
  }
  scaleFn(n) {
    if (this.state.rotation < n) {
      return this.state.rotation / n;
    } else {
      return 1;
    }
  }
  render() {
    return (
         <View style={styles.container}>
           <View style={styles.mainChart}>
           <Svg height="240" width="30">
            <G clipPath="url(#capsuleclip2)">
            <Rect ref="segment" x="0" y="0" width="30" height="53.99999999999999" fill="#FFC8A6"/>
            <Rect ref="segment" x="0" y="53.99999999999999" width="30" height="48.00000000000002" fill="#FFDCC6"/>
            <Rect ref="segment" x="0" y="102.00000000000001" width="30" height="35.999999999999986" fill="#E6EFEE"/>
            <Rect ref="segment" x="0" y="138" width="30" height="30" fill="#C5E4F6"/>
            <Rect ref="segment" x="0" y="168" width="30" height="72" fill="#A5D7F1"/>
            </G>
            <Rect x="0.5" y="0.5" rx="19.5" width="29" height="239" stroke="#333" stroke-width="1" fill="none"/>
             <G>
               <Circle ref="lastCloseDot" cx="15" cy="113.26689655172413" r="6.5" stroke="none" fill="#000"/>
               <Circle ref="fvCircle" cx="15" cy="120.5" r="8" stroke="#EC1C24" stroke-width="1" fill="none"/>
             </G>
             <Defs>
               <ClipPath id="capsuleclip2">
                 <Rect  x="0" y="0" rx="20" width="30" height="240"/>
               </ClipPath>
             </Defs>
            </Svg>

          </View>
        <View style={styles.secondChart} >
          <View style={styles.upChart}>
              <Svg viewBox="0 0 96.14460678118655 59" width="96.14460678118655" height="59">
               <G>
                  <Path fill="none" stroke="#f00" stroke-width="1" d="M1.7071068286895752,58.5L90.64460754394531,58.5Q94.64460754394531,58.5,94.64460754394531,54.5L94.64460754394531,4.5Q94.64460754394531,0.5,90.64460754394531,0.5L12.707106590270996,0.5Q8.707106590270996,0.5,8.707106590270996,4.5L8.707106590270996,51.5L1.7071068286895752,58.5Z" transform="translate(0,58) scale(1,-1)"></Path>
               </G>
                <G transform="translate(15.707106781186548,3.5)">
                <Text
                  fill="#000"
                  fontFamily="UniversNextforMORN-CNLt"
                  fontSize="14"
                  fontWeight="bold"
                  x="15"
                  y="10"

                >Fair Value</Text>
                <Text
                  fill="red"
                  fontFamily="UniversNextforMORN-CNBd"
                  fontSize="14"
                  fontWeight="bold"
                  x="15"
                  y="30"
                >99.99</Text>
                </G>

               </Svg>
           </View>
           <View  style={styles.downChart}>
             <Svg  width="96.14460678118655" height="59">
               <G transform="translate(1.7071067811865475,0.5)">
                  <Path fill="none" stroke="#000" stroke-width="1" d="M0 0 H88.9375 Q92.9375 0 92.9375 4 V54  Q92.9375 58 88.9375 58 H11 Q7 58 7 54 V7 L0 0Z" transform="translate(0,0)"></Path>
               </G>
               <G transform="translate(15.707106781186548,3.5)">
                    <Text
                      transform="translate(0,0)"
                      fill="#000"
                      fontFamily="UniversNextforMORN-CNLt"
                      fontSize="14"
                      fontWeight="bold"
                      x="15"
                      y="10"

                    >Last Close</Text>
                    <Text
                      transform="translate(0,0)"
                      fill="red"
                      fontFamily="UniversNextforMORN-CNBd"
                      fontSize="14"
                      fontWeight="bold"
                      x="15"
                      y="30"
                    >160.00</Text>
               </G>

            </Svg>
          </View>
        </View>
        <View style={styles.thirdChart}>

              <Image style={styles.fairIcon} source={require('./resources/capsule-legend-stars-43x52.png')} />

        </View>
      </View>

    )
  }
}

module.exports = ValuationCapsuleChart;

var styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      //margin: 5,
      //backgroundColor:'black',
  },
  mainChart: {
    flex:1,
    alignItems: 'flex-end',
    //backgroundColor:'blue',
    // transform: [
    //     {scale: 1},
    //     // {translateY: -40},
    //     // {scaleX: 1},
    //     // {scaleY: -1}
    //   ],
  },
  secondChart: {
    position: 'relative', top: 50, left: 0, marginLeft: 0,  flexDirection: 'column',
    //backgroundColor:'green',

  },
  thirdChart: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    //backgroundColor:'green',

  },
  upChart: {
    height:60,
    width:100,
    //backgroundColor:'blue',
    transform: [
        {translateX: -1.5},
        // {translateY: -40},
        // {scaleX: 1},
        // {scaleY: -1}
      ],
  },
  downChart: {
    height:60,
    width:100,
    //backgroundColor:'grey',
  },

  textTransform: {
    //backgroundColor:'blue',
    transform: [
        {translateX: 30},
        // {translateY: -40},
        // {scaleX: 1},
        // {scaleY: -1}
      ],
  },
  fairIcon: {
      width: 43, height: 52
  }

  // myrotate: {
  //   // transform: [
  //   //   {translateX: 0},
  //   //   {translateY: -40},
  //   //   {scaleX: 1},
  //   //   {scaleY: -1}
  //   // ],
  // }

});
