import { SAVE_CHAT } from "../types";

export function save_chat(data) {
  return {
    type: SAVE_CHAT,
    payload: data,
  };
}
