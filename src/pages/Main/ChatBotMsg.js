import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "./chatbotmsg.module.css";
import { colors } from "../../assets/colors";

import WelcomeMsg from "./WelcomeMsg";
import BotMsg from "./BotMsg";

const ChatBotMsg = (props) => {
  {
    console.log(props.data);
  }
  return (
    <div>
      {props.data.greeting ? <WelcomeMsg /> : <BotMsg data={props.data} />}
    </div>
  );
};
export default ChatBotMsg;
