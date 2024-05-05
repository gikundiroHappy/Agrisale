import { useContext } from "react";
import { View,Text, TouchableOpacity } from "react-native";
import MaterialIcons from  'react-native-vector-icons/MaterialIcons';
import { Context } from "../Context/context";

export default function Set({icon,name,onPress}){
    const {darkmode} = useContext(Context)
    return(
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor: darkmode?'#242526':'white',marginTop:10,padding:12
        ,width:'100%'}}>
         <View style={{display:'flex',flexDirection:'row',gap:10}}>
       <Text style={{fontSize: 20,fontFamily:'Poppins_700Bold',color: darkmode?'white':'black'}}>{icon}</Text>
       <Text style={{fontFamily:'Poppins_600SemiBold',color: darkmode?'white':'black'}}>{name}</Text>
       </View>
       <TouchableOpacity>
       <MaterialIcons name='keyboard-arrow-right'  size={20} color={'#383838'} onPress={onPress}/>
       </TouchableOpacity>
        </View>
    )
}