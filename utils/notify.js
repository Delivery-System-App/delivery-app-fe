import { ToastAndroid, Platform } from "react-native";

export const notify = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
