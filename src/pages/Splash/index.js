import React from "react";
import {
  Image, StyleSheet, View,
} from "react-native";
import { ILLogo } from "../../assets/illustration";

const index = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={ILLogo} />
  </View>
);

export default index;

const styles = StyleSheet.create({
  image: { width: 150, height: 150 },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
