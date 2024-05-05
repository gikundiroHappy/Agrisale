import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import UploadTextInput from "../Components/uploadtextInput";
import Button from "../Components/Button";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_storage } from "../FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Context } from "../Context/context";

export default function Editprofile({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const { darkmode } = useContext(Context);

  const Getuser = async () => {
    try {
      const readResponse = await getDoc(doc(FIREBASE_DB, "user", route.params));
      setUsername(readResponse.data().username);
      setProfile(readResponse.data().profUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const Update = async () => {
    try {
      const updateResponse = await updateDoc(
        doc(FIREBASE_DB, "user", route.params),
        {
          username: username,
          profUrl: profile,
        }
      );
      alert("Updated");
      navigation.navigate("Profile", { username: username });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Getuser();
  }, [route.params]);

  const pickImage = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfile(result.assets[0].uri);
      HandlePickImage(result.assets[0].uri);
    }

    setIsLoading(false);
  };

  const HandlePickImage = async (img) => {
    try {
      if (!img) {
        alert("Please select an image");
        return;
      }

      const timestamp = Date.now();
      const fileExtension = img.split(".").pop();
      var response = await fetch(img);
      var blob = await response.blob();

      const storagePath = `profile/${timestamp}.${fileExtension}`;
      const metadata = {
        contentType: "image/jpeg",
      };

      const imageRef = ref(FIREBASE_storage, storagePath);
      await uploadBytes(imageRef, blob, metadata);

      var url = await getDownloadURL(imageRef);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        backgroundColor: darkmode ? "#2f2f2f" : "white",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <View
        style={{
          backgroundColor: "#4ba26a",
          position: "absolute",
          width: "100%",
          top: 0,
          right: 0,
          left: 0,
          paddingTop: 50,
          paddingHorizontal: 20,
          height: 170,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 15,
            color: "white",
          }}
        >
          Edit Profile
        </Text>
        <TouchableOpacity>
          <AntDesign name="sharealt" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", width: "100%", top: 125 }}>
        <View>
          {isLoading ? (
            <View style={{ width: 100, height: 100, alignSelf: "center" }}>
              <ActivityIndicator
                style={{ top: 65 }}
                color={darkmode ? "white" : "#4ba26a"}
              />
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  style={styles.image}
                  source={{
                    uri: profile,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 15,
              color: darkmode ? "white" : "black",
            }}
          >
            Username
          </Text>
          <UploadTextInput value={username} onChangeText={setUsername} />

          <View style={{ marginTop: 30 }}>
            <Button title="UPDATE" onPress={Update} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
});
