import React, { Component } from "react";
import { Card, List, Avatar, Space } from "antd";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

import { welcome_msg } from "../../assets/data/welcome_msg";

const WelcomeMsg = (props) => {
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
                src={item.img}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "transparent",
                  color: colors.chatbot_main,
                }}
              />
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  margin: 3,
                }}
              >
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WelcomeMsg;
