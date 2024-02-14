import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import FouterMap from './maps/FouterMap';
const GOOGLE_MAPS_APIKEY = "AIzaSyAcq7ba-UVWTTVI3z3jkP7EU8ZaGb-e5rU";
import { btiment } from './Batiments';
import MapViewDirections from 'react-native-maps-directions';
import HeaderMap from './maps/HeaderMap';
const MapBeta = () => {
    const[laodingb,setLaodingb]=useState(true);
    const[changeButton,setChangeButton]=useState(false);
    const[laoding,setLaoding]=useState(true);



    const [directions, setDirections] = useState([]);
    const [distanceTotale, setDistanceTotale] = useState([]);
    const [duree, SetDuree] = useState([]);

    const [currentInstruction, setCurrentInstruction] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [userLocation, setUserLocation] = useState(null);
  const [compassHeading, setCompassHeading] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [distanceInfo, setDistanceInfo] = useState(null);
  const [instructions, setInstructions] = useState([]);
//derections steps 

  
  useEffect(() => {
    console.log("ddddddddddddddddddddddddddddddddd")
    if (userLocation && directions.length > 0 && currentStepIndex < directions.length && mapRef.current) {
      const currentStep = directions[currentStepIndex];
      const nextSteps = findNextSteps(directions, currentStep);
  
      setInstructions(nextSteps.map(step => ({
        instruction: step.html_instructions,
        distance: step.distance.text,
        icon: getIconForManeuver(step.maneuver),
      })));
      console.log("lllllllllllllllllll")

  if(instructions[0]){
    console.log("ttttttttttttttttttttttttttttttttttt")

    setLaoding(false);

  }
  if(laoding==false){
    if (instructions.length <= 1) {
        setChangeButton(true);
      }
  }
 
  //   console.log("les ssssssssssssssssssssss, ",instructions[1].instruction)
     
      // Mettre à jour la région de la carte pour afficher la première instruction
      mapRef.current.animateToRegion({
        latitude: currentStep.start_location.lat,
        longitude: currentStep.start_location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        heading: userLocation.heading || 0,
      }, 1000); // Animation de 1 seconde pour une transition douce
  
      // Check if map.current.animateToBearing is available before calling it

    }
  }, [userLocation, directions, currentStepIndex]);
  
  const findNextSteps = (steps, currentStep) => {
    if (!currentStep) {
      return [];
    }

    const currentIndex = steps.indexOf(currentStep);

    return steps.slice(currentIndex, currentIndex + 2); // Récupérer 4 étapes (3 suivantes après la position actuelle)
  };
  const mapRef = useRef(null);

  const renderMarkers = () => {
    return btiment.batiment["Importance Places"].map((location, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: location.location.latitude,
          longitude: location.location.longtitude,
        }}
        title={location.name}
        description={location.description}
        anchor={{ x: 0.5, y: 0.5 }}
        onPress={() => handleMarkerPress(location)}
      >
        <Callout>
          <View>
            <Text>{location.name}</Text>
            <Text>{location.description}</Text>
         
          </View>
        </Callout>
      </Marker>
    ));
  };

  const handleMarkerPress = async (location) => {
    setSelectedLocation(location);
    console.log("vvvvvvvvvvvvvvvvvvvv",selectedLocation)
    if (userLocation) {
      const apiKey = 'VOTRE_CLE_API_GOOGLE_MAPS';
      const origin = `${userLocation.latitude},${userLocation.longitude}`;
      const destination = `${location.location.latitude},${location.location.longtitude}`;

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`
        );

        const distanceText = response.data.rows[0].elements[0].distance.text;
        const durationText = response.data.rows[0].elements[0].duration.text;

        setDistanceInfo({ distance: distanceText, duration: durationText });


        console.log("sssssssssssssssed",distanceInfo)
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de distance :', error);
      }
      axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: `${userLocation.latitude},${userLocation.longitude}`,
          destination: `${selectedLocation.location.latitude},${selectedLocation.location.longtitude}`,
          key: GOOGLE_MAPS_APIKEY,
          mode: 'walking',  // Ajoutez le mode de déplacement 'walking'
        },
      })
      .then(response => {
        const steps = response.data.routes[0].legs[0].steps;
        setDirections(steps);
  console.log("derections est ",directions)
        // Ajuster la carte aux coordonnées de l'itinéraire
    /*     mapRef.current.fitToCoordinates(
          steps.map(step => ({ latitude: step.start_location.lat, longitude: step.start_location.lng })),
          { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
        ); */
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des étapes du parcours:', error.message);
      });
    }
    

  };

  // Reste du code inchangé

  useEffect(() => {
    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (location) => {
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            heading: location.coords.heading || 0,
          });
        }
      );

      Location.watchHeadingAsync((heading) => {
        setCompassHeading(heading.trueHeading || 0);
      });
    };

    startLocationUpdates();
  }, []);

  const handleCompassPress = () => {
    // Centrer la carte sur la position de l'utilisateur avec une orientation vers le nord
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        1000
      );
    }
  };
  const getIconForManeuver = (maneuver) => {
    // Fonction pour obtenir l'icône appropriée en fonction du type de manoeuvre
    switch (maneuver) {
      case 'turn-right':
        return 'arrow-forward';
      case 'turn-left':
        return 'arrow-back';
      default:
        return 'arrow-forward'; // Utilisation d'une flèche vers l'avant par défaut
    }}
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          ref={mapRef}
          initialRegion={{
            latitude: btiment.batiment["Importance Places"][0].location.latitude,
            longitude: btiment.batiment["Importance Places"][0].location.longtitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          rotateEnabled={true} // Permet à la carte de tourner manuellement
        >
          {renderMarkers()}

          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title={'Votre position'}
              anchor={{ x: 0.5, y: 0.5 }}
              rotation={compassHeading} // Rotation basée sur l'orientation de la boussole
            >
              {/* Vous pouvez personnaliser l'icône de la position ici */}
              <FontAwesome name="map-marker" size={24} color="blue" />
            </Marker>
          )}
          {userLocation && selectedLocation && (
          <MapViewDirections
            origin={userLocation}
            destination={{
              latitude: selectedLocation.location.latitude,
              longitude: selectedLocation.location.longtitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={7}
            strokeColor="green"
            mode="WALKING"
      /*        onReady={(result) => {
                SetDuree(result.duration)
                setDistanceTotale(result.distance)
                if(distanceTotale){
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} min.`);
                    console.log(`waypoints : ${result.coordinates} .`);
                     setLaodingb(false)
              
                }
     
            }}  */
          />
        )}
        </MapView>
        {distanceInfo && (
                <FouterMap distanceT={distanceInfo.distance} durre={distanceInfo.duration}/>
          
            )}
              {laoding ? null :   <HeaderMap
          name={instructions[0].instruction}
          icon={instructions[0].icon}
          distance={instructions[0].distance}
          suivant={instructions.length > 1 ? instructions[1].icon : 'icon-for-end'}
        />}

        {/* Bouton de boussole */}
        <TouchableOpacity
          style={{
            position: 'absolute', 
            top: 20,
            right: 20,
            backgroundColor: 'rgba(255,255,255,0.7)',
            padding: 10,
            borderRadius: 30,
          }}
          onPress={handleCompassPress}
        >
          <FontAwesome name="compass" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MapBeta;
