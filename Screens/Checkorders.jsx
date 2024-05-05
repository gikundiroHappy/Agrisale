import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Context } from "../Context/context";

export default function Checkorders({ navigation, route }) {
  const { darkmode } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const myorder = route.params;

  const PayByMomo = () => {
    try {
      let code = "*182*1*1*0788263772#";
      Linking.openURL(`tel:${code}`);
    } catch (error) {
      console.error("Error initiating MOMO payment:", error);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method === selectedPaymentMethod ? "" : method);
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: darkmode ? "#2f2f2f" : "#FBF9F9",
        position: "relative",
      }}
    >
      <TouchableOpacity
        style={{ paddingBottom: 20, paddingTop: 10 }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={25} />
      </TouchableOpacity>

      <View>
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
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins_500Medium",
              color: "#4ba26a",
            }}
          >
            {myorder.status}
          </Text>
        </View>

        <ScrollView>
          {myorder.products.map((product, index) => (
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
                elevation: 5,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.1,
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
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: "rgba(000,000,000,0.03)",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
            Rwf {myorder.total}
          </Text>
        </View>

        {myorder.status == "Order Accepted" ? (
          <View
            style={{
              display: "flex",
              top: 15,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 17,
                paddingVertical: 20,
                alignSelf: "center",
              }}
            >
              Payment Method
            </Text>

            <TouchableOpacity
              onPress={PayByMomo}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                top: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FEFEFE",
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: "#F1F1F1",
                  }}
                >
                  <Feather
                    name="smartphone"
                    size={25}
                    style={{ padding: 8, color: "#53B175" }}
                  />
                </View>

                <Text
                  style={{
                    textAlign: "center",
                    left: 8,
                    padding: 9,
                    fontWeight: "500",
                    alignSelf: "center",
                  }}
                >
                  MOMO Pay
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePaymentMethodSelect("MOMO Pay")}
                style={[styles.selectedPaymentMethod === "MOMO Pay"]}
              >
                <FontAwesome
                  name="circle-o"
                  size={23}
                  style={[
                    styles.circleIcon,
                    selectedPaymentMethod === "MOMO Pay" &&
                      styles.selectedCircle,
                  ]}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                top: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FEFEFE",
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: "#F1F1F1",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FEFEFE",
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: "#F1F1F1",
                    }}
                  >
                    <Image
                      source={require("../assets/visa.jpg")}
                      style={{ padding: 13, top: 10 }}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    left: 8,
                    padding: 9,
                    fontWeight: "500",
                    alignSelf: "center",
                  }}
                >
                  VISA Card
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePaymentMethodSelect("VISA Card")}
                style={[styles.selectedPaymentMethod === "VISA Card"]}
              >
                <FontAwesome
                  name="circle-o"
                  size={23}
                  style={[
                    styles.circleIcon,
                    selectedPaymentMethod === "VISA Card" &&
                      styles.selectedCircle,
                  ]}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                top: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#FEFEFE",
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: "#F1F1F1",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FEFEFE",
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: "#F1F1F1",
                    }}
                  >
                    <Image
                      source={require("../assets/ms.jpg")}
                      style={{ padding: 13, top: 10 }}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    left: 8,
                    padding: 9,
                    fontWeight: "500",
                    alignSelf: "center",
                  }}
                >
                  MASTER Card
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePaymentMethodSelect("MASTER Card")}
                style={[styles.selectedPaymentMethod === "MASTER Card"]}
              >
                <FontAwesome
                  name="circle-o"
                  size={23}
                  style={[
                    styles.circleIcon,
                    selectedPaymentMethod === "MASTER Card" &&
                      styles.selectedCircle,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
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
