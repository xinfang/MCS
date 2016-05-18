'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewPagerAndroid,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Navigator,
  BackAndroid,
} = ReactNative;

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

module.exports = React.createClass({
  getInitialState: function() {
    _navigator = this.props.navigator;
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },
  doSearch: function(query, option) {
    if(!query.trim()) {
      return;
    }
    var that = this;
    Api.getSearchSecurities(query, function(data) {
      that.setState({
          dataSource: that.state.dataSource.cloneWithRows(data),
          loaded: true,
      });
    });
  },


  _onPressAdd: function(rowData) {
    _navigator.push({title:'SecurityView',id:'detail',security:rowData});
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
