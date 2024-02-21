import React, { useRef, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';
import { StyleSheet, SafeAreaView ,Button,Text,View} from "react-native";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; // Importer les icônes de Material Icons
import HeaderMap from "./maps/HeaderMap";
import FouterMap from "./maps/FouterMap";
import EtapesList from "./maps/EtapesList";


const GOOGLE_MAPS_APIKEY = "AIzaSyAcq7ba-UVWTTVI3z3jkP7EU8ZaGb-e5rU";

export default function Map({ route}) {
    const[laoding,setLaoding]=useState(true);
    const[laodingb,setLaodingb]=useState(true);
    const[changeButton,setChangeButton]=useState(false);


    const {data}=route.params;
    const [directions, setDirections] = useState([]);
    const [distanceTotale, setDistanceTotale] = useState([]);
    const [duree, SetDuree] = useState([]);

    const [currentInstruction, setCurrentInstruction] = useState(null);
    const [instructions, setInstructions] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [showList, setSHowlist] = useState(false);
    const [finle,setFinle]=useState(false)
    const [userLocation, setUserLocation] = useState(null);
    const [region, setRegion] = useState({
    latitude: data.latitude,
    longitude: data.longtitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    heading: 0, // Ajout de l'orientation par défaut (0 degré)
  });


  const [rotationAngle,setRotationAngle]=useState()

  useEffect(() => {
    const fetchUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        heading: location.coords.heading || 0, // la direction si elle est disponible, sinon 0 degré par défaut
      });

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
        heading: location.coords.heading || 0,
      });
    };

    fetchUserLocation();
  }, []);

  const map = useRef(null);
  useEffect(() => {
    if (userLocation && map.current) {
      // Obtenir les étapes du parcours depuis l'API Directions de Google
      axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: `${userLocation.latitude},${userLocation.longitude}`,
          destination: `${data.latitude},${data.longtitude}`,
          key: GOOGLE_MAPS_APIKEY,
          mode: 'walking',  // Ajoutez le mode de déplacement 'walking'
          language: 'fr', // Définissez la langue sur le français

        },
      })
      .then(response => {
        const steps = response.data.routes[0].legs[0].steps;
        setDirections(steps);
  
        // Ajuster la carte aux coordonnées de l'itinéraire
        map.current.fitToCoordinates(
          steps.map(step => ({ latitude: step.start_location.lat, longitude: step.start_location.lng })),
          { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
        );
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des étapes du parcours:', error.message);
      });
    }
  }, [userLocation]);
  
  useEffect(() => {
    console.log("ddddddddddddddddddddddddddddddddd")
    if (userLocation && directions.length > 0 && currentStepIndex < directions.length && map.current) {
      const currentStep = directions[currentStepIndex];
      const nextSteps = findNextSteps(directions, currentStep);
  
      setInstructions(nextSteps.map(step => ({
        instruction: step.html_instructions,
        distance: step.distance.text,
        icon: getIconForManeuver(step.maneuver),
      })));

  if(instructions[0]){
    setLaoding(false);

  }
  if(laoding==false){
    if (instructions.length <= 2) {
        setChangeButton(true);
      }
      if (instructions[1]) {
        {
          if(instructions[1].icon == "location-on"){
            setFinle(true);

          }
        }
      }
  }

  //   console.log("les ssssssssssssssssssssss, ",instructions[1].instruction)
     
      // Mettre à jour la région de la carte pour afficher la première instruction
      map.current.animateToRegion({
        latitude: currentStep.start_location.lat,
        longitude: currentStep.start_location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        heading: userLocation.heading || 0,
      }, 1000); // Animation de 1 seconde pour une transition douce
  
      // Check if map.current.animateToBearing is available before calling it
      if (map.current.animateToBearing) {
        map.current.animateToBearing(rotationAngle);

        console.log("la rotation angle ! ",rotationAngle)
      }
    }
  }, [userLocation, directions, currentStepIndex, rotationAngle]);
  
