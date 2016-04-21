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
import { observer } from 'mobx-react/native';

@observer
class Main extends React.Component {
  constructor() {
    super();
    // TODO: Depends on network speed
    // this.updateRegion = debounce(this.updateRegion, 500);
  }

  updateRegion = x => this.props.region.update(x);

  render() {
    // TODO: Fix TabBar height
    const { region } = this.props;
    return (
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}}
          region={region}
          onRegionChangeComplete={ this.updateRegion }>

          {region.stations.map((marker, i) => (
            <MapView.Marker
            coordinate={{latitude: marker.location.lat, longitude: marker.location.lng}}
            title={marker.name}
            description={marker.vicinity}
            key={i}
            />
          ))}
        </MapView>
      </View>
    )
  }
}

export default Main;
