import React from "react";
import { Button, Input, Space, ConfigProvider } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./textinput.module.css";
import { colors } from "../../assets/colors";

const TextInput = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.chatbot_main,
          fontFamily: "Nanum Gothic",
        },
      }}
    >
      <Input
        placeholder="질문을 입력하세요."
        size={"large"}
        name={props.name}
        id={props.id}
        defaultValue={props.defaultValue}
        value={props.value}
        type={props.type}
        maxLength={props.maxLength}
        disabled={props.disabled}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        onPressEnter={props.onPressEnter}
        autoComplete="off"
        suffix={
          <FontAwesomeIcon
            icon={faPaperPlane}
            size={"xl"}
            style={{ cursor: "pointer", marginRight: 5 }}
            color={props.btnColor}
            onClick={props.btnDisabled == true ? null : props.onClick}
          />
        }
      />
    </ConfigProvider>
  );
};

export default TextInput;
