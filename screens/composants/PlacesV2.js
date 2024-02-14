import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Animated } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RechercheP from './Rechrechep';
import NavBar from '../../nav/navBar';
import { btiment } from './Batiments';
import { useTheme } from '../../ThemeContext'; // Importez votre hook de thème


    function Places({navigation}) {
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
  <View style={[styles.statsItem, blockIndex !== -1 && styles.selectedBlock]}>
    <FeatherIcon color={isDarkMode ? '#8C6CAB' : '#FF8911'} name={'users'} size={14} />
    <Text style={[styles.statsItemLabel, isDarkMode && styles.darkModeText]}>{item.title}</Text>
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
              <Text style={[styles.placeItemName, isDarkMode && styles.darkModeText]}>{location.name}</Text>
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
          <View style={styles.statsItem}>

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
    const filteredLocations = category.data.filter(location =>
      location.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    if (filteredLocations.length > 0) {
      acc.push({ title: category.title, data: filteredLocations });
    }
  
    return acc;
  }, []);
  
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1F2937' : '#e8ecf4' }]}>
                <Animated.View>
                <RechercheP setSearchText={setSearchText} setSelectedBlocks={setSelectedBlocks}/>

                </Animated.View>


          <FlatList
            data={filteredPlaces}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
          />
{/*                                 <NavBar/>
 */}
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
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
            color: '#D1D5DB', // Couleur du texte en mode sombre
          },
          statsItemLabel: {
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
