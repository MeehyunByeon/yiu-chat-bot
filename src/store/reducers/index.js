import { combineReducers } from "redux";

import Main from "./main_reducer";
import SaveChat from "./save_chat_reducer";

const rootReducer = combineReducers({
  Main,
  SaveChat,
});

export default rootReducer;
