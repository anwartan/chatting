import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Gap, Text } from "../../atoms";

const index = ({
  message, me, date, image,
}) => {
  if (me) {
    return (
      <View style={[styles.container, styles.containerRight]}>
        <View>

          <View style={[styles.wrapper, styles.wrapperMe]}>
            <Text>{message}</Text>
          </View>
          <Text variant="300" styles={[styles.date, styles.right]}>{date}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Gap width={10} />
      <View>

        <View style={styles.wrapper}>
          <Text>{message}</Text>
        </View>
        <Text
          variant="300"
          styles={[styles.date, styles.left]}
        >
          {date}

        </Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 15,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
  },
  wrapper: {
    backgroundColor: "grey",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    maxWidth: 200,
  },
  wrapperMe: {
    borderBottomLeftRadius: 10,

    borderBottomRightRadius: 0,
  },
  date: {
    fontSize: 10,
    marginVertical: 5,

  },
  containerRight: {
    justifyContent: "flex-end",
  },
  containerleft: {
    justifyContent: "flex-start",
  },
  left: {
    alignSelf: "flex-end",
    marginRight: 5,
  },
  right: {
    alignSelf: "flex-start",
    marginLeft: 5,
  },
});
