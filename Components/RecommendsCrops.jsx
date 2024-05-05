import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { moderateScale } from "react-native-size-matters";
import { Context } from "../Context/context";

export default function RecommendsCrops({
  id,
  image,
  title,
  price,
  status,
  onPress,
}) {

 const {handleAddToCart} = useContext(Context)

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "47%",
        height: "35%",
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
      <TouchableOpacity onPress={onPress} style={{height:"60%"}}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height:"100%"}}
        />
      </TouchableOpacity>
      <View
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
        <Octicons name="heart" size={moderateScale(15)} />
      </View>

      <View style={{ padding: moderateScale(10) }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: moderateScale(15),
          }}
        >
          <Text style={{ fontSize: moderateScale(15) }}>{title}</Text>
          <Text style={{ fontSize: moderateScale(13) }}>{status}</Text>
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
            }}
          >
            ${price}
          </Text>
          <TouchableOpacity onPress={() => handleAddToCart({ id, title, status, price, image })}
            style={{
              backgroundColor: "#E4E4E4",
              paddingVertical: moderateScale(5),
              paddingHorizontal: moderateScale(5),
              borderRadius: 50,
            }}
          >
            <MaterialIcons name="shopping-cart" size={20}  />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}