import { WELCOME, GET_ANSWER_Q, GET_ANSWER_C } from "../types";
import axios from "axios";

import { welcome_msg } from "../../assets/data/welcom_msg";
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
    method: "GET",
    url: process.env.REACT_APP_GET_ANSWER_Q,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      question: data,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: GET_ANSWER_Q,
    payload: test_data,
  };
}

// 코드에 대한 답변 가져오기
export function req_code(data) {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_ANSWER_C,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      code: data,
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
    payload: test_data,
  };
}
