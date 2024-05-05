import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/context";
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "../../Components/Button";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

export default function Orderdetail({ navigation, route }) {
  const order = route.params;
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const { darkmode } = useContext(Context);

  useEffect(() => {
    setOrderStatus(order.status);
  }, []);

  const AcceptOrder = async (id) => {
    try {
      const updateResponse = await updateDoc(doc(FIREBASE_DB, "Orders", id), {
        status: "Order Accepted",
      });
      alert("Accepted");
      setOrderStatus("Order Accepted");
    } catch (error) {
      console.log(error);
    }
  };

  const RejectOrder = async (id) => {
    try {
      const updateResponse = await updateDoc(doc(FIREBASE_DB, "Orders", id), {
        status: "Order Rejected",
      });
      alert("rejected");
      setOrderStatus("Order Rejected");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{ paddingBottom: 20, paddingTop: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={25} />
        </TouchableOpacity>

        <View style={{ paddingBottom: 20 }}>
          <Text
            style={{ fontFamily: "Poppins_600SemiBold", paddingBottom: 10 }}
          >
            {order.checkUserName}
          </Text>
          <Text style={{ marginLeft: 20, fontFamily: "Poppins_400Regular" }}>
            {order.phoneNumber} ({order.useType})
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginBottom: 15,
            alignSelf: "flex-end",
            backgroundColor: "rgba(000,000,000,0.06)",
          }}
        >
          <Text style={{ fontSize: 14, fontFamily: "Poppins_500Medium",color:"#4ba26a" }}>
            {orderStatus}
          </Text>
        </View>

        <ScrollView>
          {order.products.map((product, index) => (
            <View
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
                backgroundColor: darkmode ? "#242526" : "white",
                width: "100%",
                borderRadius: 20,
                alignItems: "center",
                elevation: 10,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                marginBottom: 20,
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
                    style={{
                      position: "absolute",
                      top: 35,
                      alignSelf: "center",
                    }}
                    color={darkmode ? "white" : "#4ba26a"}
                  />
                )}
                <Image
                  source={{ uri: product.picurl }}
                  style={{ width: "100%", height: "100%", borderRadius: 13 }}
                  onLoad={() => setLoading(false)}
                />
              </View>
              <View style={{ width: "55%" }}>
                <Text
                  style={{
                    paddingBottom: 10,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  {product.title}
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 10, paddingBottom: 10 }}
                >
                  <Text>{product.count}</Text>
                  <Text>{product.status}</Text>
                </View>
                <Text
                  style={{
                    paddingBottom: 10,
                    fontWeight: "bold",
                    fontFamily: "Poppins_700Bold",
                    color: darkmode ? "white" : "black",
                  }}
                >
                  Rwf {product.amount}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

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
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 16,
                color: darkmode ? "white" : "black",
                paddingBottom: 10,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: "#4ba26a",
              }}
            >
              Rwf {order.total}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => RejectOrder(order.id)}
              style={{
                backgroundColor: "#F3F3F3",
                borderRadius: 7,
                width: "47%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  paddingVertical: 13,
                  fontWeight: "bold",
                  color: "#A1A1A1",
                }}
              >
                REJECT
              </Text>
            </TouchableOpacity>

            <View style={{ width: "47%" }}>
              <Button title="ACCEPT" onPress={() => AcceptOrder(order.id)} />
            </View>
          </View>
        </View>
        
      </View>
    </View>
  );
}
