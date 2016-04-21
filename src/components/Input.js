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

import { Actions } from 'react-native-router-flux';

// import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';

class Digit extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <View style={{ borderWidth: 1, borderColor: '#ee3124'}}>
        <Text>
        { content }
        </Text>
      </View>
    )
  }
}
export default class Input extends React.Component {
  render() {
    // TODO: fill in the initial state
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 28}}>
        888.9
        </Text>
        <View>
        {
          digits.map(item => {
            <Digit key={item} content={item} onPress={() => AlertIOS.alert(item.toString())}) />
          })
        }
        </View>
      </View>
    )
  }
}
