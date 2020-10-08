import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import firestore from "@react-native-firebase/firestore";
import { ICSend } from "../../assets";
import {
  Button,
  ChatItem, Gap, Header, Input,
} from "../../components";
import { useStateValue } from "../../utils";

const index = ({ navigation, route }) => {
  const { room } = route.params;
  const [{ user }] = useStateValue();
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const scroll = useRef();
  const send = () => {
    if (message === "") {
      return true;
    }
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const data = {
      chatContent: message,
      chatDate: new Date().getTime(),
      sendBy: user?.uid,
    };
    const url = room?.id;
    const chatYearId = `${year}-${month}-${date}`;
    firestore().collection("chatting").doc(url)
      .collection("allChat")
      .doc(chatYearId)
      .collection("message")
      .add(data)
      .then((res) => {
        firestore().collection("message").doc(user?.uid)
          .collection("allMessage")
          .doc(url)
          .set({
            lastMessage: message,
            uidPartner: room.partner.uid,
            lastChatDate: data.chatDate,
          });
        firestore().collection("message").doc(room.partner.uid)
          .collection("allMessage")
          .doc(url)
          .set({
            lastMessage: message,
            uidPartner: user?.uid,
            lastChatDate: data.chatDate,

          });
        setMessage("");
      });
  };

  useEffect(() => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const chatYearId = `${year}-${month}-${date}`;

    const fetch = firestore().collection("chatting").doc(room?.id)
      .collection("allChat")
      .doc(chatYearId)
      .collection("message")
      .orderBy("chatDate", "asc")
      .onSnapshot((snapshot) => {
        const data = [];

        snapshot.forEach((item) => {
          data.push({
            id: item.id,
            data: item.data(),
          });
        });
        setAllMessage(data);
        scroll.current.scrollToEnd({ animated: true });
      });
    return fetch;
  }, []);
  return (
    <View style={styles.container}>
      <Header
        type="with-backButton"
        title={room.partner.displayName}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <ScrollView
          ref={scroll}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scroll.current.scrollTo({ x: contentWidth, y: contentHeight, animated: true });
          }}
        >
          <View>
            {
              allMessage.map((item) => {
                const waktu = new Date(item.data.chatDate);
                return (

                  <ChatItem
                    key={item.id}
                    me={item.data.sendBy === user?.uid}
                    image={room.partner.photoURL}
                    message={item.data.chatContent}
                    date={`${waktu.getHours()}:${waktu.getMinutes()} ${waktu.getHours > 12 ? "PM" : "AM"}`}
                  />
                );
              })
            }
            <Gap height={10} />
          </View>
        </ScrollView>

        <View style={styles.wrapperInput}>
          <View style={styles.input}>

            <Input
              value={message}
              onChange={(val) => setMessage(val)}
              placeHolder="Type your message"
            />
          </View>
          <View style={styles.containerButton}>

            <Button
              onPress={send}
              type="icon-only"
              icon={<ICSend fill="#000" />}
            />
          </View>
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    width: 30,
    height: 30,
  },
});
