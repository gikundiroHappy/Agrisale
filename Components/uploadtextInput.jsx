import React, { useContext } from "react";
import { StyleSheet, View, } from "react-native";
import { TextInput } from "react-native-paper";
import { Context } from "../Context/context";

export default function UploadTextInput ({ label,value, onChangeText,secureTextEntry,error,keyboardType,placeholder}){
  const {darkmode} = useContext(Context)
  return (
    <View>
    <TextInput 
    label={label} 
    value={value} 
    placeholder={placeholder}
    placeholderTextColor={darkmode ? "grey" : "darkgrey"}
    onChangeText={onChangeText} 
    secureTextEntry={secureTextEntry} 
    error={error} 
    keyboardType={keyboardType}
    style={[styles.textInput,{backgroundColor:darkmode ?"#2f2f2f": "white"} ]} 
    textColor={darkmode ? "white": "black"}
    underlineColor='transparent'
    theme={{colors:{primary:darkmode ? "white":"rgba(000,000,000,0.2)"}, roundness: 10}}
    />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: { 
   height: 50,
   fontSize:14,
   fontFamily:"Poppins_400Regular",
   marginTop:10,
   marginBottom:20,
   borderRadius:10,
   borderWidth:1,
   borderColor:"#A9A9A9",
  },
});

