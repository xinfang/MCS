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


class ValuationCapsuleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       securityID:props.securityID,
       valuation:""
     };
  }
  _handleClick() {

  }

  render() {
    return (
      <ScrollView style={[this.state.showLogin]}>

          <View style={styles.fair}>
              <View style={styles.largeFair}>
                <Image style={styles.fairImg} source={require('./resources/fair.png')} />
             </View>
             <View style={styles.spaceCell}></View>
             <View style={styles.samllFair}>
               <Image style={styles.fairIcon} source={require('./resources/capsule-legend-stars-43x52.png')} />
            </View>
          </View>

      </ScrollView>
    )
  }
}



// <View style={[{marginBottom:10,}]}>
//   <Image style={[styles.image]} ></Image>
// </View>
// <View style={[styles.inputRow,styles.center]}>
//     <Text style={styles.text}>企业号</Text>
//     <TextInput style={styles.input} placeholder="请输入企业号" onChangeText={this._handleClick}/>
// </View>
//
// <View style={[styles.inputRow,styles.center]}>
//   <Text style={styles.text}>个人帐号</Text><TextInput style={styles.input} placeholder="请输入个人帐号" onChangeText={this._handleClick}/>
// </View>
// <View style={[styles.inputRow,styles.center]}>
//   <Text style={styles.text}>登录密码</Text><TextInput style={styles.input} placeholder="请输入登录密码" password={true} onChangeText={this._handleClick}/>
// </View>
//
// <View>
//   <TouchableHighlight underlayColor="#38adff"  onPress={this._handleClick}>
//     <View style={[styles.btn,styles.center]}>
//     <Text style={{color:'#fff'}}>登录</Text>
//     </View>
//   </TouchableHighlight>
// </View>
module.exports = ValuationCapsuleView;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin:5,
  },
  heading: {
    flex:1,
    flexDirection: 'row',
    alignItems:'flex-start',
  },
  titleText: {
    marginBottom:5,
    fontFamily: 'UniversNextforMORN-CnLt',
    fontSize: 24,
    color: 'black',
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
  webView: {
     //backgroundColor: BGWASH,
     height: 350,
  },
  center:{
    alignItems:'center',
    justifyContent: 'center',
  },
  image:{
    //width:width,
    //height:498*width/750,
  },
  inputRow:{
    flexDirection:'row',
    marginBottom:10,
    marginLeft:40,
    marginRight:40,
    //borderWidth:Util.pixel,
    borderColor:'transparent',
    borderBottomColor:'#ccc'
  },
  text:{
    width:60,
    textAlign:'left'
  },
  input:{
    flex:1,
    marginLeft:10,
    alignItems:'flex-start',
    height:35,
    fontSize:13
  },
  btn:{
    height:35,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#38adff',
    borderRadius: 4,
    marginTop:10,
    marginLeft:40,
    marginRight:40
  },
  fair: {
     flex:1,
     alignItems: 'center',
     height:200,
     flexDirection: 'row'
     //backgroundColor:'#ffffff'
  },
  largeFair: {
     flex: 0.6,
     height: 100,
     alignItems: 'center',

  },
  samllFair: {
     flex: 0.4,
     alignItems: 'center',

  },
  fairIcon: {
    width: 43,
    height: 52
  },
  fairImg: {
    width: 119,
    height: 132
  }




});
