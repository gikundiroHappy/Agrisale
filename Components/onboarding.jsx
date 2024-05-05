import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Button from "../Components/Button";

const { width, height } = Dimensions.get("window");

const COLORS = { primary: "#282534", white: "#fff" };

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

const Slide = ({ item, navigation }) => {
  return (
    <View style={{ alignItems: "center", width, paddingHorizontal: 60 }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 40,
          width,
        }}
        onPress={() => navigation.navigate("login")}
      >
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop:20
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>
      <View style={{ width: "100%", height: "50%", paddingVertical: 2 }}>
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
      <View>
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
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== onboardingSlides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate("login");
    }
  };

  const goToBacktSlide = () => {
    const backSlideIndex = currentSlideIndex - 1;
    if (backSlideIndex >= 0) {
      const offset = backSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = onboardingSlides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index
                  ? {
                      backgroundColor: "#4ba26a",
                      width: 35,
                      height: 7,
                      borderRadius: 5,
                    }
                  : {
                      backgroundColor: "#F3F3F3",
                      width: 35,
                      height: 7,
                      borderRadius: 5,
                    },
              ]}
            />
          ))}
        </View>

        <View style={{ marginBottom: 40 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F3F3F3",
                borderRadius: 7,
                width: "47%",
              }}
              onPress={goToBacktSlide}
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
              <Button title="Next" onPress={goToNextSlide} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={onboardingSlides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} navigation={navigation} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.primary,
    fontSize: 17,
    marginTop: 10,
    maxWidth: "70%",
    marginLeft: 20,
    lineHeight: 23,
  },
  title: {
    color: COLORS.primary,
    fontSize: 29,
    marginTop: 20,
    marginLeft: 20,
    textAlign: "left",
    fontFamily: "   Poppins_700Bold_Italic,",
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: "black",
    marginHorizontal: 3,
    borderRadius: 5,
  },
  btn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#9633AA",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#9633AA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  secondaryBtn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    borderColor: "#9633AA",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboarding;
