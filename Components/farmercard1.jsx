import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function Farmer1({ image, profimage, title, name, date }) {
  return (
    <View style={{ backgroundColor: "", width: "65%" }}>
      <View
        style={{
          overflow: "hidden",
          borderRadius: 15,
          height: "50%",
          width: "100%",
        }}
      >
        <ImageBackground
          source={{ uri: image }}
          style={{ height: "100%", width: "100%" }}
        >
          <Feather
            name="bookmark"
            size={20}
            color="white"
            style={{ padding: 10 }}
          />
        </ImageBackground>
      </View>
      <Text
        style={{ color: "black", fontFamily: "Poppins_700Bold", fontSize: 19 }}
      >
        {title}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 5,
          }}
        >
          <Image
            source={{ uri: profimage }}
            style={{ width: "20%", height: 40, borderRadius: 5 }}
          />
          <Text style={{ textDecorationLine: "underline" }}>{name}</Text>
        </View>
        <View>
          <Text>{date}</Text>
        </View>
      </View>
    </View>
  );
}
