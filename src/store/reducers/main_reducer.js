import { WELCOME, GET_ANSWER_Q, GET_ANSWER_C, CREATE_ASK } from "../types";

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
        answer: action.payload || false,
        // who: action.payload.who || false,
        // top: action.payload.top || false,
        // mid: action.payload.mid || false,
        // bot: action.payload.bot || false,
      };
    case GET_ANSWER_C:
      return {
        ...state,
        answer: action.payload || false,
        // who: action.payload.who || false,
        // top: action.payload.top || false,
        // mid: action.payload.mid || false,
        // bot: action.payload.bot || false,
      };
    case CREATE_ASK:
      return {
        ...state,
        ask: action.payload || false,
      };
    default:
      return state;
  }
}
