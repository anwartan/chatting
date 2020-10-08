import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ICAdd } from "../../assets";
import {
  Fab,
  Gap, Header, Item,
} from "../../components";
import { useStateValue } from "../../utils";

const index = ({ navigation }) => {
  const [{ user }] = useStateValue();
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const fetchData = firestore().collection("message").doc(user?.uid)
      .collection("allMessage")
      .onSnapshot(async (snapshot) => {
        const data = [];
        const promise = await snapshot.docs.map(async (item) => {
          const temp = {
            id: item.id,
            ...item.data(),
          };
          await firestore().doc(`user/${temp.uidPartner}`).get()
            .then((res) => {
              temp.partner = res.data();
            });

          data.push(temp);
        });
        await Promise.all(promise);
        setRoom(data);
      });
    return fetchData;
  }, []);
  return (
    <View style={styles.container}>
      <Header title="Chatting" />

      <ScrollView>
        <View style={styles.wrapper}>
          {
        room.map((item) => (
          <View key={item.id}>
            <Item
              name={item.partner.displayName}
              deskripsi={item.lastMessage}
              src={item.partner.photoURL}
              date={item.lastChatDate && new Date(item.lastChatDate).toDateString()}
              onPress={() => navigation.navigate("Room", { room: item })}
            />
            <Gap height={10} />
          </View>
        ))
      }

        </View>
      </ScrollView>
      <View style={styles.fab}>
        <Fab
          color="#000"
          onPress={() => navigation.navigate("AddChat")}
          diameter={60}
          icon={<ICAdd fill="#fff" />}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  fab: {
    position: "absolute",
    right: 10,
    bottom: 30,
  },
});
