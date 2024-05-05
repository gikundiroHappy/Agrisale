import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Context } from "../Context/context";

export default function Productincart({
  id,
  title,
  picurl,
  status,
  price,
  count,
}) {
  const [loading, setLoading] = useState(true);
  const { incrementProducts, decrementProducts, darkmode } =
    useContext(Context);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: darkmode ? "#242526" : "white",
        width: "90%",
        borderRadius: 20,
        marginHorizontal: 20,
        alignItems: "center",
        elevation: 10,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      }}
    >
      <View
        style={{
          width: 90,
          height: 90,
          borderWidth: 2,
          borderColor: "#4ba26a",
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        {loading && (
          <ActivityIndicator
            style={{ position: "absolute", top: 35, alignSelf: "center" }}
            color={darkmode ? "white" : "#4ba26a"}
          />
        )}
        <Image
          source={{ uri: picurl }}
          style={{ width: "100%", height: "100%", borderRadius: 13 }}
          onLoad={() => setLoading(false)}
        />
      </View>
      <View style={{ width: "45%" }}>
        <Text
          style={{
            paddingBottom: 10,
            fontFamily: "Poppins_500Medium",
            fontSize: 16,
            color: darkmode ? "white" : "black",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            color: darkmode ? "white" : "#9A9CA0",
            fontFamily: "Poppins_400Regular",
          }}
        >
          {status}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            fontWeight: "bold",
            fontFamily: "Poppins_700Bold",
            color: darkmode ? "white" : "black",
          }}
        >
          Rwf {price}
        </Text>
      </View>
      <View style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => incrementProducts(id)}>
          <AntDesign name="pluscircle" size={25} color="#4ba26a" />
        </TouchableOpacity>
        <Text style={{ color: darkmode ? "white" : "black" }}>{count}</Text>
        <TouchableOpacity onPress={() => decrementProducts(id)}>
          <AntDesign name="minuscircle" size={25} color="#4ba26a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