/*   const getRotationAngle = (previousPosition, currentPosition) => {
    const x1 = previousPosition.latitude;
    const y1 = previousPosition.longitude;
    const x2 = currentPosition.latitude;
    const y2 = currentPosition.longitude;
  
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
  
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  };
 */

/*   const findClosestStep = (userLocation, steps) => {
    const threshold = 50; 

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const distance = calculateDistance(userLocation, step.start_location);

      if (distance < threshold) {
        return step;
      }
    }

    return null;
  }; */
  const findNextSteps = (steps, currentStep) => {
    if (!currentStep) {
      return [];
    }

    const currentIndex = steps.indexOf(currentStep);

    return steps.slice(currentIndex, currentIndex + 2); 
  };
  const calculateDistance = (location1, location2) => {
    const lat1 = location1.latitude;
    const lon1 = location1.longitude;
    const lat2 = location2.lat;
    const lon2 = location2.lng;

    const R = 6371000; // Rayon de la Terre en mètres
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };
  const onInstructionComplete = () => {
    setCurrentStepIndex(prevIndex => prevIndex + 1);
  };
  const handleList = () => {
    console.log(directions);
    setSHowlist(true);
  };
  const setCloseList= () => {
   
    setSHowlist(false);
  };

  //design..
  const getIconForManeuver = (maneuver) => {
    // Fonction pour obtenir l'icône appropriée en fonction du type de manoeuvre
    switch (maneuver) {
      case 'turn-right':
        return 'arrow-forward';
      case 'turn-left':
        return 'arrow-back';
      default:
        return 'arrow-forward'; 
    }
  };
  return (
    <SafeAreaView style={styles.container}>
            <View className="relative" style={styles.container}>
            {showList ?  <EtapesList directions={directions} setCloseList={setCloseList}/> : null } 

        <MapView
        ref={(current) => (map.current = current)}
        minZoomLevel={18} 
          maxZoomLevel={20}
          mapType="standard" //  "standard" pour le mode piéton
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        
          onUserLocationChange={(event) => {
            const { coordinate, heading } = event.nativeEvent;
        
      //  la région de la carte en fonction de la position et de l'orientation de l'utilisateur avec un délai de 5 secondes
      setTimeout(() => {

        setUserLocation({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          heading: heading || 0,
        });

        setRegion({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
          heading: heading || 0,
        });
      }, 5000); // Délai de 5 secondes
    }}
  

      >
        <Marker
          coordinate={{
            latitude: data.latitude,
            longitude: data.longtitude,
          }}
          title={"titre de emplacement"}
          description={"FSJ " + "titre d emplacement"}
          anchor={{ x: 0.5, y: 0.5 }}
          
        />
        {userLocation && (
          <MapViewDirections
            origin={userLocation}
            destination={{
              latitude: data.latitude,
              longitude: data.longtitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={7}
            strokeColor="#9F70FD"
            mode="WALKING"
            onReady={(result) => {
                SetDuree(result.duration)
                setDistanceTotale(result.distance)
                if(distanceTotale){
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} min.`);
                    console.log(`waypoints : ${result.coordinates} .`);
                     setLaodingb(false)
              
                }
     
            }}
          />
        )}
      </MapView>


    

        {laoding ? null :      <HeaderMap
          name={instructions.length > 0 ? instructions[0].instruction : ''}
          icon={ instructions.length > 0 ? instructions[0].icon : ''}
          distance={instructions.length > 0 ? instructions[0].distance : ''}
          suivant={instructions.length > 1 ? instructions[1].icon : 'location-on'}
        />}
                        
                        {laodingb ? null :          <FouterMap distanceT={distanceTotale} durre={duree} onInstructionComplete={onInstructionComplete} changeButton={changeButton} handleList={handleList}  />
}


        

{/*       <View style={styles.buttonContainer}>
        <Button title="Terminer l'instruction" onPress={onInstructionComplete} />
      </View> */}
      </View>

{/* <OptionM/> */}
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