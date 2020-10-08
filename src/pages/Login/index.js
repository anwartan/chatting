import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";
import auth from "@react-native-firebase/auth";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { ILLogin } from "../../assets";
import { Gap, Text } from "../../components";
import {
  colors, Typography, useStateValue,
} from "../../utils";

const index = ({ navigation }) => {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
      "39388070137-vg4b9h1elco4lb3t88ldfguf0s0oiuaj.apps.googleusercontent.com",
      offlineAccess: true,
      // hostedDomain: "",
      // loginHint: "",
      forceCodeForRefreshToken: true,
      // accountName: "",
      // iosClientId: "<FROM DEVELOPER CONSOLE>",
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("Failed To Login");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Operation is in progress already");
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        alert("Play Service not available");
      } else {
        alert("Something is error");

        // some other error happened
      }
    }
  };
  return (
    <ImageBackground source={ILLogin} style={styles.container}>
      <Text variant="900" styles={styles.title}>
        Chatting
        {"\n"}
        With Your Friends
      </Text>
      <Gap height={33} />
      {/* <Button
        onPress={() => navigation.navigate("MainApp")}
        text="Login With Google"
      /> */}
      <GoogleSigninButton
        style={{ width: "100%" }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        // disabled={this.state.isSigninInProgress}
      />
      <Gap height={50} />

    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: Typography.h1,
    color: colors.text.secondary,
  },
});
