import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { cropcateImages } from "../Components/Constants";
import CropCategory from "../Components/cropCategories";
import SearchTextInput from "../Components/search";
import { useContext } from "react";
import { Context } from "../Context/context";
import { moderateScale } from "react-native-size-matters";
import { StatusBar } from "expo-status-bar";
import Octicons from "react-native-vector-icons/Octicons";
import { getItemAsync } from "expo-secure-store";

export default function BuyerDashboard({ navigation }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [usersId, setUsersId] = useState();
  const [originalProducts, setOriginalProducts] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    Array(originalProducts.length).fill(false)
  );

  const {
    ReadProduct,
    products,
    setProducts,
    handleAddToCart,
    darkmode,
    productInCart,
    AddFavorites,
    DeleteFavorite,
  } = useContext(Context);

  const prodCart = productInCart.length;

  const searchFilter = (text) => {
    const searchText = text.toUpperCase();
    if (text.length > 0) {
      setProducts(
        originalProducts.filter((item) => {
          const title = item.title
            ? item.title.toUpperCase()
            : "".toUpperCase();
          return title.includes(searchText);
        })
      );
    } else {
      setProducts(originalProducts);
    }
  };

  useEffect(() => {
    getItemAsync("userId")
      .then((data) => {
        setUsersId(data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [usersId]);

  useEffect(() => {
    const fetchDatas = async () => {
      await ReadProduct();
      if (products) {
        setLoading(false);
        setOriginalProducts(products);
      }
    };
    fetchDatas();
  }, [prodCart]);

  const handleFavorite = async (index, item) => {
    const isFavorite = favorites[index];
    console.log("isfav:", isFavorite);
    if (isFavorite) {
      const deleteResponse = await DeleteFavorite(item.id);
      console.log("itemid:", item.id);
      if (deleteResponse && deleteResponse.success) {
        setOriginalProducts((prev) =>
          prev.filter((product) => product.id !== item.id)
        );
        alert("Item removed from favorites");
      } else {
        alert("Failed to remove item from favorites");
      }
    } else {
      await AddFavorites(
        item.title,
        item.status,
        item.amount,
        item.picurl,
        usersId
      );
      alert("Item added to favorites");
    }

    setFavorites((prev) => {
      const updatedFavorites = [...prev];
      updatedFavorites[index] = !updatedFavorites[index];
      return updatedFavorites;
    });
  };

  return (
    <View
      style={{
        backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9",
        height: "100%",
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
        <View style={{ width: "83%" }}>
          <SearchTextInput
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              searchFilter(text);
            }}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <MaterialIcons name="shopping-cart" size={40} color="#4ba26a" />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#4ba26a",
              position: "absolute",
              paddingHorizontal: 7,
              paddingVertical: 2,
              borderRadius: 50,
              right: 33,
              top: -5,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>{prodCart}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: darkmode ? "white" : "black",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
          }}
        >
          Shop by category
        </Text>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {cropcateImages.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 2,
                }}
              >
                <CropCategory image={item.image} />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: darkmode ? "white" : "black",
            paddingVertical: 20,
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
          }}
        >
          Recommended
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: moderateScale(5) }}
        style={{ flexGrow: 1, marginHorizontal: 10 }}
      >
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} color="#4ba26a" />
        ) : (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {products.map((item, index) => (
              <View
                key={index}
                style={{
                  width: "48%",
                  marginBottom: 20,
                  backgroundColor: darkmode ? "#242526" : "white",
                  width: "47%",
                  borderRadius: 10,
                  overflow: "hidden",
                  marginBottom: 20,
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

                <TouchableOpacity
                  onPress={() => handleFavorite(index, item)}
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    padding: moderateScale(8),
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: moderateScale(10),
                    right: moderateScale(10),
                    elevation: 5,
                  }}
                >
                  {favorites[index] ? (
                    <Octicons
                      name="heart-fill"
                      size={moderateScale(15)}
                      color="#4ba26a"
                    />
                  ) : (
                    <Octicons
                      name="heart"
                      size={moderateScale(15)}
                      color="#4ba26a"
                    />
                  )}
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
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <StatusBar style="black" backgroundColor="#4ba26a" color="color" />
    </View>
  );
}
