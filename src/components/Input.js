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
import Button from 'apsl-react-native-button';

class Digit extends React.Component {
  render() {
    const { content } = this.props;
    // if (content instanceof React.Component)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 1,  width:64, height: 64}}>
        <Text style={{ backgroundColor: 'transparent', fontSize: 24}}>
        { content }
        </Text>
      </View>
    )
  }
}
export default class Input extends React.Component {
  render() {
    // TODO: fill in the initial state
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 30 }}>
        Diesel
        </Text>
        <Text style={{fontSize: 28}}>
        888.9
        </Text>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', flexWrap: true, borderWidth:1, borderColor: 'yellow'}}>
            <Digit content={1} />
            <Digit content={2} />
            <Digit content={3} />
            <Digit content={1} />
            <Digit content={2} />
            <Digit content={3} />
            <Digit content={1} />
            <Digit content={2} />
            <Digit content={3} />
          </View>
          <View style={{flexDirection: 'row', borderWidth:1, borderColor: 'yellow'}}>
            <Digit content={4} />
            <Digit content={5} />
            <Digit content={6} />
          </View>
          <View style={{flexDirection: 'row', borderWidth:1, borderColor: 'yellow'}}>
            <Digit content={7} />
            <Digit content={8} />
            <Digit content={9} />
          </View>
          <View style={{flexDirection: 'row', borderWidth:1, borderColor: 'yellow'}}>
            <Digit content={0} />
            <Digit content={'<'} />
          </View>

        </View>
        <Button isLoading={true} style={{ flex: 1,  backgroundColor:'#3498db'}} textStyle={{ color:'#fff', fontSize: 18, fontWeight: 'bold'}}>
          SUBMIT
        </Button>
      </View>
    )
  }
}
