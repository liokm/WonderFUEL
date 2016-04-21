/**
 * @flow
 */

import React, {
  AppRegistry,
  Navigator,
  View,
  AlertIOS,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { uistore } from '../stores';
import { observer } from 'mobx-react/native';

@observer
class Love extends React.Component {
  render() {
    const uistore = this.props.uistore;
    const { mem_stations, liked_stations } = uistore;
    const stations = [];

    liked_stations.forEach(id => {
      if (id in mem_stations) {
        stations.push(mem_stations[id]);
      }
    });
    // console.log(stations);

    return (
      <ScrollView style={{flex: 1, paddingTop: 64}}>
      {
        stations.map(row => (
          <View style={{ padding: 8, borderColor: 'grey', borderBottomWidth: 1}}>
            <TouchableOpacity onPress={() => { uistore.region.updatePoint(row.latitude, row.longitude); Actions.Main() }}>
              <Text style={{ fontSize:14 }}>{row.name}</Text>
              <Text>{row.vicinity}</Text>
              <Text>Diesel {row.price_diesel}</Text>
              <Text>91 Regular {row.price_91}</Text>
            </TouchableOpacity>
          </View>
        ))
      }
        {/*
          stations.length?
          <ListView
            style={{ flex: 1 }}
            dataSource={stations}
            renderRow={row => {
              <View>
                <Text>{row.name}</Text>
                <Text>{row.vicinity}</Text>
                <Text>{row.price}</Text>
              </View>
            }}
          />
          :
          <Text style={{fontSize: 18, alignItems: 'center'}}>Go to like some station!</Text>
        */}
      </ScrollView>
    )
  }
}

export default Love;
