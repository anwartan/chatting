import React from "react";
import {
  Image,
  ImageBackground, StyleSheet, View,
} from "react-native";
import { ICChat, ICPerson } from "../../assets";
import {
  Button, Gap, Header, Text,
} from "../../components";
import { Typography } from "../../utils";

const index = ({
  headerTitle, src, name, onBackPress, type, onFeaturePress,
}) => {
  const Feature = () => {
    if (type === "FriendProfile") {
      return (
        <Button
          onPress={onFeaturePress}
          type="icon-detail"
          icon={<ICChat fill="#000" />}
          text="Chat"
        />
      );
    }
    return (
      <Button
        onPress={onFeaturePress}
        type="icon-detail"
        icon={<ICPerson fill="#000" />}
        text="Edit Profile"
      />
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
    //   source={ILLogin}
        imageStyle={{ height: "100%" }}
        style={styles.ImageBackground}
      >

        <Header
          type="with-backButton"
          title={headerTitle}
          onBackPress={onBackPress}
        />
        <View style={styles.wrapper}>
          <Gap height={30} />

          <Image style={styles.image} source={{ uri: src }} />
          <Gap height={30} />
          <View style={styles.detail}>
            <Text variant="600" styles={styles.name}>{name}</Text>

          </View>
          <Gap height={30} />
          <View>
            <Feature />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  ImageBackground: {
    // backgroundColor: "blue",
    height: "70%",
  },
  wrapper: {
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },
  detail: {
    alignItems: "center",
  },
  name: {
    fontSize: Typography.h5,
  },
});
