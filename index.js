'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Navigator,
} =  ReactNative;

var STORAGE_KEY = '@AsyncStorageExample:key';
var _navigator;
var SearchPage = require('./search.js');
var SecurityView = require('./SecurityView.js');
var AnalystReportView = require('./AnalystReportView.js');

var MCSAndroid = React.createClass({
  componentDidMount() {
   this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({selectedValue: value});
        console.log('Recovered selection from disk: ' + value);
      } else {
        console.log('Initialized with no selection on disk.');
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },
  getInitialState: function(){
    return {
      selectedValue: undefined
    };
  },

  configureScenceAndroid: function(){
    return Navigator.SceneConfigs.PushFromRight;
  },

  renderSceneAndroid: function(route, navigator){
    _navigator = navigator;
    if(route.id === 'main'){
      return (
         <View style={styles.flexContainer}>
             <View>
               <Text style={styles.header}>
                 My Company Stock
               </Text>
               <Text style={styles.header}>
                 {this.state.selectedValue}
               </Text>
               <Text style={styles.company}>
                 Powered by Morningstar
               </Text>
               <TouchableOpacity onPress={ () => _navigator.push({title:'SearchPage',id:'search'}) }>
               <Text style={styles.search}>
                 Search for security by ticket or name
               </Text>
               </TouchableOpacity>
             </View>
         </View>
       );
    }

    if(route.id === 'search'){
        return (
          <SearchPage navigator={navigator} route={route}/>
        );
     }
     if(route.id === 'detail'){
         return (
           <SecurityView navigator={navigator} route={route}/>
         );
      }
      if(route.id === 'report'){
          return (
            <AnalystReportView navigator={navigator} route={route}/>
          );
      }

  },

  render: function(){
    var renderScene = this.renderSceneAndroid;
    var configureScence = this.configureScenceAndroid;
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{ title: 'Main', id:'main'}}
        configureScence={{ configureScence }}
        renderScene={renderScene}
      />
    );
  }
});

var styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  flexContainer: {
     flex:1,
     alignItems:'center',
     justifyContent:'center'
  },
  header: {
     height: 40,
     fontSize: 30,
     textAlign: 'center',
     color: '#000000'
  },
  company: {
      height: 30,
      textAlign: 'center',
      fontSize: 15,

  },
  search: {
      height: 30,
      textAlign: 'center',
      fontSize: 15,
      color: '#bab5f1'
  },
  button:{
    height:56,
    margin:10,
    backgroundColor:'#cad6c5',
    justifyContent:'center',
    alignItems:'center',
  },
});

module.exports = MCSAndroid
