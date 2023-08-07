import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "./chatbotmsg.module.css";
import { colors } from "../../assets/colors";

import WelcomeMsg from "./WelcomeMsg";

const ChatBotMsg = (props) => {
  {
    console.log(props.data);
  }
  return (
    <div
      style={{
        backgroundColor: colors.chat_msg_bg,
        padding: 30,
        borderRadius: 20,
      }}
    >
      {props.data.greeting ? <WelcomeMsg /> : <div></div>}
    </div>
  );
};
export default ChatBotMsg;
