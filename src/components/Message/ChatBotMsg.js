import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

import WelcomeMsg from "./WelcomeMsg";
import BotMsg from "./BotMsg";

const ChatBotMsg = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        maxWidth: isMobile ? "100%" : "70%",
      }}
    >
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
