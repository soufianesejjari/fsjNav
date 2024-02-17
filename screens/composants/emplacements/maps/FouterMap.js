import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView ,Button,Text,View,TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';

const FouterMap = ({durre,distanceT,onInstructionComplete,changeButton,handleList ,finale}) => {
    const extractText = (html) => {
        return html.replace(/<[^>]*>/g, ' '); // Utilise une expression régulière pour supprimer les balises HTML
      };
    return (
        <View className="absolute  inset-x-0 bottom-0 mx-5 mb-5 ">
          <View className="" >
            <View className=" flex justify-between" style={styles.button}>

          
    <View >
   <Text className="text-3xl m-2 ml-1 text-green-500" style={{color:'#9F70FD'}}> {parseInt(durre)} min</Text>
              <Text className="text-sm mb-3 ml-4 text-gray-600">{parseFloat(distanceT.toFixed(2))} km </Text> 
{/* 
<Text className="text-3xl m-2 ml-3 text-green-500">{durre}</Text>
              <Text className="text-sm mb-3 ml-4 text-gray-600">totale :{distanceT} </Text>  */}
                </View>
                <View className="mr-3 mb-2">
                <TouchableOpacity onPress={handleList}>
 
            <AntDesign name="swap" size={34} color="orange" />
            </TouchableOpacity>

            </View>
            <View className="mr-5 rounded-full bg-teal-400 px-4 pb-2 pt-2" style={{backgroundColor:'#7F27FF',}}>
            <TouchableOpacity onPress={onInstructionComplete}>
             
            {finale ? <Text style={{color:'#FDBF60',        fontSize: 16,
     
    }}>Fin</Text> : (changeButton ? <Text style={{color:'#FDBF60',        fontSize: 16,
     
}}>Suivant</Text> : <Text style={{color:'#FDBF60',        fontSize: 16,
     
}}>Start</Text>)}

           
            </TouchableOpacity>
  {/*           <Button   color="#841584"
 className="rounded-full" title="start"/> */}

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
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
      },
    });
  
  export default FouterMap;
  