import { WELCOME, GET_ANSWER_Q, GET_ANSWER_C } from "../types";
import axios from "axios";

import { test_data } from "../../assets/data/test_data";

// // 커뮤니티 가져오기
// export function getCommunity() {
//   const request = axios({
//     method: "GET",
//     url: process.env.REACT_APP_GET_COMMUNITY,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: {},
//   })
//     .then((response) => {
//       console.log("커뮤니티 성공: ", response);
//       return response.data;
//     })
//     .catch((err) => {
//       console.log("커뮤니티 에러", err);
//       return err.response.status;
//     });

//   return {
//     type: GET_COMMUNITY,
//     payload: request,
//   };
// }

// // 일정 생성
// export function createPlan(data) {
//   console.log("일정생성 액션: ", data, data.date.value.format("YYYY-MM-DD"));
//   const request = axios({
//     method: "POST",
//     url: process.env.REACT_APP_CREATE_PLAN,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: {
//       date: data.date.value.format("YYYY-MM-DD"),
//       contents: data.contents.value,
//     },
//   })
//     .then((response) => {
//       console.log("일정 생성 성공: ", response);
//       return true;
//     })
//     .catch((err) => {
//       console.log("일정 생성 에러", err);
//       return err.response.status;
//     });

//   return {
//     type: CREATE_PLAN,
//     payload: request,
//   };
// }
