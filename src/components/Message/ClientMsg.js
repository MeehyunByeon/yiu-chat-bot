import React, { Component } from "react";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

const ClientMsg = (props) => {
  return (
    <div
      style={{
        whiteSpace: "pre-line",
        maxWidth: "30%",
        backgroundColor: colors.yiu_orange_light,
        borderRadius: 10,
        fontWeight: "bold",
        fontSize: 14,
        color: colors.fontColor,
        marginBottom: 10,
      }}
    >
      <p style={{ paddingLeft: 15, paddingRight: 15 }}>{props.data.text}</p>
    </div>
  );
};
export default ClientMsg;
