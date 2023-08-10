import React, { Component } from "react";
import { Card, List, Avatar, Space } from "antd";

import { RobotOutline, BellOutlined } from "@ant-design/icons";

import styles from "./welcomemsg.module.css";

import { colors } from "../../assets/colors";

import { welcome_msg } from "../../assets/data/welcome_msg";

const BotMsg = (props) => {
  const showCards = (data) => {
    return (
      <>
        {data.map((item, index) => {
          return (
            <div>
              <p>{item.text}</p>
              {/* <a>{item.button.text}</a> */}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      {console.log("data: ", props.data.top)}
      {props.data.top ? showCards(props.data.top) : null}

      {props.data.mid ? showCards(props.data.mid) : null}

      {props.data.bot ? showCards(props.data.bot) : null}
    </div>
  );
};
export default BotMsg;
