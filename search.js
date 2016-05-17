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
   PixelRatio,
   Platform,
} = ReactNative;

var SearchResult = require('./SearchResult');

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

var SearchPage = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    return {
        text: null,
    };
  },
  _onPressCancelButton() {
    _navigator.pop();
  },

  _onTyping: function(text: Object) {
    this.setState({
      text: text.text,
    });
    this.refs.search.doSearch(text.text, "");
  },
  render: function(){
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.helpText}>
          </Text>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchBarInput}
              autoCapitalize={'characters'}
              autoFocus={true}
              placeholder="symbol.."
              placeholderTextColor="gray"
              onChangeText={(text) => this._onTyping({text})}
              value={this.state.text}
            />
            <TouchableHighlight style={styles.cancelButton}
              underlayColor="black"
              onPress={this._onPressCancelButton}>
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.suggestion}>
            <View style={styles.searchResult}>
                   <SearchResult ref="search"/>
              </View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  row: {
    marginTop: 0,
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingLeft: 0,
    paddingRight: 0,
  },
  searchBar: {
    flexDirection: 'row',
      backgroundColor: 'black',
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1 / PixelRatio.get(),
    backgroundColor: 'white',
    borderRadius: 4,
    color: 'black',
    paddingLeft: 10,
  },
  helpText: {
    color: 'white',
    fontSize: 1,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
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

module.exports = SearchPage;
