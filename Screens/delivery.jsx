import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Dropdown from "../Components/dropdown";
import Button from "../Components/Button";
import { Context } from "../Context/context";
import OutsidePressHandler from "react-native-outside-press";
import { FIREBASE_DB } from "../FirebaseConfig";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { getItemAsync } from "expo-secure-store";

export default function Checkout({ navigation, route }) {
  const [useType, setUserType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [total, setTotal] = useState(route.params);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [usersId, setUsersId] = useState();
  const [checkUserName, setCheckUserName] = useState("");

  const useTypes = ["Approach buyer delivery", "Shop Pickup"];

  const handleSelect = (option) => {
    setUserType(option);
    if (option === "Approach buyer delivery") {
      setPhoneNumber("");
      setPhoneNumberError("");
      setTotal(parseFloat(total) + 1000);
    } else {
      setTotal(route.params);
    }
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);

    if (value.length < 10) {
      setPhoneNumberError("Phone number must be at least 10 digits");
    } else {
      setPhoneNumberError("");
    }
  };

  const { darkmode, productInCart } = useContext(Context);

  const GetuserProfile = async () => {
    try {
      const readResponse = await getDoc(doc(FIREBASE_DB, "user", usersId));
      setCheckUserName(readResponse.data().username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemAsync("userId")
      .then((data) => {
        setUsersId(data);
      })
      .catch((er) => {
        console.log(er);
      });
    GetuserProfile();
  }, [usersId]);
  const a = new Date();

  const HandleOrders = async () => {
    try {
      const orderRef = await addDoc(collection(FIREBASE_DB, "Orders"), {
        products: productInCart,
        phoneNumber: phoneNumber,
        total: total,
        checkUserName: checkUserName,
        useType: useType,
        orderstatus: false,
        myorderstatus: false,
        status: "pending",
        date: new Date(),
      });
      alert("you have ordered");
    } catch (error) {
      console.error("Error creating order: ", error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fF2F2F2",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={18}
            style={{ padding: 15, fontFamily: "Poppins_600SemiBold" }}
          />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            padding: 15,
            fontSize: 18,
            left: 80,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Checkout
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontFamily: "Poppins_600SemiBold", paddingBottom: 15 }}>
          Delivery Method
        </Text>
        <Dropdown
          options={useTypes}
          selectedOption={useType}
          onSelect={handleSelect}
        />
      </View>
      {useType === "Approach buyer delivery" && (
        <OutsidePressHandler
          onOutsidePress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{ fontFamily: "Poppins_600SemiBold", paddingVertical: 15 }}
            >
              Enter Phone Number
            </Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="numeric"
              placeholder="Enter your phone number"
            />
            {phoneNumberError ? (
              <Text style={styles.error}>{phoneNumberError}</Text>
            ) : null}
          </View>
        </OutsidePressHandler>
      )}

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          backgroundColor: darkmode ? "#242526" : "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.84,
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
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              color: "#4ba26a",
            }}
          >
            Rwf {total}
          </Text>
        </View>
        <Button title="ORDER" onPress={HandleOrders} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },

  circleIcon: {},
  selectedCircle: {
    color: "#53B175",
  },
});
