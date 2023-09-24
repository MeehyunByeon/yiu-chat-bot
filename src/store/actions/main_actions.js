import {
  WELCOME,
  SAVE_CHAT,
  GET_ANSWER_Q,
  GET_ANSWER_C,
  CREATE_ASK,
} from "../types";
import axios from "axios";

import { welcome_msg } from "../../assets/data/welcome_msg";
import { test_data } from "../../assets/data/test_data";

// 시작 메시지
export function get_welcome_msg(data) {
  return {
    type: WELCOME,
    payload: welcome_msg,
  };
}

// 사용자 질문에 대한 답변 가져오기
export function req_client_question(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GET_ANSWER_Q,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      question: data.toUpperCase(),
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return { answer: err.response.status, id: new Date() };
    });

  return {
    type: GET_ANSWER_Q,
    payload: request,
  };
}

// 코드에 대한 답변 가져오기
export function req_code(data) {
  console.log("액션에서 받음: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GET_ANSWER_C,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      question: data.question.toUpperCase(),
      code: data.code.toUpperCase(),
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: GET_ANSWER_C,
    payload: request,
  };
}

// 질문하기
export function req_ask(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CREATE_ASK,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      ask: data,
    },
  })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: CREATE_ASK,
    payload: request,
  };
}
