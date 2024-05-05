import React, { useContext,useState,useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { Context } from "../../Context/context";

export default function FarmerBlog({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [agroName, setAgroName] = useState("");
  const [agroPhoto, setAgroPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {darkmode}=useContext(Context)

  const rout = route.params;

  const GetAgroProfile = async () => {
    try {
      setIsLoading(true);
      const readResponse = await getDoc(doc(FIREBASE_DB, "user", rout.agronomId));
      setAgroName(readResponse.data().username);
      setAgroPhoto(readResponse.data().profUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAgroProfile();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 30, backgroundColor: darkmode ? "#2f2f2f": "white" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingVertical:30,
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            style={{
              color: darkmode ?"white": "#212121",
              color: "grey",
              fontSize: 20,
              marginTop: 4,
            }}
          />
        </TouchableOpacity>
        <Text style={{ color: darkmode ?"white": "#212121", fontSize: 18, fontWeight: "bold" }}>
          Blog
        </Text>
      </View>
      <View
        style={{
          overflow: "hidden",
          height: "25%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {loading && 
         <ActivityIndicator
         style={{ position: "absolute", top: 65, alignSelf: "center" }}
         color={darkmode?"white":"#4ba26a"}
       />
        }
        <ImageBackground
          source={{uri:rout.blogurl}}
          style={{ width: "100%", height: "100%", alignItems: "flex-end" }}
           onLoad={() => setLoading(false)}
        >
          <View
            style={{
              backgroundColor: "rgba(245, 245, 245, 0.5)",
              borderRadius: 30,
              width: 40,
              height: 40,
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            
          >
            <Ionicons name="bookmark-outline" size={25} color="whitesmoke" />
          </View>
        </ImageBackground>
      </View>

      <Text
        style={{
          marginTop: 10,
          textAlign: "left",
          fontSize: 10,
          color: "grey",
        }}
      >
        Jan 1, 2021 <MaterialCommunityIcons name="menu-down" />
        3344 views
      </Text>

      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          fontSize: 24,
          paddingVertical: 15,
          color: darkmode ?"white": "#212121"
        }}
      >
        {rout.blogTitle}
      </Text>

    

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          marginTop: 5,
        }}
      >
          {isLoading && (
            <ActivityIndicator
              style={{ paddingLeft: 40 }}
              color={darkmode ? "white" : "#4ba26a"}
            />
          )}
        <Image
          source={{uri: agroPhoto}}
          style={{
            width: 30,
            height: 30,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            marginTop: 5,
          }}
          onLoad={() => setIsLoading(false)}
        />
        <Text style={{color:darkmode ?"white": "#212121"}}>By:{agroName}</Text>
      </View> 

      <Text
        style={{
          paddingTop: 20,
          fontFamily: "Poppins_400Regular",
          fontSize: 14,
          lineHeight: 24,
          color:darkmode ?"white": "#212121",
        }}
      >
       {rout.blogDescri}
      </Text>

    </View>
  );
}
