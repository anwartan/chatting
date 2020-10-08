import React from "react";
import { Image, StyleSheet } from "react-native";

const index = ({ src }) => (
  <Image style={styles.image} source={{ uri: src }} />

);

export default index;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: "grey",
  },
});
