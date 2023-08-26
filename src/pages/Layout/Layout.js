import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./layout.module.css";
import { colors } from "../../assets/colors";

const LAYOUT = (props) => {
  const { className, children } = props;

  return (
    <div>
      <div className={styles.main}>{children}</div>

      {/* <div
        className={styles.footer}
        style={{ backgroundColor: colors.footer_bg }}
      >
        <Footer />
      </div> */}
    </div>
  );
};

export default LAYOUT;
