import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { MenuOutlined } from "@ant-design/icons";

import styles from "./header.module.css";
import { colors } from "../../assets/colors";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={styles.container}
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ marginLeft: 20 }}></div>
      <h3 style={{ color: colors.white, textAlign: "center" }}>
        용인대학교 챗봇
      </h3>
      <MenuOutlined
        style={{ marginRight: 20, color: colors.white }}
        className={styles.menuBtn}
        onClick={props.onClick}
      />
    </div>
  );
};
export default Header;
