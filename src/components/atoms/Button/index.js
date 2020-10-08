import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "..";
import { colors, Typography } from "../../../utils";

const Button = ({
  text, onPress, type, icon,
}) => {
  if (type === "icon-only") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, styles.buttonIconOnly]}
      >
        {icon}
      </TouchableOpacity>
    );
  }
  if (type === "icon-detail") {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        {icon}
        <Text variant="500" styles={styles.textDetail}>{text}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles.buttonDefault]}
    >
      <Text variant="500" styles={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",

  },
  buttonIconOnly: {
    width: 30,
    height: 30,
  },
  buttonDefault: {
    backgroundColor: colors.button.primary,
    height: 45,
    borderRadius: 20,
  },
  text: {
    color: colors.text.secondary,
    fontSize: Typography.h7,
  },
  textDetail: {
    color: colors.text.primary,
    fontSize: Typography.h8,
  },
});
