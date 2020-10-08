import React from "react";
import { StyleSheet, View } from "react-native";
import { Profile } from "../../template";

const index = ({ navigation, route }) => {
  const { profile } = route.params;

  return (
    <View style={styles.container}>
      <Profile
        onFeaturePress={() => navigation.navigate("EditProfile")}
        headerTitle="My Profile"
        name={profile?.displayName}
        src={profile?.photoURL}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});
