'use strict';
/**
 * WonderFUEL
 * @flow
 */

/**
 *  # snowflake
 *  Snowflake ![snowflake](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React, {
  AppRegistry,
  Navigator,
  View,
  AlertIOS,
  Text} from 'react-native';

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import RNRF, {
  Router,
  Route,
  Scene,
  Actions,
  TabBar} from 'react-native-router-flux';

/**
 * ### mobx
 *
 * TODO
 *  - store to react to device info (general info/display/network)
 */
//import {observer} from 'mobx-react/native';
//import store from './store';

/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/FontAwesome';

/**
* ## TabIcon
*
* Displays the icon for the tab w/ color dependent upon selection
*/

class TabIcon extends React.Component {
  render(){
    const color = this.props.selected ? '#FF3366' : '#FFB3B3';
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
        <Icon style={{color}} name={this.props.iconName} size={30} />
        <Text style={{color}}>{this.props.title}</Text>
      </View>
      );
  }
}

/**
 * ## Native
 */

class App extends React.Component {
  componentDidMount() {
    this.state = {timer: setTimeout(() => {
      clearTimeout(this.state.timer);
      Actions.main();
    }, 5000)};
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={Actions.main}>
        App!!!
        </Text>
      </View>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
        Main!!!
        </Text>
      </View>
    );
  }
}

export default function app(platform) {

  // TODO initialize store
  let WonderFUEL = React.createClass( {
    render() {
      // setup the router table with App selected as the initial component
      return (
        <Router hideNavBar={true} sceneStyle={{backgroundColor:'#F7F7F7'}}>
          <Scene key="root">
            <Scene key="App" component={App} title="App" initial={true} />
            <Scene key="main" title="main" iconName={"home"} icon={TabIcon} hideNavBar={false} component={Main} />
            {/*
            <Scene key="Tabbar" tabs={true} default="Main">
              <Scene key="Main" title="main" iconName={"home"} icon={TabIcon} hideNavBar={false} component={Main} initial={true} />
              <Scene key="Login" component={fn('Login')} title="Login" type="replace" />
              <Scene key="Subview" component={fn('Subview')} title="Subview" />
              <Scene key="Logout" title="logout" icon={TabIcon} iconName={"sign-out"} hideNavBar={true} component={fn('Logout')} />
              <Scene key="Profile" title="profile" icon={TabIcon} iconName={"gear"} hideNavBar={true} component={fn('Profile')}/>
            </Scene>
            */}
          </Scene>
        </Router>
      );
    }
  });
  /**
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('WonderFUEL', () => WonderFUEL);
}
