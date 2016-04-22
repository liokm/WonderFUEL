'use strict';
/**
 * @flow
 */

import React, {
  NetInfo,
  Dimensions,
  AppRegistry,
  Navigator,
  View,
  Alert,
  Text} from 'react-native';

import { observable, asStructure, asReference } from 'mobx';
import { observer } from 'mobx-react/native';
import moment from 'moment';

const LANDSCAPE = 'LANDSCAPE';
const PORTRAIT = 'PORTRAIT';

class GasStation {
  @observable id:string;
  @observable name:string;
  @observable vicinity:string;
  @observable rating:string;
  @observable location = {
    lat: null,
    lng: null
  }

  constructor({id, name, rating, vicinity, geometry: { location }}) {
    Object.assign(this, {id, name, vicinity, rating, location});
  }
}

class UIStore {
  @observable width:number = 0;
  @observable height:number = 0;
  @observable orientation:string = PORTRAIT;
  // XXX: Kelvin convinced me not to use realm.io, YES SIR!
  mem_stations = {};
  // @observable liked_stations = [];
  liked_stations = [];
  history = [];

  region = observable({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
    stations: [],

    updatePoint: asReference(function(latitude, longitude) {
      // uistore.region.latitude = latitude;
      // uistore.region.longitude = longitude;
      // this.latitude = latitude;
      // this.longitude = longitude;
      Object.assign(this, {latitude, longitude});
      this.load();
    }),

    update: asReference(function(region) {
      Object.assign(this, region);
      this.load();
    }),

    toCurrent: asReference(function() {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => Object.assign(this, coords),
        error => { Alert.alert(`Can't get the location.\nPlease check the settings to allow the access.`) },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }),

    distance: asReference(function(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;

      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }),

    load: asReference(function(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const radius = this.distance(this.latitude, this.longitude, this.latitude + this.latitudeDelta, this.longitude + this.longitudeDelta) * 1000;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.latitude},${this.longitude}&radius=${radius}&type=gas_station&key=AIzaSyBadH6rJAYCU22EBfeZO2gFXMa7h3HTRG0`;
      // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.latitude},${this.longitude}&radius=${radius}&type=gas_station&key=AIzaSyAnPuKVARCaBlMbCiVL2vy9Ao7m4qJQTW8`;
      console.log(url);

      fetch(url)
      .then(data => data.json())
      .then(({results, status}) => {
        if (status == 'OK') {
          results.forEach(({id, name, vicinity, geometry: { location: {lat, lng}}}) => {
            // XXX: update in memory and fake data!!!
            if (!(id in uistore.mem_stations)) {
              const price_diesel = getRandomInt(80, 120) + .9;
              uistore.mem_stations[id] = {name, vicinity, latitude: lat, longitude: lng, price_diesel, price_91: getRandomInt(130, 190) + .9, price_95: getRandomInt(150, 240) + .9, isLiked: false};
              if (Math.random() > 0.8) {
                uistore.liked_stations.push(id);
              }
              if (Math.random() > 0.8) {
                uistore.history.push({id, price: price_diesel, date: moment()});
              }
            }
          });
          this.stations.replace(results.map(item => new GasStation(item)));
          // console.log(uistore.mem_stations);
        }
      })
      .catch(error => Alert.alert(`Can't load data. Please check you internet connection.`))

    })
  });

  setup() {
    this.region.toCurrent();
  }

  teardown() {

  }

  onLayout({nativeEvent: {layout: {width, height}}}) {
    this.width = width;
    this.height = height;
    this.orientation = width > height? LANDSCAPE: PORTRAIT;
  }
}

export const uistore = new UIStore();
