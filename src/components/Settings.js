/**
 * @flow
 */

import React, {
  Animated,
  PixelRatio,
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
import Icon from 'react-native-vector-icons/MaterialIcons';

@observer
class Settings extends React.Component {
  render() {
    const uistore = this.props.uistore;
    const { mem_stations, liked_stations, history } = uistore;

    const items = [];

    history.forEach(({id, price, date}) => {
      if (id in mem_stations) {
        const { name, vicinity, latitude, longitude } = mem_stations[id];
        items.push({price, date, name, vicinity, latitude, longitude});
      }
    });
    // console.log(stations);

    return (
      <View style={{flex: 1, paddingTop: 0}}>
        <View style={{ paddingTop: 30, height: 64, alignItems: 'center', backgroundColor: '#efeff2', borderColor: '#828287', borderBottomWidth: 1/PixelRatio.get()}}>
          <Text style={{ fontSize: 18, fontWeight: '500'}}>Settings</Text>
        </View>
        <View>
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 4 }}>TBD</Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 4 }}>Diesel</Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 4 }}>91 Regular</Text>
        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 4 }}>Sorry, Tesla & Lamborghini <Icon style={{ color: '#e60000'}} name='tag-faces' size={14} /></Text>
        </View>
      {
        /*
          <View style={{ padding: 8, borderColor: 'grey', borderBottomWidth: 1/PixelRatio.get()}} key={`his${i}`} >
            <TouchableOpacity onPress={() => { uistore.region.updatePoint(row.latitude, row.longitude); Actions.Main() }}>
              <Text style={{ fontSize:16, marginBottom: 4 }}><Text style={{color: '#ff8c0b'}}>${row.price}</Text>/L on {row.date.format('MMMM DD, h:mm:ss a')}</Text>
              <Text style={{ fontSize:12, color: '#444'}}>{row.name} @ {row.vicinity}</Text>
            </TouchableOpacity>
          </View>
        ))
        */
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
      </View>
    )
  }
}

export default Settings;
