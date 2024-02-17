import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Row,
  message,
  Switch,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
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
  req_ask,
} from "../../store/actions/main_actions";

import { Container } from "reactstrap";
import Header from "../../components/Header/Header";

import styles from "./main.module.css";
import { colors } from "../../assets/colors";
import { welcome_msg } from "../../assets/data/welcome_msg";
import { no_answer_msg } from "../../assets/data/no_answer_msg";
import { autocomplete_data } from "../../assets/data/autocomplete_data";
import iconImage from "../../assets/images/yiu_안뇽이.jpg";
import { isMobile } from "react-device-detect";
import { developer_msg } from "../../assets/data/developer_msg";
import { chatbot_tip } from "../../assets/data/chatbot_tip";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Main = (props) => {
  // 리덕스
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.Main.answer);
  const ask = useSelector((state) => state.Main.ask);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // drawer on/off
  const [askText, setAskText] = useState(""); // ask 질문
  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [chatMsg, setChatMsg] = useState(""); // Client 채팅 실시간 저장
  const [autoComplete, setAutoComplete] = useState(true); // 자동완성 ON/OFF
  const [suggestions, setSuggestions] = useState([]); //검색어 추천 항목 저장
  // const [tf, setTF] = useState(true); // 같은 답변 useEffect 발동X에 대한 동작 처리
  const [asktf, setAskTF] = useState(true); // 같은 답변 useEffect 발동X에 대한 동작 처리

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null); // 총 페이지수
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [pageScale, setPageScale] = useState(1); // 페이지 스케일

  const [messageApi, contextHolder] = message.useMessage();

  // 스크롤
  const messageEndRef = useRef();

  // 새로운 메세지 => 스크롤 맨 아래로
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  // 성공메세지 함수
  const successMsg = (data) => {
    messageApi.open({
      type: "success",
      content: data,
    });
  };

  // 에러메세지 함수
  const ErrorMsg = (data) => {
    messageApi.open({
      type: "error",
      content: data,
      duration: 2,
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
    if (answer) {
      if (answer.answer == 404) sendNoAnswer();
      else setChatList([...chatList, answer]);
    }
  }, [answer]);

  // ask 새롭게 받을 때마다
  useEffect(() => {
    if (ask === 200) successMsg("질문 제출에 성공했습니다.");
    else if (ask === false) ErrorMsg(`잠시 후에 다시 시도해주세요!`);
  }, [ask, asktf]);

  // answer이 없을 때의 답변
  const sendNoAnswer = () => {
    setChatMsg("");
    setChatList([...chatList, no_answer_msg]);
  };

  const addClientChat = () => {
    const chat = {
      who: "client",
      text: chatMsg,
    };
    setChatList([...chatList, chat]);
    dispatch(req_client_question(chatMsg));
    setChatMsg("");
  };

  // Child Component에서 사용하는 code api 발동 함수
  const request_code = (title, code) => {
    const chat = {
      who: "client",
      text: `${title}에 대해 알려주세요.`,
    };
    setChatList([...chatList, chat]);
    dispatch(req_code({ question: answer["code"], code: code }));
  };

  // Child Component에서 사용하는 code api 발동 함수
  const request_code_welcome = (title, code) => {
    const text = `${title}에 대해 알려주세요.`;
    const chat = {
      who: "client",
      text: text,
    };
    setChatList([...chatList, chat]);
    dispatch(req_code({ question: text, code: code }));
  };

  // Child Component에서 사용하는 code api 발동 함수
  const request_code_autocomplete = (title, code) => {
    const chat = {
      who: "client",
      text: title,
    };
    setChatMsg("");
    setChatList([...chatList, chat]);
    dispatch(req_code({ question: title, code: code }));
  };

  const handleAskInputChange = (event) => {
    const value = event.target.value;
    setAskText(value);
  };

  const sendAsk = () => {
    setAskTF(!asktf);
    dispatch(req_ask(askText));
    setAskText("");
    setIsDrawerOpen(false);
  };

  // 자동완성
  const handleInputChange = (event) => {
    const value = event.target.value;
    //입력값 실시간 반영?
    setChatMsg(value);
    // setSearchTerm(value);

    const filteredSuggestions = autocomplete_data.filter((suggestion) =>
      suggestion.question.toLowerCase().includes(value.toLowerCase())
    ); // 입력된 값을  mockSuggestions에서 찾아 suggestion에 저장
    setSuggestions(filteredSuggestions);
  };

  // 자동완성 문장을 보여주는 함수
  const showSuggestion = () => {
    return suggestions.length > 0 && chatMsg.length > 0 ? (
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          maxHeight: "200px",
          overflowY: "scroll",
        }}
      >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() =>
              request_code_autocomplete(suggestion.question, suggestion.code)
            }
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
            {suggestion.question}
          </div>
        ))}
      </div>
    ) : (
      <></>
    );
  };

  //콘솔에 띄우기
  const handleSuggestionClick = (code) => {
    // console.log("Selected suggestion code:", code);
  };

  function onDocumentLoadSuccess({ numPages }) {
    // console.log(`numPages ${numPages}`);
    setNumPages(numPages);
  }

  const sendDeveloperMsg = () => {
    setChatList([...chatList, developer_msg]);
  };

  const sendChatbotTip = () => {
    setChatList([...chatList, chatbot_tip]);
  };

  return (
    <div>
      {contextHolder}
      <div
        className={styles.header}
        style={{ backgroundColor: colors.chatbot_main, alignItems: "center" }}
      >
        <Header onClick={() => setIsDrawerOpen(true)} />
      </div>
      <Container
        className={styles.container}
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        {chatList &&
          chatList.map((item, index) => {
            if (item.who === "bot") {
              return (
                <div
                  style={{
                    padding: isMobile ? 15 : 20,
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
                  <img
                    src={iconImage}
                    style={{
                      width: isMobile ? "35px" : "50px",
                      height: isMobile ? "35px" : "50px",
                      borderRadius: 50,
                      marginRight: isMobile ? 15 : 20,
                    }}
                  />
                  <ChatBotMsg
                    data={item}
                    sendCode={(title, code) => request_code(title, code)}
                    sendCode_welcome={(title, code) =>
                      request_code_welcome(title, code)
                    }
                    sendDeveloperMsg={() => sendDeveloperMsg()}
                    sendChatbotTip={() => sendChatbotTip()}
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
                    marginBottom: isMobile ? 0 : 20,
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                // justifyContent: "space-between",
                alignItems: "center",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {/* <Button type="text" style={{ fontWeight: "bold" }}>
                원하는 답변을 얻지 못했다면?
              </Button> */}
              <p style={{ marginRight: 10 }}>자동완성</p>
            </div>
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
            onKeyPress={() => {
              if (chatMsg.length > 0) addClientChat();
            }}
          />
        </Row>
      </div>
      <Drawer
        placement={"right"}
        title="질문 제출하기"
        width={720}
        // maskStyle={{ backgroundColor: "red" }}
        mask={false}
        // maskClosable={true}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        bodyStyle={{
          paddingBottom: 80,
          fontSize: 13,
        }}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>취소</Button>
            <Button
              onClick={() => sendAsk()}
              type="primary"
              disabled={askText.length > 0 ? false : true}
            >
              제출
            </Button>
          </Space>
        }
      >
        <div>
          <p>
            <b>
              챗봇을 통해 원하는 답변을 얻지 못했다면 아래 입력칸에 질문을
              입력해주세요.
              <br />
              입력된 답변은 챗봇의 더 정확한 답변을 위해서만 사용됩니다.
              <br />
              <br />
              ※유의사항※
              <br />
              원활한 챗봇 개발을 위해 욕설, 비방, 저속한 표현 등을 삼가해주세요!
              <br />
              <br />
            </b>
          </p>
          <Input.TextArea
            id="ask"
            name="ask"
            value={askText}
            onChange={handleAskInputChange}
            onPressEnter={() => {
              if (askText.length > 0) sendAsk();
            }}
            rows={5}
            placeholder="질문을 입력하세요."
            autoSize
            maxLength={300}
          />
        </div>
      </Drawer>
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
