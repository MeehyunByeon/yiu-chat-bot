import React, { useState, useEffect } from "react";
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
import { welcome_msg } from "../../assets/data/welcom_msg";

const Main = (props) => {
  // 리덕스
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.Main.answer);

  const [chatList, setChatList] = useState([]);
  const [chatMsg, setChatMsg] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

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
    setChatList([...chatList, welcome_msg]);
    setChatList([...chatList, welcome_msg]);
  }, []);

  // 텍스트인풋 업데이트
  const onChange = (e) => {
    setChatMsg(e.target.value);
  };

  // 유효성 검사 확인 완료 => API요청
  const request = () => {
    dispatch(req_client_question(chatMsg))
      .then((res) => {
        console.log("res: ", res);
        switch (res.payload) {
          case true:
            navigate("/");
            break;
          case 400:
            errorMsg(`입력한 이메일과 비밀번호를 확인해주세요!`);
            break;
          case 401:
            errorMsg(`이메일과 비밀번호가 일치하지 않습니다!`);
            break;
          case 500:
            errorMsg(`관리자에게 문의해주세요.`);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
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
                      padding: 10,
                      backgroundColor: "white",
                      borderRadius: 50,
                      marginRight: 20,
                    }}
                  />
                  <ChatBotMsg data={item} />
                </div>
              );
            } else return <ClientMsg data={item} />;
          })}
      </Container>
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
            onChange={(e) => {
              onChange(e);
            }}
            onClick={() => {
              dispatch(req_client_question(chatMsg));
              setChatMsg("");
            }}
          />
        </Row>
      </div>
    </div>
  );
};

export default Main;

{
  /* <List
          dataSource={chatList}
          renderItem={(item, index) => (
            <List.Item>
              {console.log("data: ", item)}
              {item.who === "bot" ? (
                <div
                  style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Avatar
                    icon={<RobotOutlined />}
                    size={"large"}
                    style={{ marginRight: 20 }}
                  />
                  <ChatBotMsg data={item} />
                </div>
              ) : (
                <ClientMsg data={item} />
              )}
            </List.Item>
          )}
        ></List> */
}
