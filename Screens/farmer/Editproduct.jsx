import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
  } from "react-native";
  import React, { useState, useContext, useEffect } from "react";
  import UploadTextInput from "../../Components/uploadtextInput";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import Button from "../../Components/Button";
  import { Context } from "../../Context/context";
  import { FIREBASE_DB } from "../../FirebaseConfig";
  import AntDesign from "react-native-vector-icons/AntDesign";
  
  const height = Dimensions.get("screen").height;
  
  export default function Editproduct({navigation,route}) {

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [amount, setAmount] = useState("");
    const [picurl, setPicurl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const { pickImage, darkmode } =
      useContext(Context);

    const GetOneProduct = async () => {
        try {
          const readResponse = await getDoc(doc(FIREBASE_DB, "products", route.params));
          setPicurl(readResponse.data().picurl);
          setTitle(readResponse.data().title);
          setStatus(readResponse.data().status);
          setAmount(readResponse.data().amount);
        } catch (error) {
          console.log(error);
        }
      };

      const Update = async () => {
        try {
          const updateResponse = await updateDoc(
            doc(FIREBASE_DB, "products", route.params),
            {
              picurl:picurl,
              title:title,
              status:status,
              amount:amount
            }
          );
          alert("Product updated");
          navigation.navigate("productsposted", { amount:amount });
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        GetOneProduct();
      }, [route.params]);
  
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
             <TouchableOpacity
          style={{ paddingBottom: 20, paddingTop: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={25} />
        </TouchableOpacity>
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
              EDIT A PRODUCT
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
              <ActivityIndicator
                    style={{ top: 65 }}
                    color={darkmode ? "white" : "#4ba26a"}
                  />
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
                <Button title="UPDATE PRODUCT" onPress={Update} />
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
  