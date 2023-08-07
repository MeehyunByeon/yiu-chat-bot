import { WELCOME, GET_ANSWER_Q, GET_ANSWER_C } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case WELCOME:
      return {
        ...state,
        msg: action.payload || "안녕하세요",
      };
    case GET_ANSWER_Q:
      return {
        ...state,
        q: action.payload || false,
      };
    case GET_ANSWER_C:
      return {
        ...state,
        c: action.payload || false,
      };
    default:
      return state;
  }
}
