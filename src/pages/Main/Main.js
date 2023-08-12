import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { List, Avatar, Space, Row, Col, message, Switch } from "antd";
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
import { autocomplete_data } from "../../assets/data/autocomplete_data";

const Main = (props) => {
  // 리덕스
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.Main.answer);

  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [chatMsg, setChatMsg] = useState(""); // Client 채팅 실시간 저장
  const [autoComplete, setAutoComplete] = useState(true); // 자동완성 ON/OFF
  const [suggestions, setSuggestions] = useState([]); //검색어 추천 항목 저장
  const [tf, setTF] = useState(true); // 같은 답변 useEffect 발동X에 대한 동작 처리

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

  // 자동검색
  const handleInputChange = (event) => {
    const value = event.target.value;
    //입력값 실시간 반영?
    setChatMsg(value);
    // setSearchTerm(value);

    const filteredSuggestions = autocomplete_data.filter((suggestion) =>
      suggestion.test.toLowerCase().includes(value.toLowerCase())
    ); // 입력된 값을  mockSuggestions에서 찾아 suggestion에 저장
    setSuggestions(filteredSuggestions);
  };

  const showSuggestion = () => {
    return suggestions.length > 0 && chatMsg.length > 0 ? (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(suggestion.code)}
            style={{
              fontSize: 14,
              fontWeight: "bold",
              padding: 10,
              paddingLeft: 15,
              paddingRight: 15,
              // marginBottom: 10,
              cursor: "pointer",
            }}
            className={styles.suggestionListItem}
          >
            {suggestion.test}
          </div>
        ))}
      </div>
    ) : (
      <></>
    );
  };

  //콘솔에 띄우기
  const handleSuggestionClick = (code) => {
    console.log("Selected suggestion code:", code);
  };

  // 자동완성 ON/OFF
  const onChangeAutoCompleteBtn = () => {
    setAutoComplete(!autoComplete);
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
        style={{ backgroundColor: "white", flexDirection: "column" }}
      >
        {/* 자동검색 */}
        <div
          style={{
            backgroundColor: colors.autocomplete_bg,
          }}
        >
          <div
            style={{
              backgroundColor: colors.autocomplete_top_bg,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              alignItems: "center",
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: "bold", marginRight: 10 }}>
              자동완성
            </p>
            <Switch
              defaultChecked
              onChange={onChangeAutoCompleteBtn}
              checkedChildren={"ON"}
              unCheckedChildren={"OFF"}
              style={{
                // margin: 10,
                backgroundColor:
                  autoComplete === true ? colors.yiu_main : colors.switch_off,
              }}
            />
          </div>

          {autoComplete ? showSuggestion() : null}
        </div>
        <Row
          justify={"center"}
          style={{
            backgroundColor: colors.footer_bg,
            width: "100%",
            alignContent: "center",
            padding: 10,
            // marginLeft: 10,
            // marginRight: 10,
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
            onChange={handleInputChange}
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
