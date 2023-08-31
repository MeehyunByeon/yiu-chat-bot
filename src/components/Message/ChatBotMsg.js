import React, { Component } from "react";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

import WelcomeMsg from "./WelcomeMsg";
import BotMsg from "./BotMsg";

const ChatBotMsg = (props) => {
  return (
    <div style={{ maxWidth: "70%" }}>
      {props.data.greeting ? (
        <WelcomeMsg
          sendCode_welcome={(title, link) =>
            props.sendCode_welcome(title, link)
          }
        />
      ) : (
        <BotMsg
          data={props.data}
          sendCode={(title, link) => props.sendCode(title, link)}
        />
      )}
    </div>
  );
};
export default ChatBotMsg;
