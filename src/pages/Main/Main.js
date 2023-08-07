import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { getMain } from "../../store/actions/main_actions";

import { Container } from "reactstrap";

import styles from "./main.module.css";

const Main = (props) => {
  // 리덕스
  // const dispatch = useDispatch();
  // const notice = useSelector((state) => state.Main.notice);
  // const post = useSelector((state) => state.Main.post);
  // const plan = useSelector((state) => state.Main.plan);

  // const [calendarData, setCalendarDate] = useState([]);
  // const [noticeData, setNoticeDate] = useState([]);

  // 페이지 이동
  const navigate = useNavigate();
  const { page } = props;

  // 데이터 불러오기
  useEffect(() => {
    // dispatch(getMain());
  }, []);

  return (
    <div>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <h1>메인</h1>
      </Container>
    </div>
  );
};

export default Main;
