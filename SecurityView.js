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
  ViewPagerAndroid,
  BackAndroid,
} from 'react-native'

var Api = require('./App/Network/Api');
var AnalystReportView = require('./AnalystReportView.js');
var ValuationView = require('./ValuationView.js');
var ValuationCapsuleView = require('./ValuationCapsuleView.js');
var EconomicMoatView = require('./EconomicMoatView.js');
var SecurityQuoteView = require('./SecurityQuoteView.js');

var _navigator ;

var Spacing = React.createClass({
  render: function () {
    return (
      <View style={styles.spacing} />
    )
  }
});

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

class SecurityView extends React.Component {

  constructor(props) {
    super(props);
    _navigator = props.navigator;
    console.log("Xf1");
    console.log(props.route);
    this.state = {
      security:props.route.security,
      date:new Date(),
      securityData:[],
      quote:[],
      currentPage: 0
    };
  }

  componentDidMount() {
    this.getSecurity(this.props.route.security.PerformanceId,"");
    this.getQuote(this.props.route.security.PerformanceId,"");
   }

  getSecurity(query, option) {
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

  onPressReadReport() {
    _navigator.push({title:'AnalystReportView',id:'report',securityID:'0P000000GY'});
   }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.securitytitle}>
            <View style={styles.heading}>
                <View style={styles.ticketCell}>
                  <Text style={styles.ticketText}>{this.state.security.RegionAndTicker.split(':')[1]} | <Text style={styles.ratingText}>QQQ</Text></Text>
                </View>

                <View style={styles.helpCell}>
                   <Image style={styles.icon} source={require('./resources/icon-help-grey3.png')} />
                </View>
            </View>
            <View style={styles.fullName}>
                <Text style={styles.nameText}>{this.state.security.Name}</Text>
            </View>
        </View>
        <View style={{flex:1,height:2, backgroundColor: '#000000'}} />
        <View style={styles.securityContent}>
            <ScrollView style={[styles.scrollView, styles.horizontalScrollView]} contentContainerStyle={styles.contentContainerStyle} >

                <SecurityQuoteView securityID="0P0000ZOQ0"/>

                <View style={{height:2, backgroundColor: '#000000'}} />

                <View style={styles.quote}>
                    <View style={styles.priceFair}>
                        <Text style={styles.labelText}>Price vs. Fair Value <Text style={styles.dateText}>12 May 2016</Text></Text>
                        <Text style={styles.descText}>Undervalued at a 29% Discount with High uncertainty.</Text>
                    </View>
                    <View style={styles.iconCell}>
                       <Image style={styles.icon} source={require('./resources/icon-info-grey3.png')} />
                    </View>
                </View>

                <View style={styles.quoteCapsule}>
                   <ViewPagerAndroid
                   style={{flex: 1}}
                   initialPage={0}>
                     <View style={styles.pageStyle}>
                        <ValuationCapsuleView securityID="0P0000ZOQ0"/>
                     </View>
                     <View style={styles.pageStyle}>
                        <EconomicMoatView securityID="0P0000ZOQ0"/>
                      </View>
                    </ViewPagerAndroid>
                </View>

                <View style={{height:2, backgroundColor: '#000000'}} />

                <View style={styles.quote}>
                    <View style={styles.priceFair}>
                        <Text style={styles.labelText}>Andrew Lane</Text>
                        <Text style={styles.descText}>Equity Analyst</Text>
                    </View>

                </View>

                <View style={{height:1, backgroundColor: 'grey',}} />

                <View style={styles.quote}>
                    <View style={styles.priceFair}>
                        <Text style={styles.labelText}>Valuation</Text>
                    </View>
                </View>

                <ValuationView securityID="0P0000ZOQ0"/>

                <View style={styles.quote}>
                    <View style={styles.buttoncontainer}>
                    <TouchableHighlight onPress={this.onPressReadReport}>
                      <View style={[styles.button, this.state.active ? styles.activeButton: {} ]}>
                        <Text style={[styles.buttonText, this.state.active ? styles.activeText: {}]}>Read report</Text>
                      </View>
                    </TouchableHighlight>
                    </View>
                </View>

            </ScrollView>


        </View>



      </View>
    );
  }
};

module.exports = SecurityView;

