import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "./chatbotmsg.module.css";
import { colors } from "../../assets/colors";

import WelcomeMsg from "./WelcomeMsg";
import BotMsg from "./BotMsg";

const ChatBotMsg = (props) => {
  return (
    <div style={{ maxWidth: "70%" }}>
      {console.log(props.sendCode)}
      {props.data.greeting ? (
        <WelcomeMsg />
      ) : (
        <BotMsg data={props.data} sendCode={(res) => props.sendCode(res)} />
      )}
    </div>
  );
};
export default ChatBotMsg;
