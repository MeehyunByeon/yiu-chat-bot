import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  List,
  Avatar,
  Space,
  Row,
  Col,
  message,
  Switch,
  Modal,
  Button,
} from "antd";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TextInput from "../../components/TextInput/TextInput";
import ClientMsg from "../../components/Message/ClientMsg";
import ChatBotMsg from "../../components/Message/ChatBotMsg";
import PDF_Viewer from "../../components/PDF_Viewer/PdfViewer";

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

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Main = (props) => {
  // 리덕스
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.Main.answer);

  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [chatMsg, setChatMsg] = useState(""); // Client 채팅 실시간 저장
  const [autoComplete, setAutoComplete] = useState(true); // 자동완성 ON/OFF
  const [suggestions, setSuggestions] = useState([]); //검색어 추천 항목 저장
  const [tf, setTF] = useState(true); // 같은 답변 useEffect 발동X에 대한 동작 처리

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null); // 총 페이지수
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [pageScale, setPageScale] = useState(1); // 페이지 스케일

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [messageApi, contextHolder] = message.useMessage();

  // 스크롤
  const messageEndRef = useRef();

  // 새로운 메세지 => 스크롤 맨 아래로
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

  // Child Component에서 사용하는 code api 발동 함수
  const request_code = (title, code) => {
    const chat = {
      who: "client",
      text: `${title}에 대해 알려주세요.`,
    };
    setChatList([...chatList, chat]);
    dispatch(req_code(code));
    setTF(!tf);
  };

  // 자동완성
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

  // 자동완성 문장을 보여주는 함수
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

  function onDocumentLoadSuccess({ numPages }) {
    console.log(`numPages ${numPages}`);
    setNumPages(numPages);
  }

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
                    color={colors.chatbot_main}
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 50,
                      marginRight: 20,
                    }}
                  />
                  <ChatBotMsg
                    data={item}
                    sendCode={(title, code) => request_code(title, code)}
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
        style={{ backgroundColor: colors.white, flexDirection: "column" }}
      >
        {/* 자동검색 */}
        <div
          style={{
            backgroundColor: colors.autocomplete_bg,
          }}
        >
          <div
            style={{
              backgroundColor: colors.chatbot_main_mid2,
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
              onChange={() => setAutoComplete(!autoComplete)}
              checkedChildren={"ON"}
              unCheckedChildren={"OFF"}
              style={{
                // margin: 10,
                backgroundColor:
                  autoComplete === true
                    ? colors.chatbot_main
                    : colors.switch_off,
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
              chatMsg.length > 0
                ? colors.chatbot_main
                : colors.send_btn_disabled
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
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50%"}
        footer={null}
      >
        <PDF_Viewer />
      </Modal> */}
    </div>
  );
};

export default Main;
