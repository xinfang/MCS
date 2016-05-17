'use strict';
var React = require('react');
var ReactNative = require('react-native');



var {
  ListView,
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} = ReactNative;

var testData = [{"name":"AApl","symbol":"aa"},
{"name":"IBM","symbol":"cccccc"},
{"name":"MORN","symbol":"dd"},
{"name":"SSED","symbol":"ee"}
];



var Api = require('./App/Network/Api');

module.exports = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8']),
    };
  },
  doSearch: function(query, option) {
    if(!query.trim()) {
      return;
    }
    var self = this;
    Api.getSearchSecurities(query, function(data) {
      console.log("xf1");
      console.log(data);
      console.log("xf2");
       self.setState({
          movies: data.movies,
          dataSource: self.state.dataSource.cloneWithRows(testData)
        });
    });

  },

  _renderRow: function(data) {
     return (
      <View style={styles.row}>
          <Text numberOfLines={1}>abc</Text>
      </View>
    );
  },


  render: function() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        //renderRow={(rowData) =><Text>{rowData}</Text>}
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


  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{movie.title}</Text>
      </View>
    );
  },

});

var styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
    borderBottomWidth: 0.5,
    borderColor: '#F1F1F1',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
