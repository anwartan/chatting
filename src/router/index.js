import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { ICChat, ICHome, ICSetting } from "../assets";
import {
  AddChat,
  AddFriend,
  Chat, EditProfile, FriendProfile, Home, Login,
  MyProfile, Room, SearchFriend, Setting, Splash,
} from "../pages";
import { useStateValue } from "../utils";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => (
  <Tab.Navigator backBehavior="none">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => (
          <ICHome fill={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarIcon: ({ color }) => (
          <ICChat fill={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={Setting}
      options={{
        tabBarIcon: ({ color }) => (
          <ICSetting fill={color} />
        ),
      }}
    />

  </Tab.Navigator>
);

const Router = () => {
  const [{ user, loading }, dispatch] = useStateValue();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((currentUser) => {
      setTimeout(() => {
        dispatch({ type: "SET_USER", user: currentUser });
      }, 1000);
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  if (loading) {
    return <Splash />;
  }
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      {
        user === null ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="Room" component={Room} />
            <Stack.Screen name="Search" component={SearchFriend} />
            <Stack.Screen name="AddChat" component={AddChat} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="FriendProfile" component={FriendProfile} />
            <Stack.Screen name="AddFriend" component={AddFriend} />
            <Stack.Screen name="MyProfile" component={MyProfile} />

          </>
        )
      }

    </Stack.Navigator>
  );
};

export default Router;
