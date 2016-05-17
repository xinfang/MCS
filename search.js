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
   Alert,
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
        var url = `https://mobstg.morningstar.com/service_p2/1.0/products/MCS/securities/search/${query}`;
        this.refs.search.doSearch(query, "");
        //\\this._executeQuery(url);
        //this.refs.search.doSearch(query, this.state.currentSearchType);
        break;
      case 'search':
        var query = this.refs.input.state.input;
 //     this.refs.search.doSearch(query, this.state.currentSearchType);
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
      flex: 1
    },
    searchRow: {
      backgroundColor: '#eeeeee',
      paddingTop: 15,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
    },
    searchTextInput: {
      backgroundColor: 'white',
      borderColor: '#cccccc',
      borderRadius: 1,
      borderWidth: 1,
      height: 40,
      paddingLeft: 8,
    },

});

module.exports = SearchPage;
