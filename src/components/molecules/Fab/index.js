import React from "react";
import { TouchableOpacity } from "react-native";

const index = ({
  icon, color, onPress, diameter,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
      backgroundColor: color,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {icon}
  </TouchableOpacity>
);

export default index;
