import React from "react";
import { StyleSheet, View } from "react-native";
import { ICBackArrow } from "../../../assets";
import { Typography } from "../../../utils";
import { Button, Gap, Text } from "../../atoms";

const index = ({
  type, title, iconRight, onIconRightPress, onBackPress,
}) => {
  if (type === "with-backButton") {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Button
            type="icon-only"
            icon={<ICBackArrow fill="#000" />}
            onPress={onBackPress}
          />
          <Gap width={20} />
          <Text styles={styles.headerTitle} variant="600">{title}</Text>
        </View>
        {
            iconRight && (
            <Button
              type="icon-only"
              icon={iconRight}
              onPress={onIconRightPress}
            />
            )
        }
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text styles={styles.headerTitle} variant="600">{title}</Text>
      </View>
      {
            iconRight && (
            <Button
              type="icon-only"
              icon={iconRight}
              onPress={onIconRightPress}
            />
            )
        }

    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Typography.h6,
  },

});
