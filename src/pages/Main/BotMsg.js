import React, { Component } from "react";
import { Card, List, Avatar, Space } from "antd";

import { RobotOutline, BellOutlined } from "@ant-design/icons";

import styles from "./welcomemsg.module.css";

import { colors } from "../../assets/colors";

import { welcome_msg } from "../../assets/data/welcome_msg";

const BotMsg = (props) => {
  const showCards = (data) => {
    return (
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          fontWeight: "bold",
        }}
      >
        {data.map((item, index) => {
          return (
            <div
              style={{
                width: "80%",
                backgroundColor: colors.chat_msg_bg,
                padding: 10,
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <p style={{ padding: 10 }}>{item.text}</p>
              {/* <a>{item.button.text}</a> */}
              {item.btntype === "none" ? null : (
                <div
                  style={{
                    textAlign: "center",
                    backgroundColor: "white",
                    padding: 5,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: colors.yiu_main,
                    borderWidth: 10,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    item.btntype === "url"
                      ? window.open(
                          item.btnlink,
                          "_blank",
                          "noopener, noreferrer"
                        )
                      : props.sendCode(item.btnlink)
                  }
                >
                  <p style={{ fontWeight: "bold", fontSize: 14 }}>
                    {item.btntitle}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {props.data.top ? showCards(props.data.top) : null}

      {props.data.mid ? showCards(props.data.mid) : null}

      {props.data.bot ? showCards(props.data.bot) : null}
    </div>
  );
};
export default BotMsg;
