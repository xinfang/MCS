'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  ViewPagerAndroid,
  ListView,
  TouchableHighlight,
  Navigator,
  BackAndroid,
  AsyncStorage,
} = ReactNative;

var STORAGE_KEY = '@AsyncStorageExample:key';
var SimpleAlert = require('react-native-simpledialog-android');
var Api = require('./App/Network/Api');
var ChoiceSecurityView = require('./ChoiceSecurityView.js');

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

module.exports = React.createClass({
  getInitialState: function() {
    _navigator = this.props.navigator;
   return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      selectedValue: undefined,
      messages: [],
    };
  },

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
  _onPress(event) {
      console.log(event);
  },

  doSearch: function(query, option) {
    if(!query.trim()) {
      return;
    }
    var that = this;
    Api.getSearchSecurities(query, function(data) {
      if (data == false) {
        SimpleAlert.alert(
          'Please read me!',
          'Want a warning alert?', [
            { type: SimpleAlert.POSITIVE_BUTTON, text: 'Yes', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },
            { type: SimpleAlert.NEGATIVE_BUTTON, text: 'No',  onPress: () => console.log('Cancel Pressed!'), style: 'cancel'},
            { type: SimpleAlert.NEUTRAL_BUTTON, text: 'Neutral', onPress: () => console.log('Cancel Pressed!'), style: 'cancel'},
          ]
        );
        return;
      }
      that.setState({
          dataSource: that.state.dataSource.cloneWithRows(data),
          loaded: true,
      });
    });
  },

  _onValueChange:function(performanceId) {
      try {
        AsyncStorage.setItem(STORAGE_KEY, performanceId);
        console.log('Saved selection to disk: ' + performanceId);

      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
  },

  _onPressSetSecurity: function(rowData) {
      this._onValueChange(rowData.PerformanceId);
      ChoiceSecurityView
       _navigator.push({title:'ChoiceSecurityView',id:'choice',security:rowData});
      //_navigator.push({title:'SecurityView',id:'detail',security:rowData});
  },

  _onPressAdd: function(rowData) {
    this._onPressSetSecurity(rowData);
  },

  _appendMessage(message) {
   this.setState({messages: this.state.messages.concat(message)});
 },

  _renderRow: function(rowData) {
    return (
      <TouchableHighlight onPress={() => this._onPressAdd(rowData)} underlayColor="#dddddd">

        <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.name}>{rowData.Name}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.ticket}>{rowData.RegionAndTicker.split(':')[1]} | {rowData.Exchange} </Text>
            </View>
        </View>
      </TouchableHighlight>
      )
  },

  render: function() {
    return (
      <ListView style={styles.suggestion}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },
  renderLoadingView: function() {
      return (
        <View style={styles.container}>
          <Text>
            Loading securities...
          </Text>
        </View>
      );
  },
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderBottomWidth: 0.5,
    borderColor: '#F1F1F1',
  },
  cell: {
    flex: 1,
    height: 35,
  },
  name: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10
  },
  ticket: {
    fontSize: 14,
    textAlign: 'right',
    margin: 10
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
