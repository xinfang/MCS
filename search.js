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


var SearchTextInput = React.createClass({
  getInitialState: function() {
    return {
      currentSearchType: 'Repo',
    };
  },
  handleSubmit: function(event) {
    this.props.customAction({action:'submit', data: event.nativeEvent.text});
  },
  resignResponder: function() {
    this.refs.input.blur();
  },
  render: function() {
    var placeholder = `Search ${this.state.currentSearchType}`;
    return (
      <TextInput
        ref="input"
        style={styles.input}
        autoCapitalize="none"
        autoFocus={true}
        autoCorrect={false}
        returnKeyType={'search'}
        placeholder={placeholder}
        onSubmitEditing={this.handleSubmit}
        onChangeText={(text) => this.setState({input: text})}
      />
    );
  },
});

var SearchPage = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    return {
        securityname:"",
        securities:null,
    };
  },

  _handleResponse(response) {

  },

  _executeQuery(query) {
    fetch(query)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            securities: responseData.result.data,
        });
    })
    .done();
//    this.setState({ isLoading: true, message: '' });
//    fetch(query)
//      .then(response => response.json())
//      .then(json => this._handleResponse(json.response))
//      .catch(error => {
//        this.setState({
//          isLoading: false,
//          message: 'Something bad happened ' + error
//        });
//      });
  },

  customAction: function(event) {
    switch (event.action) {
      case 'option':
        this.showActionSheet();
        break;
      case 'submit':
        var query = event.data;
        this.refs.search.doSearch(query, "");
        break;
      case 'search':
        var query = this.refs.input.state.input;
        this.refs.input.resignResponder();
        break;
    }
  },

  render: function(){
    return (
         <View style={styles.container}>
             <View>
                <SearchTextInput ref="input" customAction={this.customAction} />
             </View>
             <View style={styles.searchResult}>
                       <SearchResult
                         ref="search"
                         goToUser={this.goToUser}
                         goToRepo={this.goToRepo}
                       />
              </View>
         </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'column',
    backgroundColor: 'white',
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
//   container: {
//       flex: 1
//     },
//     searchRow: {
//       backgroundColor: '#eeeeee',
//       paddingTop: 15,
//       paddingLeft: 10,
//       paddingRight: 10,
//       paddingBottom: 10,
//     },
//     searchTextInput: {
//       backgroundColor: 'white',
//       borderColor: '#cccccc',
//       borderRadius: 1,
//       borderWidth: 1,
//       height: 40,
//       paddingLeft: 8,
//     },
//
// });

module.exports = SearchPage;
