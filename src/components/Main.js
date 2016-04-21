/**
 * @flow
 */

import React, {
  AppRegistry,
  Navigator,
  View,
  AlertIOS,
  Text
} from 'react-native';

import Actions from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';

export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    // TODO: fill in the initial state
    return (
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    )
  }
}
