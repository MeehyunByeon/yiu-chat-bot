import React, { Component } from "react";
import { Card, List, Avatar, Space } from "antd";

import { RobotOutline, BellOutlined } from "@ant-design/icons";

import styles from "./welcomemsg.module.css";

import { colors } from "../../assets/colors";

import { welcome_msg } from "../../assets/data/welcome_msg";

const WelcomeMsg = (props) => {
  return (
    <div
      style={{
        backgroundColor: colors.chat_msg_bg,
        padding: 10,
        borderRadius: 20,
      }}
    >
      <p
        style={{
          whiteSpace: "pre-line",
          fontWeight: "bold",
          fontSize: 15,
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
                backgroundColor: "white",
                padding: 10,
                margin: 10,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              <Avatar
                icon={<BellOutlined />}
                size={"large"}
                style={{
                  backgroundColor: "transparent",
                  color: colors.yiu_main,
                }}
              />
              <p style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</p>
            </div>
          );
        })}
      </div>
      {/* <List
        grid={{
          gutter: 15,
          column: 3,
        }}
        dataSource={welcome_msg.list}
        renderItem={(item) => (
          <List.Item>
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              <Avatar
                icon={<BellOutlined />}
                size={"large"}
                style={{
                  backgroundColor: "transparent",
                  color: colors.yiu_main,
                }}
              />
              <p style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</p>
            </div>
          </List.Item>
        )}
      /> */}
    </div>
  );
};
export default WelcomeMsg;
