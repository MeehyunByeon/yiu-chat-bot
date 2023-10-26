import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, List, Avatar, Space } from "antd";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

import {
  chatbot_tip,
  chatbot_tip_ver_modal,
} from "../../assets/data/chatbot_tip";

const ChatBotTip = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  // const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  // const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  // const isPortrait = useMediaQuery({ orientation: "portrait" });
  // const isRetina = useMediaQuery({ minResolution: "2dppx" });

  return (
    <div style={{ padding: 15 }}>
      <p
        style={{
          textAlign: "center",
          fontSize: 18,
          color: colors.chatbot_main,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        용인대학교 챗봇 이용tip
      </p>
      {chatbot_tip_ver_modal.map((item, index) => {
        return (
          <div
            style={{
              whiteSpace: "pre-line",
              fontWeight: "bold",
              marginBottom: 30,
            }}
          >
            <span
              style={{
                color: colors.chatbot_main,
                fontSize: 15,
              }}
            >
              {item.title}
            </span>
            <p style={{ fontSize: 13 }}>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ChatBotTip;
