import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Button from "./Button";

import { Context } from "../Context/context";

import { moderateScale } from "react-native-size-matters";

export default function SearchList({
  id,
  title,
  picurl,
  status,
  amount,
  onPress,
}) {
  const { handleAddToCart, darkmode } = useContext(Context);
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        gap: moderateScale(30),
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(20),
        backgroundColor: darkmode ? "#242526" : "white",
        width: "90%",
        borderRadius: moderateScale(20),
        marginHorizontal: moderateScale(20),
        alignItems: "center",
        elevation: moderateScale(10),
        shadowOffset: {
          width: 0,
          height: moderateScale(1),
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(2),
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: moderateScale(160),
          height: moderateScale(140),
          borderWidth: moderateScale(2),
          borderColor: "#4ba26a",
          borderRadius: moderateScale(15),
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: picurl }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: moderateScale(13),
          }}
        />
      </View>
      <View style={{ width: "45%" }}>
        <Text
          style={{
            fontWeight: "light",
            paddingBottom: moderateScale(10),
            fontFamily: "Poppins_500Medium",
            fontSize: moderateScale(16),
            color: darkmode ? "white" : "black",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            paddingBottom: moderateScale(10),
            color: "#9A9CA0",
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          {status}
        </Text>
        <Text
          style={{
            paddingBottom: moderateScale(10),
            fontWeight: "bold",
            fontFamily: "Poppins_700Bold",
            color: darkmode ? "white" : "black",
          }}
        >
          Rwf {amount}
        </Text>

        <View style={{ width: "80%", marginLeft: moderateScale(5) }}>
          <Button
            title="Add to cart"
            onPress={() =>
              handleAddToCart({ id, title, status, amount, picurl })
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
