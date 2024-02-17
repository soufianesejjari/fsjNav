import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, View, Switch } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';  // Importez votre hook de thème
import LatestEvents from './composants/LatestEvents';

const Home = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Obtenez l'état du thème et la fonction pour basculer le mode sombre

  const departements = [
    { id: 1, title: 'Informatique', content: '5 événements', image: require('../assets/info.jpg') },
    { id: 2, title: 'Mathématiques', content: '5 événements', image: require('../assets/math.jpg') },
    { id: 3, title: 'Physique', content: '5 événements', image: require('../assets/pc.jpg') },
    { id: 4, title: 'Chimie', content: '5 événements', image: require('../assets/chimie.jpg') },
    { id: 5, title: 'Géologie', content: '5 événements', image: require('../assets/geo.jpg') },
    { id: 6, title: 'Biologie', content: '5 événements', image: require('../assets/bio.jpg') },

  ];



  const renderDep = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.departementContainer}>
        <Image style={styles.departementImage} source={item.image} />
        <Text style={styles.departementTitle}>{item.title}</Text>
        <Text style={styles.departementContent}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEven = ({ item }) => (
<View style={styles.eventContainer}>
  <TouchableOpacity style={styles.eventTouchable} onPress={() => handleEventPress(item)}>
    <Image style={styles.eventImage} source={item.image} />
    <View style={styles.overlay}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.dateE}</Text>
    </View>
  </TouchableOpacity>
</View>
  );

  return (
    <SafeAreaView style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <ScrollView>
        {/* Nouvelle section : Carte de la faculté */}
        <View style={isDarkMode ? styles.darkFacultyCardContainer : styles.lightFacultyCardContainer}>
          <Text style={styles.facultyCardTitle}>Faculté des Sciences, El Jadida</Text>
          <Text style={styles.facultyCardDescription}>
            Bienvenue à la Faculté des Sciences à El Jadida. Explorez des événements passionnants et des départements dans le
            domaine des sciences et de la technologie.
          </Text>
        </View>

        {/* Section Départements */}
        <View style={isDarkMode ? styles.darkDepartmentsContainer : styles.lightDepartmentsContainer}>
  <Text style={ isDarkMode ? styles.departmentsHeader : styles.departmentsHeaderH}>Explorez les Départements 🌟</Text>
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={departements}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderDep}
    contentContainerStyle={styles.departmentsList}
  />
</View>

        {/* Section Événements Importants */}
        <View style={isDarkMode ? styles.darkTopEventsContainer : styles.lightTopEventsContainer}>
{/*           <Text style={styles.importantEventsText}>Événements Importants</Text>
  {/*          <FlatList
            horizontal
            data={topEvents}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={renderEven}
          /> */}
          <LatestEvents navigation={navigation}/>
          
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
  //  marginTop:15,
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  darkContainer: {
    //marginTop:30,

    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  lightFacultyCardContainer: {
    backgroundColor: '#7F27FF',
    borderRadius: 15,
    padding: 20,
    margin: 12,
    marginTop:30,
    marginBottom:2,
  },
  darkFacultyCardContainer: {
    backgroundColor: '#4B5563',
    borderRadius: 15,
    padding: 20,
    margin: 12,
    marginTop:30,
    marginBottom:2,
  },
  facultyCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8911',
  },
  facultyCardDescription: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  darkDepartmentsContainer: {
    backgroundColor: '#1F2937', // Couleur de fond pour le mode sombre
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  lightDepartmentsContainer: {
    backgroundColor: '#e8ecf4', // Couleur de fond pour le mode clair
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  departmentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',// Couleur du texte pour le mode sombre
    marginBottom: 10,
  },
  departmentsHeaderH: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8911',// Couleur du texte pour le mode sombre
    marginBottom: 10,
  },
  departmentsList: {
    flexGrow: 1,
  },
  departmentsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#374151',
  },
  departementContainer: {
    marginBottom: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  departementImage: {
    height: 130,
    width: 120,
    borderRadius: 15,
  },
  departementTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  departementContent: {
    fontSize: 14,
    color: '#6B7280',
  },
  lightTopEventsContainer: {
    backgroundColor: '#e8ecf4',
    //padding: 10,
    paddingHorizontal:12,
    marginBottom: 15,
    height: 200,
  },
  darkTopEventsContainer: {
    backgroundColor: '#374151',
    padding: 10,
    marginBottom: 30,
    height: 200,
  },
  importantEventsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginLeft: 10,
  },
  eventContainer: {
    marginRight: 10,
    alignContent:"center",
    alignItems:'center',
    justifyContent:'center',
  },
  eventImage: {
    width: 280,
    height: 180,
    borderRadius: 15,
  },
  iconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  eventTitle: {
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#374151',
  },
  eventDate: {
    textAlign: 'right',
    marginRight: 20,
    fontSize: 14,
    color: '#6B7280',
  },
  darkModeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  darkModeToggleText: {
    marginRight: 10,
    fontSize: 16,
    color: 'black', // Changer la couleur du texte en fonction de votre design
  },
});

export default Home;
