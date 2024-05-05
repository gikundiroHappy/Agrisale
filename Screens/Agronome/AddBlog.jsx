import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useContext, useState, useEffect } from "react";
import { getItemAsync } from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Context } from "../../Context/context";
import UploadTextInput from "../../Components/uploadtextInput";
import Button from "../../Components/Button";
import { FIREBASE_storage } from "../../FirebaseConfig";

const height = Dimensions.get("screen").height;

export default function AddBlog() {
  const [blogurl, setBlogurl] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescri, setBlogDescri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agronomId, setAgronomId] = useState();

  const { darkmode, AddBlog } = useContext(Context);

  useEffect(() => {
    getItemAsync("userId")
      .then((data) => {
        setAgronomId(data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const pickImage = async (setIsLoading) => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setBlogurl(result.assets[0].uri);
      HandlePickImage(result.assets[0].uri);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setBlogurl(null);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const HandlePickImage = async (img) => {
    try {
      if (!img) {
        alert("Please select an image");
      } else {
        const timestamp = Date.now();
        const fileExtension = img.split(".").pop();
        var response = await fetch(img);
        var blob = await response.blob();

        const storagePath = `Blogs/${timestamp}.${fileExtension}`;

        const metadata = {
          contentType: "image/jpeg",
        };
        const imageRef = ref(FIREBASE_storage, storagePath);

        const upload = await uploadBytes(imageRef, blob, metadata);

        var url = await getDownloadURL(imageRef);

        setBlogurl(url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddBlogs = () => {
    if (blogTitle === "" || blogDescri === "" || blogurl === null) {
      Alert.alert("Fill all blog details");
    } else {
      AddBlog(blogTitle, blogDescri, blogurl, agronomId);
      Alert.alert("Blog added");
      setBlogTitle("");
      setBlogDescri("");
      setBlogurl(null);
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View
          style={{
            height: height,
            backgroundColor: darkmode ? "#2f2f2f" : "white",
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
            ADD A NEW BLOG
          </Text>

          <View>
            {blogurl ? (
              <TouchableOpacity
                onPress={() => pickImage(setIsLoading, setBlogurl)}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: blogurl,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <>
                {isLoading ? (
                  <>
                    <ActivityIndicator />
                  </>
                ) : (
                  <>
                    <Image
                      style={styles.image}
                      source={require("../../assets/upload.png")}
                    />
                    <TouchableOpacity
                      onPress={() => pickImage(setIsLoading, setBlogurl)}
                    >
                      <Text style={{ color: darkmode ? "white" : "#212121" }}>
                        Click to upload
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </View>

          <View style={{ paddingTop: 20 }}>
            <UploadTextInput
              placeholder="Enter blog title"
              value={blogTitle}
              onChangeText={setBlogTitle}
            />

            <TextInput
              placeholder="Enter blog description..."
              value={blogDescri}
              onChangeText={setBlogDescri}
              multiline={true}
              placeholderTextColor={darkmode ? "grey" : "darkgrey"}
              style={[
                styles.textInput,
                { backgroundColor: darkmode ? "#2f2f2f" : "white" },
              ]}
              textColor={darkmode ? "white" : "black"}
              underlineColor="transparent"
              theme={{
                colors: {
                  primary: darkmode ? "white" : "rgba(000,000,000,0.2)",
                },
                roundness: 10,
              }}
            />

            <View style={{ marginTop: 30 }}>
              <Button title="ADD" onPress={handleAddBlogs} />
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
    marginRight: 15,
    borderRadius: 10,
  },
  textInput: {
    height: 150,
    fontSize: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
  },
});
