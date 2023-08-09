import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "./clientmsg.module.css";
import { colors } from "../../assets/colors";

const ClientMsg = (props) => {
  return (
    <div
      style={{
        backgroundColor: colors.yiu_orange_light,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
      }}
    >
      <p style={{ fontWeight: "bold", fontSize: 15 }}>{props.data.text}</p>
    </div>
  );
};
export default ClientMsg;
