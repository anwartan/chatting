import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {
  Avatar, Button, Gap, Header, Input,
} from "../../components";
import { useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState({
    displayName: user?.displayName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    photoURL: user?.photoURL,
  });
  const onChange = (val, field) => {
    setInput({ ...input, [field]: val });
  };
  const submit = () => {
    auth().currentUser.updateProfile({
      displayName: input.displayName,
      photoURL: input.photoURL,
    });
    firestore().collection("user").doc(user?.uid).update(input)
      .then((res) => {
        alert("Successfull");
      })
      .catch((err) => {
        alert("Failed");
      });
  };
  return (
    <View style={styles.container}>
      <Header
        type="with-backButton"
        title="Edit Profile"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>

        <View style={styles.wrapper}>
          <View style={styles.wrapperAvatar}>

            <Avatar src={input.photoURL} />
          </View>
          <Gap height={50} />

          <Input
            placeHolder="Display Name"
            value={input.displayName}
            onChange={(val) => onChange(val, "displayName")}
          />
          <Gap height={20} />
          <Input
            editable={false}
            placeHolder="Email"
            value={input.email}
            onChange={(val) => onChange(val, "email")}
          />
          <Gap height={20} />

          {/* <Input
            keyboardType="number-pad"
            placeHolder="Phone Number"
            value={input.phoneNumber}
            onChange={(val) => onChange(val, "phoneNumber")}
          /> */}

          <Gap height={20} />
          <Button text="SIMPAN" onPress={submit} />
        </View>

      </ScrollView>
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
  wrapperAvatar: {
    alignSelf: "center",
  },
});
