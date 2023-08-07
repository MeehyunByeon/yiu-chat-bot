import React, { Component } from "react";
import { Card, List, Avatar, Space } from "antd";

import { RobotOutline, BellOutlined } from "@ant-design/icons";

import styles from "./welcomemsg.module.css";

import { colors } from "../../assets/colors";

import { welcome_msg } from "../../assets/data/welcom_msg";

const WelcomeMsg = (props) => {
  return (
    <div>
      <p style={{ whiteSpace: "pre-line", fontWeight: "bold", fontSize: 15 }}>
        {welcome_msg.greeting}
      </p>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr ",
          gridTemplateColumns: "1fr 1fr 1fr",
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
