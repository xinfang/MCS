'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
  ListView,
  StyleSheet,
  View,
  Text,
  Image,
  PixelRatio,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
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
    return (<View style={styles.row}>
                <Text style={{fontSize:22}}>{rowData.Name}</Text>
              <Text style={{color: '#666'}}>{rowData.ExchangeShortName}</Text>
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
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1 / PixelRatio.get(),
    backgroundColor: '#202020',
    borderRadius: 4,
    color: 'white',
    paddingLeft: 10,
  },
  helpText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#3CABDA',
    alignSelf: 'center'
  },
  cancelButton: {
    flex: 1,
    height: 40,
    marginLeft: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  suggestion: {
    flex: 10,
  },
});


// var styles = StyleSheet.create({
//   row: {
//     flex: 1,
//     paddingLeft: 20,
//     paddingTop: 10,
//     paddingBottom: 10,
//     overflow: 'hidden',
//     borderBottomWidth: 0.5,
//     borderColor: '#F1F1F1',
//   },
//   loadingView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
// });
