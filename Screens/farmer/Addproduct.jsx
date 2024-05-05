import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { getItemAsync } from "expo-secure-store";
import UploadTextInput from "../../Components/uploadtextInput";
import Button from "../../Components/Button";
import { Context } from "../../Context/context";

const height = Dimensions.get("screen").height;

export default function Addproduct() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [picurl, setPicurl] = useState(null);
  const [addedId, setAddedId] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const { pickImage, AddProduct,darkmode } =
    useContext(Context);

    useEffect(() => {
      getItemAsync("userId")
        .then((data) => {
          setAddedId(data);
        })
        .catch((er) => {
          console.log(er);
        });
    }, []);

    const handleAddProducts = () => {
      if(title === '' || status === '' ||  amount === '' || picurl === null){
        Alert.alert("Fill all product description");
      }else{
      AddProduct(title,status,amount,picurl,addedId);
          Alert.alert('Product added')
          setTitle('');
          setStatus('');
          setAmount('');
          setPicurl(null)
          setAddedId()
      }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View
          style={{
            height: height,
            backgroundColor: darkmode ?"#2f2f2f": "white",
            padding: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#4ba26a",
              fontWeight: "bold",
              fontSize: 16,
              paddingBottom: 40,
              textAlign: "center",
              fontFamily: "Poppins_700Bold",
            }}
          >
            ADD A NEW PRODUCT
          </Text>

          <View>
          {picurl?
          <TouchableOpacity onPress={() => pickImage(setIsLoading,setPicurl)}>
            <Image
              style={styles.image}
              source={{
                uri: picurl,
              }}
            />
          </TouchableOpacity>
        :
          <>
          {
            isLoading?
            <>
            <ActivityIndicator/>
            </>
            :
            <>
            <Image
              style={styles.image}
              source={require('../../assets/upload.png')}
            />
            <TouchableOpacity onPress={() => pickImage(setIsLoading,setPicurl)}>
            <Text style={{color:darkmode ?"white": "#212121"}}>Click to upload</Text>
            </TouchableOpacity>
            </>
          } 
          </>
           } 
          </View>


          <View style={{ paddingTop: 20 }}>
            <UploadTextInput
              placeholder="Enter product title"
              value={title}
              onChangeText={setTitle}
            />
            <UploadTextInput
              placeholder="Enter product measurements"
              value={status}
              onChangeText={setStatus}
            />
            <UploadTextInput
              placeholder="Enter product amout"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={{ marginTop: 30 }}>
              <Button title="ADD" onPress={handleAddProducts} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginRight:15,
    borderRadius:10
  },
});
