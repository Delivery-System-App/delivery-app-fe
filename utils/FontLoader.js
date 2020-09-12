import React, { Component } from "react";
import { Root } from "native-base";
import * as Font from "expo-font";
import { AppLoading } from "expo";
export default class FontLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }
  render() {
    return null;
  }
}
