import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const LatestEvents = ({ navigation }) => {
  const { isDarkMode } = useTheme(); // Utilisez le hook useTheme pour accéder à l'état du mode sombre
  const [latestEvents, setLatestEvents] = useState([]);
  const firestore=getFirestore()

  useEffect(() => {
      const fetchLatestEvents = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, 'Events'));
          const eventsData = [];
  
          querySnapshot.forEach((doc) => {
            // Ajoutez les données de chaque document à un tableau
            console.log(`${doc.id} =>`, doc.data());
  
            eventsData.push({ id: doc.id, ...doc.data() });
          });
  
          // Mettez à jour l'état avec les données récupérées
          setLatestEvents(eventsData);
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
  
      // Appelez la fonction pour récupérer les données lors du montage du composant
      fetchLatestEvents();
    }, []); // Assurez-vous de ne pas oublier la dépendance vide pour exécuter useEffect une seule fois
  
  // Utilisez useEffect pour charger les derniers événements depuis Firestore


  const handleEventPress = (event) => {
    // Naviguez vers la page d'événement individuel avec les données de l'événement
    navigation.navigate('EventMain', { eventData: event });
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={isDarkMode ? styles.darkEventContainer : styles.lightEventContainer}
      onPress={() => handleEventPress(item)}>
              <View style={styles.imageContainer}>

      <Image style={styles.eventImage} source={{ uri: item.eventImage }} />
      <View style={styles.overlay}>
        <Text style={styles.eventTitle}>{item.eventName}</Text>
        <Text style={styles.eventDate}>{item.eventDate}</Text>
      </View>
      </View>

    </TouchableOpacity>
  );

  return (
    <View >
      <Text style={isDarkMode? styles.sectionTitleD:  styles.sectionTitle}>Derniers événements</Text>
      <FlatList
        horizontal
        data={latestEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#7F27FF',

  },
  sectionTitleD: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#FF8911',

  },
  lightEventContainer: {
    margin: 5,
    marginLeft:8,
    borderRadius: 12,
    overflow: 'hidden',
    alignContent:'center',
    textAlign:'center',
    backgroundColor:'#e8ecf4',
    justifyContent:'center',
  },
  darkEventContainer: {
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: '#6366f1',
    borderWidth: 1,
  },
  eventImage: {
    width: 290,
    height: 150,
    borderRadius: 12,
    justifyContent: 'flex-end',

  },
 overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'flex-end',  // Conservez uniquement cette ligne
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8911',
  },
  eventDate: {
    fontSize: 14,
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center', // Centrer l'image
  },
});

export default LatestEvents;
