import React, { useState,useRef } from 'react';
import { TextInput,View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Animated } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RechercheP from './Rechrechep';
import NavBar from '../../nav/navBar';
import { btiment } from './Batiments';
import { useTheme } from '../../ThemeContext'; // Importez votre hook de thème


    function Places({navigation}) {
      const scrollY = useRef(new Animated.Value(0)).current;


  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

        const { isDarkMode } = useTheme(); // Obtenez l'état du thème


    const [searchText, setSearchText] = useState('');

    const [selectedBlocks, setSelectedBlocks] = useState([]);
    const handleBlockPress = (block) => {
        console.log("blok est , ",block.title) 
        const blockIndex = selectedBlocks.findIndex(selectedBlock => selectedBlock.title === block.title);
    
        if (blockIndex !== -1) {
          const newSelectedBlocks = [...selectedBlocks];
          newSelectedBlocks.splice(blockIndex, 1);
          setSelectedBlocks(newSelectedBlocks);
        } else {
          setSelectedBlocks([...selectedBlocks, block]);
    
    
          console.log("bloggggggggggggggg",selectedBlocks)
        }
      };
  

      const data = Object.entries(btiment.batiment).map(([category, items]) => ({
        title: category,
        data: items,
      }));
    
        const renderItem = ({ item }) => {


    const blockIndex = selectedBlocks.findIndex(selectedBlock => selectedBlock.title === item.title);
    if(blockIndex === -1){
        return(
            <>
                
        
                <TouchableOpacity onPress={() => handleBlockPress(item)}>
  <View style={[styles.statsItem, blockIndex !== -1 && styles.selectedBlock,{ backgroundColor: isDarkMode ? '#1F2937' : '#F9F9F9' }]}>
    <FeatherIcon color={isDarkMode ? '#8C6CAB' : '#FF8911'} name={'users'} size={14} />
    <Text style={styles.statsItemLabel}>{item.title}</Text>
  </View>
</TouchableOpacity>




        <FlatList
        data={item.data}
        keyExtractor={(location) => location.name}
        renderItem={({ item: location }) => (
            <TouchableOpacity
            onPress={() => navigation.navigate('Map', { data: location.location })}
            style={[styles.placeItem, isDarkMode && styles.darkModePlaceItem]}
          >
            <View>
            <Text style={styles.statsItemLabeli}>{location.name}</Text>
            </View>
          </TouchableOpacity>
          
                
        
        )}
        />
        </>
        
        );
    }
    else {
        return(        <TouchableOpacity onPress={() => handleBlockPress(item)}>
        <View >
         
          <View style={styles.stats} >
          <View style={[styles.statsItem,{ backgroundColor: isDarkMode ? '#1F2937' : '#F9F9F9' }]}>

            <FeatherIcon color="#FF8911" name={"users"} size={14} />

            <Text style={styles.statsItemLabel}>{item.title}</Text>
            </View>

          </View>
        </View>
      </TouchableOpacity>
      )
    }

}
       
const filteredPlaces = data.reduce((acc, category) => {

//console.log("haha",category.data.name)

const filteredLocations = category.data.filter(location =>
  location.description && location.description.toLowerCase().includes(searchText.toLowerCase())
);


  
    if (filteredLocations.length > 0) {
      acc.push({ title: category.title, data: filteredLocations });
    }
  
    return acc;
  }, []);
  
      return (
        <View style={{ backgroundColor: '#05141c' }}>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: translateHeader }] },
          ]}>
          <Animated.Text
            style={[
              styles.headerTitle,
              { opacity: opacityTitle },
              { transform: [{ translateY: translateTitle }] },
            ]}>
            Rechercher {'\n'}dans la faculté
          </Animated.Text>
  
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Entrez le nom de l'emplacement..."
              placeholderTextColor="#05141c"
              style={styles.input}
              onChangeText={(text) => {
                setSelectedBlocks([""]);
  
                setSearchText(text);
         
              }}
            />
  
            <View style={styles.inputIcon}>
              <FeatherIcon color="#FF8911" name="search" size={16} />
            </View>
          </View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={[styles.content,{backgroundColor: isDarkMode ? '#1F2937' : '#e8ecf4' }]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={1}>
{/*     // <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1F2937' : '#e8ecf4' }]}>
 */}           


          <FlatList
            data={filteredPlaces}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
          />

              </Animated.ScrollView>
      </View>
    
      );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
          },
          content: {
            paddingTop: 200, // Set the paddingTop to the height of the header
            padding: 6,
            backgroundColor: '#fff',
          },
          /** Header */
          header: {
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            paddingHorizontal: 24,
            paddingVertical: 12,
            height: 200,
            alignItems: 'stretch',
            justifyContent: 'flex-end',
            backgroundColor: '#9F70FD',
          },
          headerTitle: {
            fontSize: 26,
            lineHeight: 34,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            marginBottom: 12,
          },
          /** Input */
          input: {
            height: 44,
            backgroundColor: '#fff',
            paddingLeft: 44,
            paddingRight: 24,
            borderRadius: 12,
            fontSize: 15,
            fontWeight: '500',
            color: '#222',
          },
          inputWrapper: {
            position: 'relative',
            width: '100%',
          },
          inputIcon: {
            position: 'absolute',
            width: 44,
            height: 44,
            top: 0,
            left: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          },
          blockItem: {
            padding: 10,
            margin: 5,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
          },
          selectedBlock: {
            backgroundColor: '#a0a0a0',
          },
          placeItem: {
            padding: 10,
            margin: 5,
            backgroundColor: '#c0c0c0',
            borderRadius: 10,
          },
          /** Stats */
          statsItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
            backgroundColor: '#ffffff',
            marginBottom: 12,
            elevation: 3, // Pour l'ombre sur Android
          },
          selectedBlock: {
            backgroundColor: '#6366F1', // Couleur de fond lorsqu'un bloc est sélectionné
          },
          darkModeItem: {
            backgroundColor: '#4B5563', // Couleur de fond en mode sombre
          },
          darkModeText: {
            color: '#FDBF60', // Couleur du texte en mode sombre
          },
          statsItemLabel: {
            marginLeft: 8,
            marginRight: 'auto',
            fontSize: 15,
            fontWeight: '600',
            color: '#7F27FF',
          },
          statsItemLabeli: {
            marginLeft: 8,
            marginRight: 'auto',
            fontSize: 15,
            fontWeight: '600',
            color: '#4e4a6d',
          },
          statsItemValue: {
            fontSize: 15,
            fontWeight: '600',
            color: '#4e4a6d',
          },
        placeItem: {
            padding: 16,
            margin: 8,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            elevation: 3, // Pour l'ombre sur Android
          },
          darkModePlaceItem: {
            backgroundColor: '#374151',
          },
          placeItemName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1F2937',
          },
          darkModeText: {
            color: '#ffffff',
          },
      });
      
    

export default Places;
