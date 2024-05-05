import React, { useEffect, useState, useContext } from "react";
import { AntDesign, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Button from "../Components/Button";
import Set from "../Components/profi";
import { Context } from "../Context/context";
import { getItemAsync } from "expo-secure-store";
import { FIREBASE_DB } from "../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Profile({ navigation, route }) {
  const [checkEmail, setCheckEmail] = useState("");
  const [checkUserName, setCheckUserName] = useState("");
  const [usersId, setUsersId] = useState();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const username = route.params ?? "name";
  const { LogOut, darkmode, changeMode, logged } = useContext(Context);

  getItemAsync("userEmail")
    .then((data) => {
      setCheckEmail(data);
    })
    .catch((er) => {
      console.log(er);
    });

  useEffect(() => {
    getItemAsync("userId")
      .then((data) => {
        setUsersId(data);
      })
      .catch((er) => {
        console.log(er);
      });
    GetuserProfile();
  }, [usersId, username]);

  const GetuserProfile = async () => {
    try {
      setIsLoading(true);
      const readResponse = await getDoc(doc(FIREBASE_DB, "user", usersId));
      setCheckUserName(readResponse.data().username);
      setProfilePhoto(readResponse.data().profUrl);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleLogout = async () => {
    try {
      await LogOut();
      navigation.navigate("login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const profileset = [
    {
      icon: <Entypo name="language" size={20} />,
      name: "Language",
    },
    {
      icon: <AntDesign name="wifi" size={20} />,
      name: "Favorites",
    },
  ];
  return (
    <View
      style={{
        backgroundColor: darkmode ? "#2f2f2f" : "white",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#4ba26a",
          position: "absolute",
          width: "100%",
          top: 0,
          right: 0,
          left: 0,
          paddingTop: 50,
          paddingHorizontal: 20,
          height: 170,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>
          <AntDesign
            name="arrowleft"
            size={25}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 15,
            color: "white",
          }}
        >
          {" "}
          Profile
        </Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ position: "relative", top: 120 }}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {profilePhoto ? (
            <Image
              style={styles.image}
              source={{
                uri: profilePhoto,
              }}
            />
          ) : (
            <>
              {isLoading ? (
                <View style={{ width: 100, height: 100 }}>
                  <ActivityIndicator
                    style={{ top: 65 }}
                    color={darkmode ? "white" : "#4ba26a"}
                  />
                </View>
              ) : (
                <View style={{ backgroundColor: "red" }}>
                  <Image
                    source={{
                      uri: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      borderWidth: 3,
                      borderColor: "white",
                    }}
                  />
                </View>
              )}
            </>
          )}
        </View>
        <Text
          style={{
            fontFamily: "Poppins_700Bold",
            color: darkmode ? "white" : "black",
            fontSize: 17,
            textAlign: "center",
          }}
        >
          {checkUserName}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            color: darkmode ? "white" : "black",
            fontSize: 12,
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          {checkEmail}
        </Text>

        <View style={{ height: 30 }}></View>

        <View style={{ width: "40%", alignSelf: "center" }}>
          <Button
            title="Edit Profile"
            onPress={() => navigation.navigate("editprofile", usersId)}
          />
        </View>
      </View>
      <View style={{ top: 90 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 28,
            marginTop: 30,
          }}
        >
          {profileset.map((item, index) => {
            return (
              <View
                key={index}
                style={{ marginTop: 3, justifyContent: "space-evenly" }}
              >
                <Set
                  icon={item.icon}
                  name={item.name}
                  onPress={() => navigation.navigate("favs")}
                />
              </View>
            );
          })}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: darkmode ? "#242526" : "white",
              marginTop: 10,
              padding: 12,
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => changeMode()}>
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <View style={{ fontSize: 20, fontFamily: "Poppins_700Bold" }}>
                  {darkmode ? (
                    <FontAwesome5
                      name="moon"
                      size={20}
                      style={{ color: "white" }}
                    />
                  ) : (
                    <Feather name="moon" size={20} />
                  )}
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    color: darkmode ? "white" : "black",
                  }}
                >
                  dark mode
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {logged == "buyer" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("allmyorders", checkUserName)}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  paddingHorizontal: 13,
                  paddingTop: 20,
                }}
              >
                <View style={{ fontSize: 20, fontFamily: "Poppins_700Bold" }}>
                  <Ionicons name="bag-outline" size={20} />
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    color: darkmode ? "white" : "black",
                  }}
                >
                  My Orders
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={{
              marginTop: 35,
              paddingLeft: 15,
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
            onPress={HandleLogout}
          >
            <MaterialIcons name="logout" size={25} color="#4ba26a" />
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 16,
                color: "#4ba26a",
              }}
            >
              logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
});
