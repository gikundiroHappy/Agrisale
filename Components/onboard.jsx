import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { Image, View, Text, TouchableOpacity } from "react-native";
import Button from "./Button";

function Onboard({ navigation }) {
  const onboardingSlides = [
    {
      key: 0,
      title: "Monitoring soil and plant",
      text: "We aim to use optical (VIR) sensing to observe the fields and make timely crop management decisions.",
      image: require("../assets/boardone.png"),
    },
    {
      key: 1,
      title: "Early detection of plant and soil diseases",
      text: "Our project can detect plant and soil diseases using an existing camera sensor that tracks the plants in real-time day by day.",
      image: require("../assets/boardtwo.png"),
    },
    {
      key: 2,
      title: "Improve agriculture precision",
      text: "We will use satellite imagery, image processing, deep learning, computer vision, and remote sensing to detect changes in the field and crops and solve the problems whenever they pop.",
      image: require("../assets/boardthree.png"),
    },
  ];

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        paddingTop: 40,
      }}
    >
      <View style={{ display: "flex", width: "100%" }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 40,
          }}
          onPress={() => navigation.navigate("login")}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppIntroSlider
          data={onboardingSlides}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index}
                style={{
                  paddingHorizontal: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{ width: "100%", height: "50%", paddingVertical: 2 }}
                >
                  <Image
                    source={item.image}
                    style={{
                      resizeMode: "contain",
                      width: "100%",
                      height: "100%",
                      alignSelf: "center",
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 19,
                    paddingVertical: 20,
                    paddingHorizontal: 28,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    paddingBottom: 60,
                    color: "#A1A1A1",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            );
          }}
          activeDotStyle={{ width: 35, height: 7, backgroundColor: "#4ba26a" }}
          dotStyle={{ width: 35, height: 7, backgroundColor: "#F3F3F3" }}
          dotClickEnabled={true}
          showNextButton={false}
        />
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          paddingHorizontal: 40,
          paddingTop: 15,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#F3F3F3", borderRadius: 7, width: "47%" }}
        >
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 13,
              fontWeight: "bold",
              color: "#A1A1A1",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <View style={{ width: "47%" }}>
          <Button title="Next" />
        </View>
      </View>
    </View>
  );
}

export default Onboard;
