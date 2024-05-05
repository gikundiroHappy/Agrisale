import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { moderateScale } from "react-native-size-matters";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/context";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";

export default function Allmyorders({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { darkmode } = useContext(Context);

  const Update = async (id) => {
    try {
      const updateResponse = await updateDoc(doc(FIREBASE_DB, "Orders", id), {
        myorderstatus: true,
      });
      ReadOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const ReadOrders = async () => {
    try {
      const username = route.params;
      const readResponse = await getDocs(collection(FIREBASE_DB, "Orders"));
      const filteredOrders = readResponse.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((order) => order.checkUserName == username);
      setOrders(filteredOrders);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ReadOrders();
  }, [orders]);

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

        <Text
          style={{
            paddingBottom: 20,
            alignSelf: "center",
            fontFamily: "Poppins_600SemiBold",
            color: darkmode ? "white" : "black",
          }}
        >
          My Orders
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: moderateScale(5) }}
          style={{ flexGrow: 1 }}
        >
          {loading ? (
            <ActivityIndicator style={{ marginTop: 20 }} color="#4ba26a" />
          ) : (
            <View style={{}}>
              {orders.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("checkorders", item);
                    Update(item.id);
                  }}
                  key={index}
                  style={{
                    width: "100%",
                    height: 100,
                    backgroundColor: darkmode
                      ? "#242526"
                      : "rgba(000,000,000,0.04)",
                    borderRadius: 10,
                    marginBottom: 15,
                    flexDirection: "row",
                    gap: 10,
                    padding: 15,
                  }}
                >
                  {!item.myorderstatus ? (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        backgroundColor: "red",
                        borderRadius: 50,
                        marginTopTop: 10,
                      }}
                    ></View>
                  ) : null}

                  <View>
                    <Text style={{ fontFamily: "Poppins_400Regular" }}>
                      OrderId: {item.id}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        paddingVertical: 20,
                        paddingLeft: 20,
                        color: "#ABABAB",
                      }}
                    >
                      {new Date(item.date.seconds * 1000).toString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
