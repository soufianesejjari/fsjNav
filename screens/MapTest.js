import React, { useRef, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';
import { StyleSheet, SafeAreaView ,Button,Text,View} from "react-native";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; // Importer les icônes de Material Icons
import OptionM from "./composants/maps/OptionsM";


const GOOGLE_MAPS_APIKEY = "AIzaSyAcq7ba-UVWTTVI3z3jkP7EU8ZaGb-e5rU";

export default function MapTest({ route }) {
  const { data } = route.params;

  const [userLocation, setUserLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: data.latitude,
    longitude: data.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    heading: 0,
  });

  useEffect(() => {
    const fetchUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        heading: location.coords.heading || 0,
      });

      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const updateHeading = ({ heading }) => {
      setRegion((prevRegion) => ({
        ...prevRegion,
        heading: heading || 0,
      }));
    };

    Location.watchHeadingAsync(updateHeading);

    return () => {
      Location.stopWatchingHeadingAsync();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          minZoomLevel={17}
          maxZoomLevel={20}
          mapType="hybrid"
          style={{ flex: 1 }}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={'titre de emplacement'}
            description={'FSJ ' + 'titre d emplacement'}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  instructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    borderRadius: 10,
    margin: 10,
  },
  instructionItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  instructionTextContainer: {
    marginLeft: 10,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  distanceText: {
    fontSize: 14,
    color: '#666666',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});