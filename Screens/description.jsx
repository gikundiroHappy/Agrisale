import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";
import { SliderBox } from "react-native-image-slider-box";

const height = Dimensions.get("screen").height;
import Button from "../Components/Button";
import { Context } from "../Context/context";

export default function Details({ navigation, route }) {
  const [checkUserName, setCheckUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [usertype, setUsertype] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { darkmode } = useContext(Context);

  const rout = route.params;

  const imageSource = { uri: rout.picurl };
  const sliders = [imageSource.uri, imageSource.uri, imageSource.uri];

  const GetuserProfile = async () => {
    try {
      setIsLoading(true);
      const readResponse = await getDoc(doc(FIREBASE_DB, "user", rout.addedby));
      setCheckUserName(readResponse.data().username);
      setProfilePhoto(readResponse.data().profUrl);
      setUsertype(readResponse.data().usertype);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetuserProfile();
  }, []);

  return (
    <View
      style={{
        backgroundColor: darkmode ? "#2f2f2f" : "white",
        height: height,
      }}
    >
      <View style={{ height: 330 }}>
        <SliderBox
          position="relative"
          images={sliders}
          dotColor={"#47AD6D"}
          borderRadius={15}
          autoplay
          circleLoop
          sliderBoxHeight={"100%"}
          dotStyle={{
            width: 13,
            height: 13,
            borderRadius: 50,
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 30, left: 10 }}
        >
          <AntDesign
            name="arrowleft"
            style={{
              color: darkmode ? "white" : "#212121",
              color: "black",
              fontSize: 25,
              marginTop: 4,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 16,
              color: darkmode ? "white" : "#212121",
              fontWeight: "500",
            }}
          >
            {rout.title}
          </Text>
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 15,
              color: darkmode ? "white" : "#212121",
              fontWeight: "500",
            }}
          >
            {rout.status}
          </Text>
        </View>
        <Text
          style={{ fontWeight: "bold", color: darkmode ? "white" : "black" }}
        >
          Rwf {rout.amount}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: darkmode ? "white" : "#212121",
            paddingTop: 30,
          }}
        >
          We sell wholesale and retail
        </Text>
        <Text style={{ fontSize: 15, color: darkmode ? "white" : "#212121" }}>
          Rwf {rout.amount} {rout.status}
        </Text>
        <Text style={{ fontSize: 15, color: darkmode ? "white" : "#212121" }}>
          {rout.amount * 25} one sack 25kg
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            paddingTop: 30,
            textDecorationLine: "underline",
            color: darkmode ? "white" : "black",
          }}
        >
          Seller
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            marginTop: 10,
            gap: 10,
          }}
        >
          {isLoading && (
            <ActivityIndicator
              style={{ alignSelf: "center", paddingLeft: 40 }}
              color={darkmode ? "white" : "#4ba26a"}
            />
          )}
          <Image
            source={{ uri: profilePhoto }}
            style={{ height: 100, width: 100, borderRadius: 65 }}
          />
          <View>
            <Text
              style={{ fontSize: 15, color: darkmode ? "white" : "#212121" }}
            >
              {checkUserName}
            </Text>
            <Text
              style={{ fontSize: 15, color: darkmode ? "white" : "#212121" }}
            >
              {usertype}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{ padding: 12 }}>
          <Button title={"Contact the Seller"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}