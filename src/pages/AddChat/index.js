import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ICSearch } from "../../assets";
import {
  Gap, Header, Input, Item,
} from "../../components";
import { colors, useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }] = useStateValue();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const getFriends = () => {
    firestore().collection("friends").doc(user?.uid)
      .collection("allFriends")
      .onSnapshot((snapshot) => {
        const temp = [];
        snapshot.docs.map((item) => {
          temp.push({
            id: item.id,
            ...item.data(),
          });
        });
        setData(temp);
      });
  };
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

  const predicate = (item) => item.displayName.includes(search);
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        type="with-backButton"
        title="New Chat"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <Input
          value={search}
          onChange={(val) => setSearch(val)}
          placeHolder="Search Your Friend"
          icon={<ICSearch fill={colors.input.disable} />}
        />
        <Gap height={10} />
        {
          data.filter(predicate).map((item) => (

            <View key={item.uid}>
              <Item
                src={item.photoURL}
                name={item.displayName}
                deskripsi={item.email}
                onPress={() => addRoom(item)}
              />
              <Gap height={10} />

            </View>
          ))
        }
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
