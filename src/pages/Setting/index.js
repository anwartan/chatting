import React from "react";
import { StyleSheet, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { ICPerson } from "../../assets";
import {
  Button, Gap, Header, SettingItem, Text,
} from "../../components";
import { colors, useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{}, dispatch] = useStateValue();
  const signOut = () => {
    auth().signOut().then((res) => {
      dispatch({ type: "REMOVE_USER" });
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Setting" />
      <View style={styles.wrapper}>
        <View>

          <Text variant="600" styles={styles.sectionSettingTitle}>My Info</Text>
          <Gap height={10} />
          <View>

            <SettingItem
              title="Edit Profile"
              icon={<ICPerson fill="#000" width="30" height="30" />}
              onPress={() => navigation.navigate("EditProfile")}
            />

          </View>
          <Gap height={10} />
        </View>
        <Button text="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  sectionSettingTitle: {
    color: colors.text.disable,
  },
});
