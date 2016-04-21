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
import { observer, observable } from 'mobx-react/native';
//import store from './store';

/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
* ## TabIcon
*
* Displays the icon for the tab w/ color dependent upon selection
*/

class TabIcon extends React.Component {
  render(){
    const color = this.props.selected ? '#ee3124' : '#555';
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
        <Icon style={{color}} name={this.props.iconName} size={30} />
        {/*
        <Text style={{color}}>{this.props.title}</Text>
        */}
      </View>
      );
  }
}

/**
 * ## Native
 */

import { uistore } from './stores';

// Components
import Launch from './components/Launch';
import Main from './components/Main';
import Input from './components/Input';
import Love from './components/Love';


const initial = Launch;
// Scene
const scenes = Actions.create(
  <Scene key="root">
    <Scene key="Input" component={Input} initial={initial==Input} />
    <Scene key="Launch" component={Launch} hideNavBar={true} title="WonderFUEL" initial={initial==Launch} />
    <Scene key="Tabbar" tabs={true} title="Favorite Stations" default="Favorite" initial={!true} style={{ backgroundColor: '#fff' }} type='replace'>
      <Scene key="Main" title="Main" iconName={"location-on"} hideNavBar={true} icon={TabIcon} component={Main} region={uistore.region} />
      <Scene key="Favorite" iconName={"star"} icon={TabIcon} component={Love} uistore={uistore} />
      <Scene key="History" title="History" iconName={"history"} icon={TabIcon} hideNavBar={false} component={Launch} />
      <Scene key="Settings" title="Settings" iconName={"account-circle"} icon={TabIcon} hideNavBar={false} component={Launch} />
    {/*
      <Scene key="Main" title="main" iconName={"home"} icon={TabIcon} hideNavBar={false} component={Main} initial={true} />
      <Scene key="Login" component={fn('Login')} title="Login" type="replace" />
      <Scene key="Subview" component={fn('Subview')} title="Subview" />
      <Scene key="Logout" title="logout" icon={TabIcon} iconName={"sign-out"} hideNavBar={true} component={fn('Logout')} />
      <Scene key="Profile" title="profile" icon={TabIcon} iconName={"gear"} hideNavBar={true} component={fn('Profile')}/>
    */}
    </Scene>
  </Scene>
)


export default function app(platform: string) {

  let WonderFUEL = React.createClass( {
    componentDidMount() {
      uistore.setup();
    },

    render() {
      return <Router scenes={scenes} sceneStyle={{backgroundColor:'#F7F7F7'}} />;
    }
  });
  /**
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('WonderFUEL', () => WonderFUEL);
}
