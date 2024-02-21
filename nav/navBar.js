import { View,TouchableOpacity, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

export  const Tab=({nameIcon,name,handlePress})=>{

    return (
    <TouchableOpacity>
    <AntDesign name={nameIcon} size={24}       
        color='orange'
        style={{
        marginBottom : 3,
        alignSelf:"center",
    }} onPress={handlePress} />
    <Text>{name}</Text>

    </TouchableOpacity>
    );
}
export default function NavBar() {
const navigation=useNavigation();

    return (
        <View 
        style={{
            flexDirection : "row",
            margin : 10,
            marginHorizontal:30,
            justifyContent:"space-between"
        }}
        >
           <Tab name="Home" nameIcon="setting" handlePress={() => navigation.navigate("Home")} />
           <Tab name="Events" nameIcon="team" handlePress={() => navigation.navigate("Events")}/>
           <Tab name="Places" nameIcon="menuunfold" handlePress={() => navigation.navigate("Places")}/>
           <Tab name="Profile" nameIcon="user" handlePress={() => navigation.navigate("Profile")}/>

        </View>
    );
}