import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { moderateScale } from "react-native-size-matters";
import { FIREBASE_DB } from "../FirebaseConfig";
import { getItemAsync } from "expo-secure-store";
import { Context } from "../Context/context";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);

  const { darkmode, handleAddToCart,DeleteFavorite } = useContext(Context);

  useEffect(() => {
    getItemAsync("userId")
      .then((data) => {
        setUserId(data);
      })
      .catch((er) => {
        console.log(er);
      });

    fetchFavorites();
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      const q = query(
        collection(FIREBASE_DB, "favs"),
        where("addedby", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      const favs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setFavorites(favs);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching favorites:", error);
    }
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 20,
          gap: 80,
          paddingHorizontal: 30,
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
            fontFamily: "Poppins_600SemiBold",
            color: "#4ba26a",
            fontSize: 16,
          }}
        >
          MY FAVORITES
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: moderateScale(5) }}
        style={{ flexGrow: 1, marginHorizontal: 10 }}
      >
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} color="#4ba26a" />
        ) : favorites && favorites.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              paddingLeft: moderateScale(10),
            }}
          >
            {favorites.map((item, index) => (
              <View
                key={index}
                style={{
                  width: "48%",
                  marginBottom: 20,
                  backgroundColor: darkmode ? "#242526" : "white",
                  borderRadius: 10,
                  overflow: "hidden",
                  elevation: 10,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("detail", item)}
                >
                  <Image
                    source={{ uri: item.picurl }}
                    style={{ width: "100%", height: 200, borderRightWidth: 8 }}
                  />
                </TouchableOpacity>

                <View style={{ padding: moderateScale(10) }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: moderateScale(15),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        color: darkmode ? "white" : "black",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        color: darkmode ? "white" : "black",
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: moderateScale(10),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(16),
                        fontFamily: "Poppins_600SemiBold",
                        color: darkmode ? "white" : "black",
                      }}
                    >
                      Rwf {item.amount}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleAddToCart(item)}
                      style={{
                        backgroundColor: "#E4E4E4",
                        paddingVertical: moderateScale(5),
                        paddingHorizontal: moderateScale(5),
                        borderRadius: 50,
                      }}
                    >
                      <MaterialIcons name="shopping-cart" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => DeleteFavorite(item.id)}>
                        <AntDesign name="delete" size={18} color="red" />
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
            <View style={{  justifyContent: "center", alignItems: "center",paddingTop:100 }}>
          <Text style={{fontFamily: "Poppins_500Medium" }}>No favorites</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
