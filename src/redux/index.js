import { combineReducers } from "redux";

import { AuthReducer } from "./reducer";

const rootReducer = combineReducers({
  AuthReducer,
});

export default rootReducer;
