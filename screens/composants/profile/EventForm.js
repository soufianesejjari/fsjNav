import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,SafeAreaView,FlatList} from 'react-native';
import { collection, getDocs, getFirestore ,addDoc, updateDoc, query, where, arrayUnion, arrayRemove,serverTimestamp} from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { btiment } from '../../../firebaseServices/Batiments';



const EventForm = () => {
  const batiment=btiment.batiment
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    // Format the date if needed
    const formattedDate = date.toISOString(); // Adjust the format as per your requirement
  
    // Extract the time from the date and format it as HH:mm
    const formattedTime = `${date.getHours()}h:${date.getMinutes()}min`;
  
    setEventDate(date); // Store the entire date as a Date object
    setEventHeure(formattedTime); // Store the formatted time as a string
  
    hideDatePicker();
  };
  
    const firestore=getFirestore()

    const [error, setError] = useState('');
    const [succces, setSuccces] = useState('');

    const [laoding, setLaoding] = useState(false);

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [departement, setDepartement] = useState('');

  const [eventLocationName, setEventLocationName] = useState('');

  const [eventLocationLatitude, setEventLocationLatitude] = useState('');
  const [eventLocationLongitude, setEventLocationLongitude] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
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
      const dd=new Date(eventDate);
      console.log("dates est ",dd)
      return;
    }
    setLaoding(true)

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
        createdAt: serverTimestamp(), // Add createdAt field with the server timestamp

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
    //  setEventDate('');
      setEventHeure('');
      setEventImage('');
      setError('');
      setSuccces('Evenement Bien ajouté ')
      setLaoding(false)


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
    const [matchingLocations, setMatchingLocations] = useState([]);
    const [isFlatListVisible, setIsFlatListVisible] = useState(false);
  
    const showFlatList = () => {
      setIsFlatListVisible(true);
    };
  
    const searchLocation = (locationName) => {
      setEventLocationName(locationName)
      const flattenLocations = Object.values(batiment).reduce((acc, category) => {
        return acc.concat(category);
      }, []);
  
      const results = flattenLocations.filter((location) =>
      location.description &&  location.description.toLowerCase().includes(locationName.toLowerCase())
      );
  
      setMatchingLocations(results);
    };
  
    const handleLocationSelect = (selectedLocation) => {
      console.log("eeeeeeeeeeeeeeeeeeeee ",selectedLocation)
      setEventLocationName(selectedLocation.name);
      setEventLocationLatitude(String(selectedLocation.location.latitude));
      setEventLocationLongitude(String(selectedLocation.location.longtitude));

      setMatchingLocations([]); // Clear the matching locations after selection
      setIsFlatListVisible(false); // Hide the FlatList after selection
    };
  
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.header}>


          <Text style={styles.title}>Ajouter evenement </Text>
        </View>
        <View style={styles.form}>

        <View style={styles.input}>
            <Text style={styles.inputLabel}>Nom de l'événement</Text>
            <TextInput
                style={styles.inputControl}
                value={eventName}
              onChangeText={(text) => setEventName(text)}
              placeholder="Entrez le nom de l'événement"
              placeholderTextColor="#a3a3a3"
            />
          </View>
  
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Description de l'événement</Text>
            <TextInput
              style={[styles.inputControl, styles.multiline]}
              value={eventDescription}
              onChangeText={(text) => setEventDescription(text)}
              multiline
              placeholder="Entrez la description de l'événement"
              placeholderTextColor="#a3a3a3"
            />
          </View>
  
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Nom de l'emplacement</Text>
            <TextInput
              style={styles.inputControl}
              value={eventLocationName}
              onFocus={showFlatList}
              onChangeText={(text) => searchLocation(text)}
              placeholder="Entrez le nom de l'emplacement"
              placeholderTextColor="#a3a3a3"
            />
          </View>
  
          {isFlatListVisible && (
            <FlatList
              style={styles.dropdown}
              data={matchingLocations}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleLocationSelect(item)}>
                  <Text style={styles.dropdownItem}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
  
          <Text style={styles.inputLabel}>departement d'evenement</Text>
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
  
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Durée</Text>
            <TextInput
              style={styles.inputControl}
              value={eventDuration}
              onChangeText={(text) => setEventDuration(text)}
              placeholder="Entrez la durée de l'événement"
              placeholderTextColor="#a3a3a3"
            />
          </View>
  
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Date de l'événement</Text>
  
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                onFocus={showDatePicker}
                style={styles.inputControl}
                value={eventDate.toLocaleDateString() + ' à ' + eventHeure}
                onChangeText={showDatePicker}
                placeholder="Entrez la date exemple : 16/02/2024"
                placeholderTextColor="#a3a3a3"
              />
            </TouchableOpacity>
          </View>
  
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Image (URL)</Text>
            <TextInput
              style={styles.inputControl}
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
          {laoding ? (
            <View style={styles.successMessage}>
              <Text style={styles.errorText}>
                {succces ? succces : 'Ajoutement encours'}{' '}
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
              <Text style={styles.addButtonLabel}>Ajouter l'événement</Text>
            </TouchableOpacity>
          )}
                    </View>

        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 24,
   //   paddingBottom:5,
      paddingHorizontal: 0,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      backgroundColor:"#e8ecf4",
    },
    header: {
      paddingTop:20,
      paddingHorizontal: 24,
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 9999,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      marginBottom: 16,
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      color: '#FF8911',
      marginBottom: 26,
    },
    /** Form */
    form: {
      paddingHorizontal: 24,
    },
    formAction: {
      marginVertical: 24,
    },
    formFooter: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: '400',
      color: '#9fa5af',
      textAlign: 'center',
    },
    /** Input */
    input: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#1c1c1e',
      marginBottom: 6,
    },
    inputControl: {
      height: 44,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 15,
      fontWeight: '500',
      color: '#24262e',
    },
    /** Button */
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderWidth: 1,
      backgroundColor: '#7F27FF',
      borderColor: '#7F27FF',
    },
    btnText: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: 'bold',
      color: '#fff',
    },
    roleButtons: {
      flexDirection: 'row',
      marginTop: 8,
    },
    roleButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 8,
    },
    selectedRoleButton: {
      backgroundColor: '#FD6B68',
      borderColor: '#FD6B68',
    },
    roleButtonText: {
      color: '#1c1c1e',
    },
    errorContainer: {
      backgroundColor: '#ffccc7',
      padding: 8,
      borderRadius: 8,
      marginBottom: 16,
    },
    errorText: {
      textAlign:'center',
      color: '#ff4d4f',
      fontWeight: 'bold',
    },
    errorTextt: {
      color: 'blue',
      fontWeight: 'bold',
    },
     buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
    },
    successMessage: {
      textAlign:'center',
  
      fontSize: 18,
      color: 'green',
      textAlign: 'center',
    },
    dropdown: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      marginBottom: 16,
    },
    dropdownItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#333333',
    },
    picker: {
      height: 44,
      backgroundColor: '#FFFFFF',
      marginBottom: 16,
      borderRadius: 10,
      fontSize: 16,
      color: '#333333',
    },
    dateInput: {
      height: 44,
      backgroundColor: '#FFFFFF',
      marginBottom: 16,
      borderRadius: 10,
      fontSize: 16,
      color: '#333333',
      justifyContent: 'center',
    },
    addButton: {
      backgroundColor: '#FF8911',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    addButtonLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    errorContainer: {
      backgroundColor: '#FF4D4F',
      padding: 8,
      borderRadius: 8,
      marginBottom: 16,
    },
    errorText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    successContainer: {
      backgroundColor: '#52C41A',
      padding: 8,
      borderRadius: 8,
      marginBottom: 16,
    },
    successText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    
  });
  
  export default EventForm;