/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StatusBar,
  LogBox,
} from "react-native";
import { AuthReducer } from "./redux/reducer";
import { initialState } from "./redux/reducer/AuthReducer";
import Router from "./router";
import { StateProvider } from "./utils";

LogBox.ignoreLogs(["Setting a timer"]);

const App = () => (
  <>
    <StateProvider initialState={initialState} reducer={AuthReducer}>

      <StatusBar barStyle="dark-content" backgroundColor="#F3F3F3" />
      <NavigationContainer>
        <Router />
      </NavigationContainer>

    </StateProvider>
  </>
);

export default App;
