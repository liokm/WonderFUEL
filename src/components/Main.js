/**
 * @flow
 */

import React, {
  Linking,
  Alert,
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

class MarkerDescription extends React.Component {
  render() {
    const { marker } = this.props;
    return <View style={{ backgroundColor: '#3498db',  padding: 2, paddingLeft: 4, paddingRight: 4, borderRadius: 3}}>
      <Text style={{ color: '#fff'}}>${ uistore.mem_stations[marker.id].price_diesel }</Text>
      <Text>{marker.vicinity}</Text>
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
            title={`${marker.name} @ ${marker.vicinity}`}
            description={`Diesel@${uistore.mem_stations[marker.id].price_diesel}    91Regular@${uistore.mem_stations[marker.id].price_91}`}
            onCalloutPress={() => {
                const item = uistore.mem_stations[marker.id];
                return Alert.alert(
                  'Low Price Everyday!',
                  `Diesel ${uistore.mem_stations[marker.id].price_diesel} | 91 Regular ${uistore.mem_stations[marker.id].price_91}\n ${item.name}\n${item.vicinity}`,
                  [
                    {text: 'Go There', onPress: () => Linking.openURL(`http://maps.apple.com/?q=${item.latitude},${item.longitude}`).catch(err => console.error('An error occurred', err))},
                    {text: 'Never mind', style: 'cancel'},
                    {text: 'Bookmark', onPress: () => { if (uistore.liked_stations.indexOf(marker.id) == -1) { uistore.liked_stations.push(marker.id); } }},
                    {text: 'Enter Price', onPress: () => { }},

                  ]);
              }}
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
