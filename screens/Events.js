import { SafeAreaView, Text,StyleSheet, Button,View,Image,FlatList,TouchableOpacity,ScrollView } from "react-native";
import NavBar from "../nav/navBar";
import { StyledComponent } from "nativewind";
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { useState } from "react";

function Events({navigation}) {

  const [search,SetSearch]=useState("")

  updateSearch = (search) => {
    SetSearch({ search });
  };

    const TopEvents =[
        {id:1, title : "Evenement des Etudiant de Master 2iad" , dateE: "17/02/2024", image: require('../assets/evn.png')},
        {id:2, title : "Evenement des Etudiant de Master 2iad" , dateE: "17/02/2024", image: require('../assets/evn.png')},
        {id:3, title : "Evenement des Etudiant de Master 2iad" , dateE: "17/02/2024", image: require('../assets/evn.png')},
        {id:4, title : "councours des Etudiant de Master 2iad" , dateE: "17/02/2024", image: require('../assets/evn.png')},



    ]

      const renderEven = ({ item }) => (
            
        <View >
        <TouchableOpacity>


      <View>
      <Image  className="w-4/5 h-80 mt-5 ml-9 rounded-xl" source={item.image}  />

        <View className="absolute top-0 right-0 mt-8 mr-20">
        <TouchableOpacity>
        <AntDesign className="" name="save" size={34} color="white" />

        </TouchableOpacity>

        </View>
        <View className="absolute  inset-x-0 bottom-0 mb-8 mr-20">
        <Text className="ml-9 mr-9 text-center mt-2 text-2xl font-medium ">{item.title} </Text>

        </View>

      </View>  
      <Text className="text-left ml-20   text-base font-medium ">Informatique </Text>
 
      <Text className=" text-right mr-20  text-base font-extralight ">{item.dateE}</Text>
      </TouchableOpacity>

    </View>
    );
    return (
        <SafeAreaView className="h-screen" style={styles.container}>
     
          {/*    <View >
      <Text style={styles.titleText} className="text-slate-800">Explore🎉</Text>
      <Image className="h-40 w-40 m-5 rounded-xl" source={require('../assets/dep.png')} />
      <Text className="ml-8 text-lg font-medium ">Informatique</Text>
      <Text className="ml-8 text-base font-extralight ">5 evenement </Text>
      <Image className="h-40 w-40 m-5 rounded-xl" source={require('../assets/dep.png')} />
      <Text className="ml-8 text-lg font-medium ">Informatique</Text>
      <Text className="ml-8 text-base font-extralight ">5 evenement </Text>
    </View> */}
    <View>
    <Text  className="mt-20 text-3xl font-medium  text-slate-800 text-slate-800">Explore🎉</Text>

    <SearchBar
    
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
        </View>


        <View>
    <Text  className="text-3xl font-medium  text-slate-800">Evenement Important </Text>
<View className="h-5/6 mb-20">
<FlatList
          
            data={TopEvents}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}

            renderItem={renderEven}
          />
<NavBar/>

</View>

        </View>



        </SafeAreaView>
    );}

    const styles=StyleSheet.create ({
        container : {
            flex : 1,
            justifyContent : 'space-between',
        },
     titleText: {
        color: "slategray",        // Utiliser la couleur slategray
        fontSize: 32,              // Ajussssster la taille du texte selon vos préférences
      
        marginLeft: 10,             // Marge à gauche
    marginTop: 50, 
    }
     } );
export default Events;