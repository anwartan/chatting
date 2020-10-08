import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, Typography } from "../../../utils";
import { Button, Gap, Text } from "../../atoms";

const index = ({
  name, deskripsi, onPress, disable,
  date, icon, onIconPress, src,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disable}
    style={styles.container}
  >
    <Image style={styles.image} source={{ uri: src }} />
    <Gap width={20} />
    <View style={styles.content}>

      <Text
        variant="600"
        styles={styles.name}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
      <Text styles={styles.deskripsi} numberOfLines={1} ellipsizeMode="tail">
        {deskripsi}
      </Text>
    </View>

    <View>

      {
        date
      && <Text variant="300">{date}</Text>
      }

      {
      icon
      && <Button onPress={onIconPress} type="icon-only" icon={icon} />
    }
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,

  },
  name: {
    fontSize: Typography.h7,
  },
  deskripsi: {
    fontSize: Typography.h8,
    color: colors.text.disable,
  },
});
export default index;
