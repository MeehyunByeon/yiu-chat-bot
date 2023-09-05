import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, List, Avatar, Space } from "antd";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

import { no_answer_msg } from "../../assets/data/no_answer_msg";

const NoAnswerMsg = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  // const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  // const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  // const isPortrait = useMediaQuery({ orientation: "portrait" });
  // const isRetina = useMediaQuery({ minResolution: "2dppx" });

  return (
    <div
      style={{
        backgroundColor: colors.chatbot_main_light,
        padding: 10,
        borderRadius: 20,
        color: colors.fontColor,
      }}
    >
      <p
        style={{
          whiteSpace: "pre-line",
          fontWeight: "bold",
          fontSize: 14,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        {no_answer_msg.msg}
      </p>
    </div>
  );
};
export default NoAnswerMsg;
