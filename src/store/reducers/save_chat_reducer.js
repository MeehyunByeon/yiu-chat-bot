import { SAVE_CHAT } from "../types";
import { welcome_msg } from "../../assets/data/welcome_msg";

export default function (state = { list: [welcome_msg] }, action) {
  switch (action.type) {
    case SAVE_CHAT:
      return {
        ...state,
        chatList: state.list.concat(action.payload),
      };
    default:
      return state;
  }
}
