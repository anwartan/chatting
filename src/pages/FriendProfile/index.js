import React from "react";
import { StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Profile } from "../../template";
import { useStateValue } from "../../utils";

const index = ({ navigation, route }) => {
  const { profile } = route.params;
  const [{ user }] = useStateValue();
  const addRoom = (item) => {
    firestore().collection("message").doc(user?.uid)
      .collection("allMessage")
      .where("uidPartner", "==", item.uid)
      .onSnapshot((snapshot) => {
        let temp;
        if (snapshot.empty) {
          firestore().collection("message").doc(user?.uid)
            .collection("allMessage")
            .add({
              uidPartner: item.uid,
            })
            .then((res) => {
              temp = {
                id: res.id,
                partner: item,
              };
              navigation.navigate("Room", { room: temp });
            })
            .catch((err) => {
              alert("Try again");
            });
        } else {
          temp = {};
          snapshot.forEach((doc) => {
            temp.id = doc.id;
            temp.partner = item;
          });
          navigation.navigate("Room", { room: temp });
        }
      });
  };
  return (
    <View style={styles.container}>
      <Profile
        type="FriendProfile"
        src={profile?.photoURL}
        headerTitle="Friend Profile"
        name={profile?.displayName}
        onFeaturePress={() => addRoom(profile)}
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
