import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { List, Avatar, Space, Row, Col, message, Switch } from "antd";
import { pdfjs, Document, Page } from "react-pdf";
import pdf from "./yiu_info.pdf";

import styles from "./pdfviewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF_Viewer = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [numPages, setNumPages] = useState(null); // 총 페이지수
  // const [pageNumber, setPageNumber] = useState(parseInt(props.pageNumber)); // 현재 페이지
  const [pageNumber, setPageNumber] = useState("13"); // 현재 페이지
  const [pages, setPages] = useState([]);
  const [pageScale, setPageScale] = useState(1.5); // 페이지 스케일

  function onDocumentLoadSuccess({ numPages }) {
    console.log(`numPages ${numPages}`);
    setNumPages(numPages);
  }

  useEffect(() => {}, []);

  useEffect(() => {
    splitPdfPages();
  }, [pageNumber]);

  const splitPdfPages = () => {
    const result = pageNumber.split(", ");
    console.log("split: ", result);
    setPages(result);
  };

  return (
    <div>
      <div
        style={{
          // overflow: "auto",
          display: "flex",
          justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          {pages.map((page) => (
            <Page pageNumber={parseInt(page)} />
          ))}
          {/* <Page
            // width={1024}
            // height={500}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            scale={pageScale}
            pageNumber={pageNumber}
            className={styles.container}
          /> */}
        </Document>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default PDF_Viewer;
