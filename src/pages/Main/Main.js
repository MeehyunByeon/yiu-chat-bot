import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { List, Avatar, Space, Row, Col, message } from "antd";
import { RobotOutlined } from "@ant-design/icons";

import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TextInput from "../../components/TextInput/TextInput";
import ClientMsg from "./ClientMsg";
import ChatBotMsg from "./ChatBotMsg";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  req_client_question,
  req_code,
} from "../../store/actions/main_actions";

import { Container } from "reactstrap";

import styles from "./main.module.css";
import { colors } from "../../assets/colors";
import { welcome_msg } from "../../assets/data/welcome_msg";

const Main = (props) => {
  // 리덕스
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.Main.answer);

  const [chatList, setChatList] = useState([]);
  const [chatMsg, setChatMsg] = useState("");
  const [tf, setTF] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();

  // 스크롤
  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  // 에러메세지 함수
  const errorMsg = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  // 페이지 이동
  const navigate = useNavigate();
  const { page } = props;

  // Welcome Message
  useEffect(() => {
    setChatList([...chatList, welcome_msg]);
  }, []);

  // answer 새롭게 받을 때마다
  useEffect(() => {
    if (answer) setChatList([...chatList, answer]);
  }, [answer, tf]);

  // 텍스트인풋 업데이트
  const onChange = (e) => {
    setChatMsg(e.target.value);
  };

  const addClientChat = () => {
    const chat = {
      who: "client",
      text: chatMsg,
    };
    setChatList([...chatList, chat]);
    dispatch(req_client_question(chatMsg));
    setTF(!tf);
    setChatMsg("");
  };

  const request_code = (code) => {
    dispatch(req_code(code));
    setTF(!tf);
  };

  return (
    <div>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        {chatList &&
          chatList.map((item, index) => {
            if (item.who === "bot") {
              return (
                <div
                  style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* <Avatar
                    icon={<RobotOutlined />}
                    size={"large"}
                    style={{ marginRight: 20 }}
                  /> */}
                  <FontAwesomeIcon
                    icon={faRobot}
                    size={"2x"}
                    color={colors.yiu_main}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 50,
                      marginRight: 20,
                    }}
                  />
                  <ChatBotMsg
                    data={item}
                    sendCode={(code) => request_code(code)}
                  />
                </div>
              );
            } else
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                >
                  <ClientMsg data={item} />
                </div>
              );
          })}
      </Container>
      <div ref={messageEndRef}></div>
      <div
        className={styles.footer}
        style={{ backgroundColor: colors.footer_bg }}
      >
        <Row
          justify={"center"}
          style={{
            width: "100%",
            alignContent: "center",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TextInput
            id="msg"
            name="msg"
            value={chatMsg}
            btnDisabled={chatMsg.length > 0 ? false : true}
            btnColor={
              chatMsg.length > 0 ? colors.send_btn : colors.send_btn_disabled
            }
            onChange={(e) => {
              onChange(e);
            }}
            onClick={() => {
              addClientChat();
            }}
            onPressEnter={() => {
              if (chatMsg.length > 0) addClientChat();
            }}
          />
        </Row>
      </div>
    </div>
  );
};

export default Main;
