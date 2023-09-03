import React, { Component, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Card, List, Avatar, Space, Modal } from "antd";
import PDF_Viewer from "../PDF_Viewer/PdfViewer";
import ScrollContainer from "react-indiana-drag-scroll";

import styles from "./message.module.css";
import { colors } from "../../assets/colors";

const BotMsg = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null); // 총 페이지수
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [pageScale, setPageScale] = useState(1); // 페이지 스케일

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showPdf = (link) => {
    setPageNumber(link);
    setIsModalOpen(true);
  };

  const showButton = (type, title, link) => {
    return (
      <div
        style={{
          borderRadius: 10,
          // marginBottom: 10,
          marginBottom: -5,
        }}
        className={styles.cardButton}
        onClick={() =>
          type === 1
            ? window.open(link, "_blank", "noopener, noreferrer")
            : type === 2
            ? props.sendCode(title, link)
            : showPdf(link)
        }
      >
        <p style={{ padding: 5 }}>{title}</p>
      </div>
    );
  };

  const showCards = (data) => {
    return (
      <ScrollContainer
        style={{
          // width: "100vw",
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          // paddingRight: 30,
          // marginRight: 10,
          wordBreak: "break-all",
          marginRight: 50,
        }}
        className
        draggingClassName={styles.dragging}
        activationDistance={5}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {data.map((item, index) => {
            return (
              <div
                style={{
                  width: isMobile ? "30vh" : "27vh",
                  marginRight: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  backgroundColor: colors.chatbot_main_light,
                  borderRadius: 10,
                }}
              >
                <p>{item.text}</p>
                {item.btnType1 === 0 || item.btnType1 === "None"
                  ? null
                  : showButton(item.btnType1, item.btnTitle1, item.btnLink1)}
                {item.btnType2 === 0 || item.btnType2 === "None"
                  ? null
                  : showButton(item.btnType2, item.btnTitle2, item.btnLink2)}
                {item.btnType3 === 0 || item.btnType3 === "None"
                  ? null
                  : showButton(item.btnType3, item.btnTitle3, item.btnLink3)}
              </div>
            );
          })}
        </div>
      </ScrollContainer>
    );
  };

  return (
    <div
      style={{
        fontSize: 14,
        color: colors.fontColor,
        whiteSpace: "pre-line",
        fontWeight: "bold",
      }}
    >
      {props.data.top ? showCards(props.data.top) : null}
      {props.data.mid ? showCards(props.data.mid) : null}
      {props.data.bot ? showCards(props.data.bot) : null}

      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50vw"}
        footer={null}
      >
        <PDF_Viewer pageNumber={pageNumber} />
      </Modal>
    </div>
  );
};
export default BotMsg;
