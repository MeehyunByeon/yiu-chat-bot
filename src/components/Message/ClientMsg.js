import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

const ClientMsg = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        whiteSpace: "pre-line",
        maxWidth: isMobile ? "70vw" : "30vw",
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
