import { Image, Button } from "react-native";
import React from "react";

// import Onboarding from "react-native-onboarding-swiper"; // 0.4.0
import Onboarding from "react-native-onboarding-swiper";

const OnBoardingScreen = ({ navigation }) => (
  <Onboarding
    onSkip={() => {
      navigation.navigate("Loading");
    }}
    onDone={() => {
      navigation.navigate("Loading");
    }}
    pages={[
      {
        backgroundColor: "#a6e4d0",
        image: (
          <Image
            style={{ width: 180, height: 180 }}
            source={require("./../../images/circle.png")}
          />
        ),
        title: "Welcome To SKOSH",
        subtitle: "We aim to provide you the fast food delivery service.",
      },

      {
        backgroundColor: "#fdeb93",
        image: <Image source={require("./../../assets/icon.png")} />,
        title: "Order Now",
        subtitle: "Help Us Serve You Better!!",
      },
    ]}
  />
);

export default OnBoardingScreen;
