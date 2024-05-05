import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import SearchTextInput from "../Components/search";
import SearchList from "../Components/searchList";
import { Context } from "../Context/context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Search({ navigation }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalSearchProducts, setOriginalSearchProducts] = useState([]);

  const { ReadProduct, products, setProducts, darkmode, productInCart } =
    useContext(Context);

  const prodCart = productInCart.length;

  const searchFilter = (text) => {
    const searchText = text.toUpperCase();
    if (text.length > 0) {
      setProducts(
        originalSearchProducts.filter((item) => {
          const title = item.title
            ? item.title.toUpperCase()
            : "".toUpperCase();
          return title.includes(searchText);
        })
      );
    } else {
      setProducts(originalSearchProducts);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await ReadProduct();
      if (products) {
        setLoading(false);
        setOriginalSearchProducts(products);
      }
    };
    fetchData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9",
        height: "100%",
        position: "relative",
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {loading ? (
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          >
            <ActivityIndicator style={{ marginTop: 20 }} color="#4ba26a" />
          </View>
        ) : (
          <>
            {products.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    marginBottom: 20,
                  }}
                >
                  <SearchList
                    id={item.id}
                    picurl={item.picurl}
                    title={item.title}
                    status={item.status}
                    amount={item.amount}
                    onPress={() => navigation.navigate("detail", item)}
                  />
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}
