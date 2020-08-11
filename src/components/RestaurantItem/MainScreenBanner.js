import React from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
var { height, width } = Dimensions.get("window");
import Swiper from "react-native-swiper";

const MainScreenBanner = () => {
  const dataBanner = [
    "http://tutofox.com/foodapp//banner/banner-1.jpg",
    "http://tutofox.com/foodapp//banner/banner-2.jpg",
    "http://tutofox.com/foodapp//banner/banner-3.png",
  ];
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <Swiper
          style={styles.container}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={5}
        >
          {dataBanner.map((itembann) => {
            return (
              <Image
                style={styles.imageBanner}
                resizeMode="contain"
                source={{ uri: itembann }}
              />
            );
          })}
        </Swiper>
        <View style={{ height: 20 }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: width / 2,
  },
  imageBanner: {
    height: width / 2,
    width: width - 45,
    borderRadius: 10,
    marginHorizontal: 15,
  },
});

export default MainScreenBanner;
