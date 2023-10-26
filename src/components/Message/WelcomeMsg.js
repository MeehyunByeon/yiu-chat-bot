import React, { Component, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, List, Avatar, Space, Modal } from "antd";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

import { welcome_msg } from "../../assets/data/welcome_msg";
import ChatBotTip from "./ChatBotTip";

const WelcomeMsg = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  // const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  // const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  // const isPortrait = useMediaQuery({ orientation: "portrait" });
  // const isRetina = useMediaQuery({ minResolution: "2dppx" });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        {welcome_msg.greeting}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "0.5fr ",
          gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
        }}
      >
        {welcome_msg.list.map((item, index) => {
          return (
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: colors.white,
                padding: 8,
                margin: 10,
                borderRadius: 10,
                cursor: "pointer",
              }}
              onClick={() => props.sendCode_welcome(item.title, item.code)}
            >
              <img
                src={item.img.toString()}
                style={{
                  width: isMobile ? 40 : 60,
                  height: isMobile ? 40 : 60,
                  backgroundColor: "transparent",
                  color: colors.chatbot_main,
                }}
              />
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: isMobile ? 12 : 14,
                  margin: 3,
                }}
              >
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateRows: "0.5fr ",
          gridTemplateColumns: "0.5fr 0.5fr",
          fontSize: 13,
          fontWeight: "bold",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <p
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 10,
            textAlign: "center",
            marginRight: 10,
            cursor: "pointer",
          }}
          onClick={() => props.sendDeveloperMsg()}
        >
          용인대학교 챗봇
        </p>
        <p
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 10,
            textAlign: "center",
            cursor: "pointer",
          }}
          // onClick={() => props.sendChatbotTip()}
          onClick={() => setIsModalOpen(true)}
        >
          챗봇 안뇽이 이용TIP
        </p>
      </div>
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={isMobile ? "100vw" : isTablet ? "60vw" : "35vw"}
        footer={null}
      >
        <ChatBotTip />
      </Modal>
    </div>
  );
};
export default WelcomeMsg;
