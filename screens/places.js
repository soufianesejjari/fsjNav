import { SafeAreaView, Text,StyleSheet, Button,View,Image,FlatList,TouchableOpacity ,ScrollView ,TextInput} from "react-native";
import NavBar from "../nav/navBar";
import { StyledComponent } from "nativewind";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import FeatherIcon from 'react-native-vector-icons/Feather';

import {  SearchBar } from 'react-native-elements';
import Header from "./composants/Header";
import RechercheP from "./composants/Rechrechep";


function Placess({navigation}) {
   const btiment={
    batiment:{
        amphi:[
            {name:"iben younnes",
             description:"amphi de cours",
             size:400,
             location:{
                latitude:33.225721, 
                longtitude:-8.486090
             }
            },
             {name:"iben haitam",
            description:"amphi de cours",
            size:400,
            location:{
               latitude:33.225567, 
               longtitude:-8.487069
            }
           },
            {name:"nafis",
           description:"amphi de cours",
           size:400,
           location:{
              latitude:33.225109, 
              longtitude:-8.486190
           }
          }, {name:"farrabi",
          description:"amphi de cours",
          size:400,
          location:{
             latitude:33.226098, 
             longtitude:-8.486656
          }
         },
          {name:"nouvel amphi",
         description:"amphi de cours",
         size:400,
         location:{
            latitude:33.224832, 
            longtitude:-8.487301
         }
        },
        {name:"bayrouni",
         description:"amphi de cours",
         size:400,
         location:{
            latitude:33.225829,
            longtitude: -8.487050
         }
        }
        ],
        departements:[
            {
                name:'Departement informatique',
                size:10,
                description:"departement informatique",
                location:{
                    latitude:33.224953,
                    longtitude:  -8.487587
                 }
            },
            {
                name:' Departement mathematique',
                size:10,
                description:"departement mathematique",
                location:{
                    latitude:33.225209,
                    longtitude:  -8.488017
                 }
            },
            {
                name:'Departement physique',
                size:10,
                description:"departement physique",
                location:{
                    latitude:33.225755, 
                    longtitude: -8.487666
                 }
            },
            {
                name:' Departement biologie',
                size:10,
                description:"departement biologie",
                location:{
                    latitude:33.225394, 
                    longtitude: -8.487715
                 }
            },
        ],
        bibliotheques:[
            {
                name:'bibliotheque 1',
                size : 100,
                description:'bibliotheque grand',
                location:{
                    latitude:33.226234, 
                    longtitude:-8.487283
                }
            },
            {
                name:'bibliotheque 2',
                size : 100,
                description:'bibliotheque nouvelle',
                location:{
                    latitude:33.225062, 
                    longtitude:-8.488461
                }
            },
            {
                name:'hol',
                size : 100,
                description:'hol fsj',
                location:{
                    latitude: 33.226061957557356,
                    longtitude: -8.486190036623457
                }
            }
        ],
        buffets:[
            {
                name:'buffet 1',
                description:'buffet des etudiants',
                location:{
                    latitude:33.225095,
                    longtitude:-8.485776
                }
            },
            {
                name:'buffet 2',
                description:'buffet des professeurs',
                location:{
                    latitude:33.226198,
                    longtitude: -8.487536
                }
            }
        ],
        toilettes:[
            {
                name:'toilette 1',
                description:'toilette 1',
                location:{
                    latitude:33.225163, 
                    longtitude:-8.485556
                }
            },
            {
                name:'toilette 2',
                description:'toilette 2',
                location:{
                    latitude:33.22517205627705, 
                    longtitude: -8.487219621709238
                }
            }
        ],
        parking:[
            {
                name:'parking 1',
                description:'parking des voitures 1',
                location:{
                    latitude:33.226656, 
                    longtitude:-8.487453
                }
            },
            {
                name:'parking 2',
                description:'parking des voitures 2',
                location:{
                    latitude: 33.225724, 
                    longtitude: -8.488781
                }
            }
        ],
        administration: {
            name: 'administration',
            description: 'administration faculté sciences chouaib doukalli',
            location: {
                latitude: 33.226440,
                longtitude: -8.486913
            }
        },
        mosquée:{
            name:'mosquée fsj',
            location:{
                latitude:33.224678,
                longtitude: -8.488083
            }
        },
        ucd:{
            name:"CED",
            description:"Centres d'Etudes Doctorales",
            location:{
                latitude:33.225468, 
                longtitude:-8.488460
            }
        },
        anapec:{
            name:"anapec",
            description:"anapec faculte sciences chouaib doukkali",
            location:{
                latitude:33.22541206115847, 
                longtitude:-8.488564178309101
            }
        },
        laboratoires:[
            {
                name:"laboratoire de technologie",
            description:"laboratoire technologie faculte sciences chouaib doukkali",
            location:{
                latitude:33.22551622544227,
                longtitude: -8.488125950516896
            }
            }, {
                name:"laboratoire de biologie",
            description:"laboratoire biologie faculte sciences chouaib doukkali",
            location:{
                latitude:33.224458,
                longtitude:-8.485962
            }
            }
  
        ],
        terrain:{
            name:"terrain de sports",
            description:"Terrain de sport de la faculté des Sciences Chouaib Dou",
            location:{
                latitude:33.2245115545651,
                longtitude: -8.48754245735959
            }
        },
        affichage:{
  
            name:"bloc d'affichage",
            description:"bloc d'affichage des notes",
            location:{
                latitude:33.225664,
                longtitude: -8.485759
            }
        },
        blocs:[
            {
                name:'bloc A',
                description:'contient 16 salle',
                location:{
                    latitude:33.225416,
                    longtitude: -8.486133
                }
            },
            {
                name:'bloc B',
                description:'contient 16 salle',
                location:{
                    latitude:33.225358, 
                    longtitude:-8.485680
                }
            },
            {
                name:'bloc C',
                description:'contient 16 salle',
                location:{
                    latitude:33.226169,
                    longtitude: -8.487994
                }
            },
            {
                name:'bloc D',
                description:'contient 16 salle',
                location:{
                    latitude:33.225817, 
                    longtitude:-8.488257
                }
            }
        ]
    }
  }
  const places = [
    // Blocs
    { id: '1', name: 'Bloc A', type: 'Bloc', block: 'Alock', coordinates: { longitude: -8.486079, latitude: 33.225628 }, visibile: true ,    icon: 'users' },
    // Salles du Bloc A
    { id: '6', name: 'Salle 101', type: 'Salle', block: 'A', coordinates: { longitude: -8.48602, latitude: 33.225761 }, visibile: false },
    { id: '7', name: 'Salle 102', type: 'Salle', block: 'A', coordinates: { longitude: -8.485974, latitude: 33.225899 }, visibile: false },
    { id: '8', name: 'Salle 103', type: 'Salle', block: 'A', coordinates: { longitude: -8.485928, latitude: 33.226038 }, visibile: false },
    // Salles du Bloc B
    { id: '2', name: 'Bloc B', type: 'Bloc', block: 'B', coordinates: { longitude: -8.486088, latitude: 33.226021 }, visibile: true ,    icon: 'users' },
    { id: '9', name: 'Salle 201', type: 'Salle', block: 'B', coordinates: { longitude: -8.486237, latitude: 33.225656 }, visibile: false },
    { id: '10', name: 'Salle 202', type: 'Salle', block: 'B', coordinates: { longitude: -8.48638, latitude: 33.22572 }, visibile: false },
    { id: '11', name: 'Salle 203', type: 'Salle', block: 'B', coordinates: { longitude: -8.486333, latitude: 33.225858 }, visibile: false },
    // Salles du Bloc C
    { id: '3', name: 'Bloc C', type: 'Bloc', block: 'C', coordinates: { longitude: -8.486286, latitude: 33.225997 }, visibile: true ,    icon: 'users' },
    { id: '12', name: 'Salle 301', type: 'Salle', block: 'C', coordinates: { longitude: -8.486255, latitude: 33.226138 }, visibile: false },
    { id: '13', name: 'Salle 302', type: 'Salle', block: 'C', coordinates: { longitude: -8.486404, latitude: 33.226203 }, visibile: false },
    { id: '14', name: 'Salle 303', type: 'Salle', block: 'C', coordinates: { longitude: -8.486501, latitude: 33.226094 }, visibile: false },
    // Salles du Bloc D
    { id: '4', name: 'Bloc D', type: 'Bloc', block: 'D', coordinates: { longitude: -8.48655, latitude: 33.225956 }, visibile: true ,    icon: 'users' },
    { id: '15', name: 'Salle 401', type: 'Salle', block: 'D', coordinates: { longitude: -8.486717, latitude: 33.225964 }, visibile: false },
    { id: '16', name: 'Salle 402', type: 'Salle', block: 'D', coordinates: { longitude: -8.486819, latitude: 33.225855 }, visibile: false },
    { id: '17', name: 'Salle 403', type: 'Salle', block: 'D', coordinates: { longitude: -8.486974, latitude: 33.225906 }, visibile: false },
    // Salles du Bloc E
    { id: '5', name: 'Bloc E', type: 'Bloc', block: 'E', coordinates: { longitude: -8.486977, latitude: 33.226041 }, visibile: true ,    icon: 'users' },
    { id: '18', name: 'Salle 501', type: 'Salle', block: 'E', coordinates: { longitude: -8.486907, latitude: 33.226173 }, visibile: false },
    { id: '19', name: 'Salle 502', type: 'Salle', block: 'E', coordinates: { longitude: -8.486791, latitude: 33.226279 }, visibile: false },
    { id: '20', name: 'Salle 503', type: 'Salle', block: 'E', coordinates: { longitude: -8.487132, latitude: 33.226082 }, visibile: false },
    // Departements
    { id: '21', name: 'Departements', type: 'Bloc', block: 'Dep', coordinates: { longitude: -8.487273, latitude: 33.226164 }, visibile: true ,    icon: 'users' },
    { id: '22', name: 'Departement Informatique', type: 'Salle', block: 'Dep', coordinates: { longitude: -8.487419, latitude: 33.226228 }, visibile: false },
    { id: '23', name: 'Departement Math', type: 'Salle', block: 'Dep', coordinates: { longitude: -8.487533, latitude: 33.226132 }, visibile: false },
    { id: '24', name: 'Departement Svt', type: 'Salle', block: 'Dep', coordinates: { longitude: -8.487578, latitude: 33.225993 }, visibile: false },
  ];

  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleBlockPress = (block) => {
    const blockIndex = selectedBlocks.findIndex(selectedBlock => selectedBlock.block === block.block);

    if (blockIndex !== -1) {
      const newSelectedBlocks = [...selectedBlocks];
      newSelectedBlocks.splice(blockIndex, 1);
      setSelectedBlocks(newSelectedBlocks);
    } else {
      setSelectedBlocks([...selectedBlocks, block]);


      console.log("bloggggggggggggggg",selectedBlocks)
    }
  };

  const renderItem = ({ item }) => {
    const blockIndex = selectedBlocks.findIndex(selectedBlock => selectedBlock.block === item.block);

    if (item.type === 'Bloc') {
      return (
        <TouchableOpacity onPress={() => handleBlockPress(item)}>
          <View >
           
            <View style={styles.stats} >
            <View style={styles.statsItem}>

              <FeatherIcon color="#8C6CAB" name={item.icon} size={14} />

              <Text style={styles.statsItemLabel}>{item.block}</Text>
              </View>

            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (item.type === 'Salle' && blockIndex === -1) {
      return (
        <TouchableOpacity
        onPress={() =>
         
console.log("data est ",item.coordinates)
       /*    navigation.navigate("Map", { data: item.coordinates }) */
        }
      >
        <View style={styles.placeItem}>
          <Text>{item.name}</Text>
        </View>
        </TouchableOpacity>

      );
    } else {
      return null;
    }
  };

  const filteredPlaces = places.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <SafeAreaView  style={styles.container}>
      <RechercheP setSearchText={setSearchText} setSelectedBlocks={setSelectedBlocks}/>
    
     
 
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
                      <NavBar/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#F8E2F7' ,

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
  stats: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
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
});

export default Placess;