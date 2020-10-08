import React from "react";
import {
  StyleSheet, TouchableOpacity,
} from "react-native";
import { Gap, Text } from "../../atoms";

const index = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    {icon}
    <Gap width={20} />
    <Text variant="600">{title}</Text>
  </TouchableOpacity>
);

export default index;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
