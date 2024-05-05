import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchTextInput from "../../Components/search";
import { Context } from "../../Context/context";
import Modal from "react-native-modal";
import Button from "../../Components/Button";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { FIREBASE_DB, FIREBASE_storage } from "../../FirebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";

export default function Agronomistdash({ navigation }) {
  const [model, setModel] = useState(false);
  const [picurl, setPicurl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalblogs, setOriginalBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [countFarmer, setCountFarmer] = useState('');

  const { darkmode, ReadBlog, blogs, setBlogs, products, ReadProduct } =
    useContext(Context);

  useEffect(() => {
    const fetchDatas = async () => {
      await ReadProduct();
    };
    fetchDatas();
  }, []);

  const totalProducts = products.length;

  const searchFilter = (text) => {
    const searchText = text.toUpperCase();
    if (text.length > 0) {
      setBlogs(
        originalblogs.filter((item) => {
          const title = item.blogTitle
            ? item.blogTitle.toUpperCase()
            : "".toUpperCase();
          return title.includes(searchText);
        })
      );
    } else {
      setBlogs(originalblogs);
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await ReadBlog();
      if (blogs) {
        setLoading(false);
        setOriginalBlogs(blogs);
      }
    };
    fetchDatas();

    const fetchUser = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "user"));
        const ite = []; 
        querySnapshot.forEach((doc) => {
          ite.push({...doc.data(), id: doc.id}); // Pushing document data along with document ID
        });
        const filter =  ite.filter((doc)=>{
          return doc.usertype == 'farmer'
        })
         setCountFarmer(filter.length)
        return ite; 
      } catch (error) {
        console.error("Error fetching users: ", error);
        // Handle error here, e.g., show an alert
      }
    }
    fetchUser()
    // console.log(ite,'sajkdja')
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
      setPicurl(result.assets[0].uri);
      HandlePickImage(result.assets[0].uri);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setPicurl(null);
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

        const storagePath = `crops/${timestamp}.${fileExtension}`;
        console.log(storagePath);

        const metadata = {
          contentType: "image/jpeg",
        };
        const imageRef = ref(FIREBASE_storage, storagePath);

        const upload = await uploadBytes(imageRef, blob, metadata);

        console.log(upload);

        var url = await getDownloadURL(imageRef);
        console.log(url);

        setPicurl(url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        paddingLeft: 10,
        backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
      >
        <View style={{ width: "85%" }}>
          <SearchTextInput
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              searchFilter(text);
            }}
          />
        </View>
        <TouchableOpacity onPress={() => setModel(true)}>
          <AntDesign name="pluscircle" size={40} color="#4ba26a" />
        </TouchableOpacity>

        <Modal visible={model}>
          <View
            style={{
              position: "absolute",
              top: 70,
              height: "85%",
              width: "100%",
              paddingVertical: 20,
              paddingHorizontal: 30,
              backgroundColor: darkmode ? "#2f2f2f" : "white",
              padding: 20,
              display: "flex",
              justifyContent: "center",
              borderRadius: 20,
              elevation: 10,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#4ba26a",
                  fontWeight: "bold",
                  fontSize: 16,
                  paddingBottom: 40,
                  textAlign: "center",
                  fontFamily: "Poppins_500Medium",
                }}
              >
                You want to check if your crops are healthy ?
              </Text>

              <View>
                {picurl ? (
                  <TouchableOpacity
                    onPress={() => pickImage(setIsLoading, setPicurl)}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: picurl,
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
                          onPress={() => pickImage(setIsLoading, setPicurl)}
                        >
                          <Text
                            style={{
                              color: darkmode ? "white" : "black",
                              textAlign: "center",
                            }}
                          >
                            Click to upload
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                )}
              </View>
              <Text>{ }</Text>
            </View>

            <View>
              <Button title="Ok" onPress={() => setModel(!model)} />
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: moderateScale(15),
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: "45%",
            marginBottom: 20,
            backgroundColor: darkmode ? "#242526" : "white",
            height: 100,
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            elevation: 0.5,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
          }}
        >
          <Text
            style={{
              color: darkmode ? "white" : "black",
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Total Blogs posted:
          </Text>
          <Text
            style={{
              color: "#4ba26a",
              fontFamily: "Poppins_700Bold",
              alignSelf: "flex-end",
              paddingTop: 1,
              fontSize: 17,
            }}
          >
            {blogs.length}
          </Text>
        </View>
        <View
          style={{
            width: "45%",
            marginBottom: 20,
            backgroundColor: darkmode ? "#242526" : "white",
            height: 100,
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            elevation: 0.5,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
          }}
        >
          <Text
            style={{
              color: darkmode ? "white" : "black",
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Number of farmers:
          </Text>
          <Text
            style={{
              color: "#4ba26a",
              fontFamily: "Poppins_700Bold",
              alignSelf: "flex-end",
              paddingTop: 1,
              fontSize: 17,
            }}
          >
            {countFarmer}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: moderateScale(5) }}
        style={{ flexGrow: 1, marginHorizontal: 10 }}
      >
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} color="#4ba26a" />
        ) : (
          <View>
            {blogs.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("farmerblog", item)}
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 15,
                  gap: 13,
                  width: 300,
                }}
              >
                <View
                  style={{
                    width: 90,
                    borderRadius: 15,
                    overflow: "hidden",
                  }}
                >
                  {imageLoading && (
                    <ActivityIndicator
                      style={{
                        position: "absolute",
                        top: 35,
                        alignSelf: "center",
                      }}
                      color={darkmode ? "white" : "#4ba26a"}
                    />
                  )}
                  <Image
                    source={{ uri: item.blogurl }}
                    style={{ height: 75, width: "100%" }}
                    onLoad={() => setImageLoading(false)}
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: darkmode ? "white" : "#D0D0D0",
                    }}
                  >
                    1 jan 2024
                    {item.date}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 18,
                      color: darkmode ? "white" : "black",
                    }}
                  >
                    {item.blogTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginRight: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
});
