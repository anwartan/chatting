import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ICAddPerson, ICExpandLess, ICExpandMore } from "../../assets";
import {
  Button, Gap, Header, Item, Text,
} from "../../components";
import { Typography, useStateValue } from "../../utils";

const Home = ({ navigation }) => {
  const [show, setShow] = useState(true);
  const [{ user }] = useStateValue();
  const [data, setData] = useState([]);
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
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>

        <Header
          title="Home"
          iconRight={<ICAddPerson fill="#000" />}
          onIconRightPress={() => navigation.navigate("AddFriend")}
        />
        <View style={styles.wrapper}>
          <Item
            src={user?.photoURL}
            name={user?.displayName}
            deskripsi={user?.email}
            onPress={() => navigation.navigate("MyProfile", { profile: user })}
          />
          <Gap height={10} />
          <View>
            <View style={styles.sectionHeader}>
              <Text
                variant="600"
                styles={styles.sectionTitle}
              >
                Friends (
                {" "}
                {data.length}
                {" "}
                )

              </Text>
              <Button
                type="icon-only"
                icon={show
                  ? <ICExpandLess fill="black" />
                  : <ICExpandMore fill="black" />}
                onPress={() => setShow(!show)}
              />
            </View>
            <Gap height={10} />
            <View>
              {
              show && data.map((item) => (
                <View key={item.uid}>

                  <Item
                    src={item.photoURL}
                    name={item.displayName}
                    deskripsi={item.email}
                    onPress={() => navigation.navigate("FriendProfile",
                      { profile: item })}
                  />
                  <Gap height={10} />
                </View>

              ))
}
              {/* <Item name="hello" deskripsi="hello" />
            <Item name="hello" deskripsi="hello" /> */}

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  wrapper: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: Typography.h7,
  },
});
