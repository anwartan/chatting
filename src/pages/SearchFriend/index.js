import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ICAddBox, ICSearch } from "../../assets";
import {
  Gap, Header, Input, Item,
} from "../../components";
import { colors, useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }, dispatch] = useStateValue();
  const [friend, setFriend] = useState("");
  const [data, setData] = useState([]);
  const searchFriend = () => {
    if (user?.email !== friend) {
      firestore().collection("user").where("email", "==", friend).get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              setData([{
                ...doc.data(),
              }]);
            });
            console.log(data);
          } else {
            alert("User Not Found");
          }
        });
    } else {
      alert("User is wrong");
    }
  };
  const addFriend = (newfriend) => {
    firestore().collection("friends").doc(user?.uid)
      .collection("allFriends")
      .doc(newfriend.uid)
      .set({
        ...newfriend,
      })
      .then(() => {
        alert("Successfull");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
      <Header
        type="with-backButton"
        title="Search Friend"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <Input
          placeHolder="Search Your Friend"
          value={friend}
          onChange={(val) => setFriend(val)}
          icon={<ICSearch fill={colors.input.disable} />}
          onIconPress={searchFriend}
        />
        <Gap height={10} />
        <View>
          {data.map((item) => (

            <Item
              key={item.uid}
              name={item.displayName}
              deskripsi={item.email}
              src={item.photoURL}
              disable
              onIconPress={() => addFriend(item)}
              icon={<ICAddBox fill="#000" />}
            />
          ))}
          <Gap height={10} />

        </View>
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
});
