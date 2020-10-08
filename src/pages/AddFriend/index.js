import React from "react";
import { StyleSheet, View } from "react-native";
import { ICSearch } from "../../assets";
import { Button, Header } from "../../components";

const index = ({ navigation }) => (
  <View style={styles.container}>
    <Header
      title="Add Friend"
      type="with-backButton"
      onBackPress={() => navigation.goBack()}
    />
    <View>
      <View style={styles.addFriendFeature}>
        <Button
          type="icon-detail"
          text="Barcode"
          icon={<ICSearch fill="#000" />}
        />
        <Button
          type="icon-detail"
          text="Search"
          onPress={() => navigation.navigate("Search")}
          icon={<ICSearch fill="#000" />}
        />
      </View>
    </View>
  </View>
);

export default index;

const styles = StyleSheet.create({
  addFriendFeature: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
  },
});
