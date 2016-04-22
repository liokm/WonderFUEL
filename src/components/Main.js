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
import { uistore } from '../stores';

class MarkerView extends React.Component {
  render() {
    const { marker } = this.props;
    return <View style={{ backgroundColor: '#3498db',  padding: 2, paddingLeft: 4, paddingRight: 4, borderRadius: 3}}>
      <Text style={{ color: '#fff'}}>${ uistore.mem_stations[marker.id].price_diesel }</Text>
    </View>;
  }
}

@observer
class Main extends React.Component {
  constructor() {
    super();
    // TODO: Depends on network speed
    // this.updateRegion = debounce(this.updateRegion, 500);
  }

  updateRegion = x => this.props.region.update(x);

  render() {
    // <MyCustomMarkerView {...marker} />
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
            key={i}
            title={marker.name}
            description={marker.vicinity}
            >
            <MarkerView marker={marker} />
            </MapView.Marker>
          ))}

          {/*
          {region.stations.map((marker, i) => (
            <MapView.Marker
            coordinate={{latitude: marker.location.lat, longitude: marker.location.lng}}
            title={marker.name}
            description={marker.vicinity}
            key={i}
            />
          ))}
            */}
        </MapView>
      </View>
    )
  }
}

export default Main;
