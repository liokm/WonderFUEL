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
import { uistore } from '../stores';
import { observer } from 'mobx-react/native';

@observer
class Launch extends React.Component {
  // componentDidMount() {
  //   // TODO
  //   this.state = {timer: setTimeout(() => {
  //     clearTimeout(this.state.timer);
  //     Actions.Tabbar();
  //   }, 2000)};
  // }

  render() {
    const { width, height } = this.props;

    return (
      <View style={{flex: 1, borderColor:'red', borderWidth:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18}} onPress={Actions.Tabbar}>
        WonderFUEL
        </Text>
      {/*
        <Icon name='location-on' size={30} />
        <Icon name='map' size={30} />
        <Icon name='location-off' size={30} />
        <Icon name='star' size={30} />
        <Icon name='star-border' size={30} />
        <Icon name='local-shipping' size={30} />
      */}

      </View>
    )
  }
}

export default Launch;
