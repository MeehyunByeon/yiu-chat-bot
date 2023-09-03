import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { List, Avatar, Space, Row, Col, message, Switch } from "antd";
import { pdfjs, Document, Page } from "react-pdf";
import ScrollContainer from "react-indiana-drag-scroll";
import pdf from "./yiu_info_2.pdf";

import styles from "./pdfviewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF_Viewer = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [numPages, setNumPages] = useState(0); // 총 페이지수
  // const [pageNumber, setPageNumber] = useState(parseInt(props.pageNumber)); // 현재 페이지
  const [pageNumber, setPageNumber] = useState(props.pageNumber); // 현재 페이지
  const [pages, setPages] = useState([]);
  const [pageScale, setPageScale] = useState(0.8); // 페이지 스케일

  // function onDocumentLoadSuccess({ numPages }) {
  //   console.log(`numPages ${numPages}`);
  //   setNumPages(numPages);
  // }

  // useEffect(() => {}, []);

  useEffect(() => {
    splitPdfPages();
  }, [pageNumber]);

  const splitPdfPages = () => {
    const result = pageNumber.split(", ");
    console.log("split: ", result);
    setPages(result);
    setNumPages(result.length);
  };

  return (
    <div>
      <button
        onClick={() => {
          setPageScale(pageScale === 3 ? 3 : pageScale + 0.1);
        }}
        className={styles.zoomBtn}
      >
        + 확대
      </button>
      <button
        onClick={() => {
          setPageScale(pageScale - 0.1 < 0.5 ? 0.5 : pageScale - 0.1);
        }}
        className={styles.zoomBtn}
      >
        - 축소
      </button>
      <ScrollContainer
        style={{
          // width: "100vw",
          display: "flex",
          flexDirection: "row",
          // paddingRight: 30,
          // marginRight: 10,
        }}
        draggingClassName={styles.dragging}
        activationDistance={5}
      >
        {pages.map((page) => (
          <div
            style={
              {
                // display: "flex",
                // justifyContent: "center",
              }
            }
          >
            <Document
              file={pdf}
              // onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                pageNumber={parseInt(page)}
                className={styles.page}
                wrap={false}
                // width={1024}
                // height={500}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                scale={pageScale}
                // loading={"PDF 로딩중"}
              />
            </Document>
          </div>
        ))}
      </ScrollContainer>
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        total {numPages} page
      </p>
      {/* <Page
            // width={1024}
            // height={500}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            scale={pageScale}
            pageNumber={pageNumber}
            className={styles.container}
          /> */}
      {/* <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>

        <p>페이지 이동 버튼</p>
        <button
          onClick={() => {
            setPageNumber(
              numPages === pageNumber ? pageNumber : pageNumber + 1
            );
          }}
        >
          {" "}
          +
        </button>
        <button
          onClick={() => {
            setPageNumber(pageNumber === 1 ? pageNumber : pageNumber - 1);
          }}
        >
          {" "}
          -
        </button>

        <p>페이지 스케일</p>
        <button
          onClick={() => {
            setPageScale(pageScale === 3 ? 3 : pageScale + 0.1);
          }}
        >
          {" "}
          +
        </button>
        <button
          onClick={() => {
            setPageScale(pageScale - 1 < 1 ? 1 : pageScale - 1);
          }}
        >
          {" "}
          -
        </button>
      </div> */}
    </div>
  );
};

export default PDF_Viewer;