var styles = StyleSheet.create({
  container: {
      flexDirection: 'column', margin: 5,
  }
  ,
  securitytitle: {
      height: 50,
  }
  ,
  securityContent: {
      flex: 1, paddingBottom: 10,
  }
  ,
  heading: {
      flex: 1, flexDirection: 'row', alignItems: 'flex-start',
  }
  ,
  scrollView: {
      flex: 1, height: 440,
  }
  ,
  contentContainer: {
      margin: 10, backgroundColor: "#ff0000",
  }
  ,
  fullName: {
      flex: 1, //backgroundColor:'#ffffff'
  }
  ,
  ticketCell: {
      width: 300, //backgroundColor:'#ff0000',
      height: 30
  }
  ,
  ratingCell: {
      width: 100, //backgroundColor:'#ffffff',
      height: 25
  }
  ,
  helpCell: {
      flex: 1, paddingTop: 10, alignItems: 'flex-end', //backgroundColor:'#ffaaaf',
      height: 30
  }
  ,
  ticketText: {
      fontFamily: 'UniversNextforMORN-CnLt', fontSize: 24, color: 'black', textAlign: 'left'
  }
  ,
  ratingText: {
      fontFamily: 'MorningstarSymbols', fontSize: 24, color: 'black', textAlign: 'left'
  }
  ,
  nameText: {
      fontFamily: 'UniversNextforMORN-CnBd', fontSize: 14, color: 'black', height: 25, textAlign: 'left'
  }
  ,
  quoteCapsule: {
      flex: 1, height: 260, paddingBottom: 5, paddingTop: 5, //backgroundColor:'#ffffff'
  }
  ,
  pageStyle: {
      //alignItems: 'center',
      height: 300, padding: 0,
  }
  ,
  quote: {
      flex: 1, flexDirection: 'row', paddingBottom: 5, paddingTop: 5, //backgroundColor:'#ffffff'
  }
  ,
  dataCell: {
      flex: 0.5, //backgroundColor:'#ffaaaf',
      height: 60
  }
  ,
  spaceCell: {
      width: 24, //backgroundColor:'green',
      //height: 60
  }
  ,
  iconCell: {
      paddingTop: 5, paddingLeft: 5, width: 20, alignItems: 'flex-end', height: 30
  }
  ,
  labelText: {
      fontFamily: 'UniversNextforMORN-CnBd', fontSize: 12, color: 'black', textAlign: 'left'
  }
  ,
  valueText: {
      fontFamily: 'UniversNextforMORN-CnLt', fontSize: 14, color: 'black', textAlign: 'left'
  }
  ,
  precentText: {
      fontFamily: 'UniversNextforMORN-CnLt', fontSize: 12, color: 'green', textAlign: 'left'
  }
  ,
  dateText: {
      fontFamily: 'UniversNextforMORN-CnLt', fontSize: 12, color: 'green', textAlign: 'left'
  }
  ,
  priceFair: {
      flex: 1,
  }
  ,
  descText: {
      fontFamily: 'UniversNextforMORN-CnLt', fontSize: 16, textAlign: 'left'
  },
  icon: {
      width: 20, height: 20
  }
  ,
  editIcon: {
      width: 10, height: 10
  }
  ,
  description: {
      fontSize: 18, margin: 5, color: '#656565'
  }
  ,
  chartScrollView: {
      flex: 1, backgroundColor: '#6A85B1', height: 250, flexDirection: 'row',
  }
  ,
  buttoncontainer: {
      paddingTop: 10, flex: 1, alignItems: 'center',
  }
  ,
  button: {
      flex:1, flexDirection:'row', justifyContent: 'center', alignItems:'center', width: 200, height: 30, borderColor:'grey', borderWidth:1, borderRadius:15, backgroundColor: 'white', shadowColor: "#57c6fa", shadowOffset: {
          width: 2, height: 2
      }
      ,
      shadowOpacity:0.5,
      shadowRadius:5,
  }
  ,
  buttonText: {
      padding: 5, marginTop: 5, color: "grey", fontFamily: 'UniversNextforMORN-CnLt',
  }
  ,
  activeButton: {
      //backgroundColor:"#00afc7",
  }
  ,
  activeText: {
      color: "grey", fontWeight: 'bold', fontFamily: 'UniversNextforMORN-CnLt',
  }
});

//http://codepen.io/johnnyo/pen/BoKbpb
