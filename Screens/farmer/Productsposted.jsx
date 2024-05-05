import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import { Context } from "../../Context/context";
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchTextInput from "../../Components/search";

export default function Productsposted({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);
  const amount = route.params ?? "amount";

  const { darkmode, products, ReadProduct, DeleteProduct, setProducts } =
    useContext(Context);
  const totalProducts = products.length;

  useEffect(() => {
    const fetchDatas = async () => {
      await ReadProduct();
      if (products) {
        setLoading(false);
        setOriginalProducts(products);
      }
    };
    fetchDatas();
  }, [amount]);

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

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 0,
        }}
      >
        <TouchableOpacity
          style={{ paddingBottom: 20, paddingTop: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={25} />
        </TouchableOpacity>

        <SearchTextInput
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            searchFilter(text);
          }}
        />
      </View>
      <Text
        style={{
          paddingVertical: 20,
          alignSelf: "center",
          fontFamily: "Poppins_600SemiBold",
          color: darkmode ? "white" : "black",
        }}
      >
        All products I posted ({totalProducts})
      </Text>
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
                  borderRadius: 10,
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
                <TouchableOpacity>
                  <Image
                    source={{ uri: item.picurl }}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRightWidth: 8,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
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
                        fontSize: moderateScale(13),
                        color: darkmode ? "white" : "black",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(12),
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

                    <View style={{ flexDirection: "row", gap: 15 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("editproduct", item.id)
                        }
                      >
                        <AntDesign
                          name="edit"
                          size={18}
                          color={darkmode ? "white" : "black"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => DeleteProduct(item.id)}>
                        <AntDesign name="delete" size={18} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
