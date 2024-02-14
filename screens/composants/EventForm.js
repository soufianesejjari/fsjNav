import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,SafeAreaView} from 'react-native';
import { collection, getDocs, getFirestore ,addDoc, updateDoc, query, where, arrayUnion, arrayRemove} from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';


const EventForm = () => {

    const firestore=getFirestore()

    const [error, setError] = useState('');

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [departement, setDepartement] = useState('');

  const [eventLocationName, setEventLocationName] = useState('');

  const [eventLocationLatitude, setEventLocationLatitude] = useState('');
  const [eventLocationLongitude, setEventLocationLongitude] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventHeure, setEventHeure] = useState('');

  const [eventImage, setEventImage] = useState('');


  const departments = [
    'Mathématiques',
    'Informatique',
    'Physique',
    'Chimie',
    'Géologie',
    'Biologie',
  ];
  const handleAddEvent = async () => {
    if (!eventName || !eventDescription || !eventLocationName || !eventLocationLatitude || !eventLocationLongitude || !eventDuration || !eventDate || !eventImage) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const eventData = {
        eventName,
        eventDescription,
        departement,
        eventLocation: {
          name: eventLocationName,
          latitude: eventLocationLatitude,
          longitude: eventLocationLongitude,
        },
        eventDuration,
        eventDate,
        eventHeure,
        eventImage,
      };

      const docRef = await addDoc(collection(firestore, 'Events'), eventData);
      console.log('Document written with ID: ', docRef.id);

      // Reset the fields and error message after adding the event
      setEventName('');
      setEventDescription('');
      setDepartement('');
      setEventLocationName('');
      setEventLocationLatitude('');
      setEventLocationLongitude('');
      setEventDuration('');
      setEventDate('');
      setEventHeure('');
      setEventImage('');
      setError('');
    } catch (e) {
      console.error('Error adding document: ', e);
      setError('Une erreur s\'est produite lors de l\'ajout de l\'événement.');
    }
  };
    // Reset the fields after adding the event
    // setEventName('');
    // setEventDescription('');
    // setEventLocationName('');
    // setEventLocationLatitude('');
    // setEventLocationLongitude('');
    // setEventDuration('');
    // setEventDate('');
    // setEventImage('');


  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>Nom de l'événement</Text>
        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={(text) => setEventName(text)}
          placeholder="Entrez le nom de l'événement"
          placeholderTextColor="#a3a3a3"
        />
      </View>

      <View>
        <Text style={styles.label}>Description de l'événement</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={eventDescription}
          onChangeText={(text) => setEventDescription(text)}
          multiline
          placeholder="Entrez la description de l'événement"
          placeholderTextColor="#a3a3a3"
        />
      </View>

      <View>
        <Text style={styles.label}>Nom de l'emplacement</Text>
        <TextInput
          style={styles.input}
          value={eventLocationName}
          onChangeText={(text) => setEventLocationName(text)}
          placeholder="Entrez le nom de l'emplacement"
          placeholderTextColor="#a3a3a3"
        />
      </View>


      <Text style={styles.label}>departement d'evenement</Text>
      <Picker
        selectedValue={departement}
        onValueChange={(itemValue, itemIndex) => setDepartement(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez un département" value="" />
        {departments.map((department, index) => (
          <Picker.Item key={index} label={department} value={department} />
        ))}
      </Picker>

      <View style={styles.locationRow}>
        <View style={styles.locationInputContainer}>
          <Text style={styles.label}>Latitude de l'emplacement</Text>
          <TextInput
            style={styles.input}
            value={eventLocationLatitude}
            onChangeText={(text) => setEventLocationLatitude(text)}
            placeholder="Entrez la latitude"
            placeholderTextColor="#a3a3a3"
          />
        </View>

        <View style={styles.locationInputContainer}>
          <Text style={styles.label}>Longitude de l'emplacement</Text>
          <TextInput
            style={styles.input}
            value={eventLocationLongitude}
            onChangeText={(text) => setEventLocationLongitude(text)}
            placeholder="Entrez la longitude"
            placeholderTextColor="#a3a3a3"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Durée</Text>
        <TextInput
          style={styles.input}
          value={eventDuration}
          onChangeText={(text) => setEventDuration(text)}
          placeholder="Entrez la durée de l'événement"
          placeholderTextColor="#a3a3a3"
        />
      </View>

      <View>
        <Text style={styles.label}>Date de l'événement</Text>
        <TextInput
          style={styles.input}
          value={eventDate}
          onChangeText={(text) => setEventDate(text)}
          placeholder="Entrez la date de l'événement"
          placeholderTextColor="#a3a3a3"
        />
      </View>
      <View>
        <Text style={styles.label}>heure de l'evenement </Text>
        <TextInput
          style={styles.input}
          value={eventHeure}
          onChangeText={(text) => setEventHeure(text)}
          placeholder="Exemple :  08:30"
          placeholderTextColor="#a3a3a3"
        />
      </View>
      <View>
        <Text style={styles.label}>Image (URL)</Text>
        <TextInput
          style={styles.input}
          value={eventImage}
          onChangeText={(text) => setEventImage(text)}
          placeholder="Entrez l'URL de l'image"
          placeholderTextColor="#a3a3a3"
        />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonLabel}>Ajouter l'événement</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    color: '#333',
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  picker: {
    height: 40,
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom:40,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: '#ff4d4f',
  },  errorContainer: {
    backgroundColor: '#ffccc7',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#ff4d4f',
    fontWeight: 'bold',
  },
});

export default EventForm;
