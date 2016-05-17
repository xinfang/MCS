'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
  ListView,
  StyleSheet,
  View,
  Text,
} = ReactNative;

var Api = require('./App/Network/Api');

module.exports = React.createClass({
  getInitialState: function() {
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

  _renderRow: function(rowData) {
    return (
      <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.name}>{rowData.Name}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.ticket}>{rowData.RegionAndTicker.split(':')[1]} | {rowData.Exchange} </Text>
          </View>
      </View> )
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
