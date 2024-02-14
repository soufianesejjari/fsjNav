import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView ,Button,Text,View} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Importer les icônes de Material Icons

const HeaderMap = ({icon,name,distance,suivant}) => {
    const extractText = (html) => {
        return html.replace(/<[^>]*>/g, ' '); // Utilise une expression régulière pour supprimer les balises HTML
      };
    return (
        <View className="absolute inset-x-0 top-0 mx-5 mt-3 ">
          <View className="" >
            <View className=" flex justify-between" style={styles.button}>

              <View className=" ">
              <MaterialIcons name={icon} size={60} color="green" />

              </View>
    <View >
    <Text className="text-sm w-48">{extractText(name)}</Text>
              <Text>({distance})</Text>
                </View>
            <View className="mr-3">
            <MaterialIcons name={suivant} size={34} color="orange" />

            </View>
            </View>
    
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'flex-start',
        top: 0,
        left: 0,
      
      },
      innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
      },
    });
  
  export default HeaderMap;
  