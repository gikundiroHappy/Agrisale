import React from "react";
import { View, Text, ImageBackground } from "react-native";
export default function Farmer2({ title, date, image }) {
  return (
    <View style={{ margin: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            height: "50%",
            width: "40%",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={{ uri: image }}
            style={{ height: "100%", weight: "100%" }}
          ></ImageBackground>
        </View>
        <View style={{ display: "flex" }}>
          <Text style={{ textAlign: "center" }}>{date}</Text>
          <Text
            style={{
              paddingTop: 40,
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              paddingLeft: 8,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}
