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
   BackAndroid,
} = ReactNative;



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

    };
  },

 onSearchPressed() {
    console.log('_onPressAdd', this.state.searchString);
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  },
  onLocationPressed() {
      navigator.geolocation.getCurrentPosition(
        location => {
          var search = location.coords.latitude + ',' + location.coords.longitude;
          this.setState({ searchString: search });
          var query = urlForQueryAndPage('centre_point', search, 1);
          this._executeQuery(query);
        },
        error => {
          this.setState({
            message: 'There was a problem with obtaining your locaton: ' + error
          });
        });
    },

  onSearchTextChanged(event) {
      //this.setState({ searchString: event.nativeEvent.text });


  },


  render: function(){
    return (
// <SearchBar
//        placeholder='Search'
//        textFieldBackgroundColor='blue'
//        />
        <View style={styles.container}>

            <View style={styles.flowRight}>
              <TextInput
                style={styles.searchInput}
                placeholder='Input Security Name'
                value={this.state.searchString}
                onPress={this.onSearchPressed.bind(this)}
                //onChange={this.onSearchTextChanged.bind(null,this)}

                />

            </View>


          </View>

    );
  },
});


var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

module.exports = SearchPage;