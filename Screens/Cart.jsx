import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Productincart from "../Components/Productincart";
import { Context } from "../Context/context";
import Button from "../Components/Button";
import SearchTextInput from "../Components/search";

export default function Cart({ navigation }) {
  const [search, setSearch] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);

  const { productInCart, DisplayCart, total, setProductInCart, darkmode } =
    useContext(Context);

  const searchFilter = (text) => {
    const searchText = text.toUpperCase();
    if (text.length > 0) {
      setProductInCart(
        originalProducts.filter((item) => {
          const title = item.title
            ? item.title.toUpperCase()
            : "".toUpperCase();
          return title.includes(searchText);
        })
      );
    } else {
      setProductInCart(originalProducts);
    }
  };

  useEffect(() => {
    const fetchDataCart = async () => {
      await DisplayCart();
      if (productInCart) {
        setOriginalProducts(productInCart);
      }
    };
    fetchDataCart();
  }, []);

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: darkmode ? "#2f2f2f" : "FBF9F9",
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
        <View style={{ width: "97%" }}>
          <SearchTextInput
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              searchFilter(text);
            }}
          />
        </View>
      </View>

      {productInCart.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontFamily: "Poppins_500Medium" }}>
            No data in the Cart
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            {productInCart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <Productincart
                  id={item.id}
                  picurl={item.picurl}
                  title={item.title}
                  status={item.status}
                  price={item.amount}
                  count={item.count}
                />
              </View>
            ))}
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 20,
              backgroundColor: darkmode ? "#242526" : "#FBF9F9",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 20,
                  color: darkmode ? "white" : "black",
                }}
              >
                Total:
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 18,
                  color: darkmode ? "white" : "black",
                }}
              >
                {" "}
                Rwf {parseFloat(total).toFixed(2)}
              </Text>
            </View>
            <View style={{ width: "50%", alignSelf: "flex-end" }}>
              <Button
                title="Goto Checkout"
                onPress={() => navigation.navigate("delivery", total)}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
