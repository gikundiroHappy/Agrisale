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
import { getDocs, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

export default function Farmerdash({ navigation }) {
  const [originalblogs, setOriginalBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);

  const { darkmode, ReadBlog, blogs, setBlogs, products, ReadProduct } =
    useContext(Context);

  const ReadOrders = async () => {
    try {
      const readResponse = await getDocs(collection(FIREBASE_DB, "Orders"));
      setOrders(
        readResponse.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await ReadProduct();
    };
    fetchDatas();
    ReadOrders();
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
  }, []);

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
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <AntDesign name="pluscircle" size={40} color="#4ba26a" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: moderateScale(5),
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("productsposted")}
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
            Total Products posted:
          </Text>
          <View
            style={{
              alignSelf: "flex-end",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Text
              style={{
                color: "#4ba26a",
                fontFamily: "Poppins_700Bold",
                paddingTop: 1,
                fontSize: 17,
              }}
            >
              {totalProducts}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("productsorders")}
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
            Total Products Requested:
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
            {orders.length}
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: darkmode ? "white" : "black",
          paddingBottom: 20,
          paddingHorizontal: 20,
          fontFamily: "Poppins_600SemiBold",
          fontSize: 15,
        }}
      >
        Trending crop Diseases
      </Text>

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
