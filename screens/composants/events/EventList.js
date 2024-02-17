import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { collection, getDocs, getFirestore ,doc, updateDoc, query, where, arrayUnion, arrayRemove, orderBy} from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';





export default function EventList({navigation}) {
  const {isDarkMode}=useTheme()

  
// Function to save an event to local storage
const saveEventToLocal = async (eventData) => {
  try {
    const storedEvents = await AsyncStorage.getItem('storedEvents');
    const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];

    // Check if the event is already in local storage based on some identifier
    const isEventStored = parsedEvents.some((event) => event.id === eventData.id);

    if (!isEventStored) {
      const updatedEvents = [...parsedEvents, eventData];
      await AsyncStorage.setItem('storedEvents', JSON.stringify(updatedEvents));
      console.log('Événement ajouté au stockage local');
    } else {
      console.log('Événement déjà présent dans le stockage local');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'événement au stockage local :', error);
  }
};

// Function to remove an event from local storage
const removeEventFromLocal = async (eventId) => {
  try {
    const storedEvents = await AsyncStorage.getItem('storedEvents');
    const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];

    const updatedEvents = parsedEvents.filter((event) => event.id !== eventId);
    await AsyncStorage.setItem('storedEvents', JSON.stringify(updatedEvents));
    console.log('Événement supprimé du stockage local');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement du stockage local :', error);
  }
};
   /*  const addSavedEventToUserCollection = async (eventId) => {
        try {
          const emailUser = getAuth().currentUser.email;
      
          const querySnapshot = await getDocs(query(collection(firestore, 'users'), where('email', '==', emailUser)));
          
          if (querySnapshot.size > 0) {
            const docRef = querySnapshot.docs[0].ref;
      
            await updateDoc(docRef, {
              eventsLike: arrayUnion(eventId)
            });
      
            console.log("Événement ajouté à la collection de l'utilisateur");
          } else {
            console.error("Utilisateur non trouvé dans la collection 'users'");
          }
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'événement à la collection de l'utilisateur :", error);
        }
      };
      
      const RemoveSavedEventToUserCollection = async (eventId) => {
        try {
          const emailUser = getAuth().currentUser.email;
      
          const querySnapshot = await getDocs(query(collection(firestore, 'users'), where('email', '==', emailUser)));
          
          if (querySnapshot.size > 0) {
            const docRef = querySnapshot.docs[0].ref;
      
            await updateDoc(docRef, {
              eventsLike: arrayRemove(eventId)
            });
      
            console.log("Événement suprimé de la collection de l'utilisateur");
          } else {
            console.error("Utilisateur non trouvé dans la collection 'users'");
          }
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'événement à la collection de l'utilisateur :", error);
        }
      }; */
      



      
    const formatDateTime = (timestampSeconds) => {
        const dateTime = new Date(timestampSeconds * 1000);
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
      
        return dateTime.toLocaleString('fr-FR', options);
      };

    const [savedEvents, setSavedEvents] = useState([]);
    const [events, setEvents] = useState([]);

const firestore=getFirestore()
useEffect(() => {
  const fetchData = async () => {
    try {
      // Update the query to order events by the automatically generated 'createdAt' field
      const querySnapshot = await getDocs(
        query(collection(firestore, 'Events'), orderBy('eventDate', 'desc'))
      );

      const eventsData = [];

      querySnapshot.forEach((doc) => {
        // Ajoutez les données de chaque document à un tableau
        console.log(`${doc.id} =>`, doc.data());

        eventsData.push({ id: doc.id, ...doc.data() });
      });

      // Mettez à jour l'état avec les données récupérées
      setEvents(eventsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  // Call the fetchData function
  fetchData();
}, []);



  const  toggleSavedEvent = async (index) => {

        const newSavedEvents = [...savedEvents];
        newSavedEvents[index] = !newSavedEvents[index];
        setSavedEvents(newSavedEvents);
      
        if (newSavedEvents[index]) {
          // Si l'utilisateur a cliqué sur "Save", ajoutez l'événement à sa collection
          await saveEventToLocal(events[index]);
        } else {
          // Ajoutez le code pour gérer la suppression de l'événement de la collection de l'utilisateur
          // si l'utilisateur clique sur "Unsave"
          await removeEventFromLocal(events[index].id);

          
        }

 
  };
  const formatEventDate = (timestamp) => {
    const dateObject = timestamp.toDate(); // Convert Timestamp to Date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('fr-FR', options);
    return formattedDate;
  };

  return (
    <View style={{ flex:1 ,backgroundColor:  isDarkMode ? '#1F2937' : '#e8ecf4' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Events </Text>

        {events.map(({ eventDate, durré, eventDuration, eventName ,eventImage ,departement}, index) => {
            const saved = savedEvents[index];
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('EventMain', { eventData: events[index] });
                
              }}>
              <View style={[styles.card,{ backgroundColor: isDarkMode ? '#1F2937' : '#F9F9F9' }] }>
                <View style={styles.cardLikeWrapper}>
                  <TouchableOpacity key={index}

                onPress={() => toggleSavedEvent(index)}>
                    <View style={[styles.cardLike,{ backgroundColor: isDarkMode ? 'rgba(253, 191, 96,0.2)' : '#fff' }]}>
                      <FontAwesome
                        color={saved ? '#FF8911' : '#222'}
                        name="heart"
                        solid={saved}
                        size={22} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardTop}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    style={styles.cardImg}
                    source={{ uri: eventImage}} />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={[styles.cardTitle,{ color: isDarkMode ? '#7F27FF' : '#232425' }]}>{eventName}</Text>

           
                  </View>

                  <View style={styles.cardFooter}>
                    <FontAwesome
                      color="#FF8911"
                      name="star"
                      solid={true}
                      size={12}
                      style={{ marginBottom: 2 }} />

<Text style={[styles.cardStars,{ color: isDarkMode ? '#7F27FF' : '#232425' }]}
>{formatEventDate(eventDate)}</Text>

                    <Text style={styles.cardReviews}>({eventDuration})</Text>
                    <Text style={{ fontWeight: '600' ,marginLeft:60, color:'#FF8911'}}>{departement}</Text>

                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#7F27FF',
    marginBottom: 12,
  },
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#232425',

  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '400',
    color: '#7F27FF',
    marginLeft:10,
    textAlign: 'right', // Utilisez 'right' pour aligner le texte à droite
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#232425',
  },
  cardReviews: {
    fontSize: 14,
    fontWeight: '400',
    color: '#595a63',
  },
});