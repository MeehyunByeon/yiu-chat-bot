import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { colors } from "../../assets/colors";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h3 style={{ color: "white", textAlign: "center" }}>
        용인대학교 챗봇 용용이
      </h3>
    </div>
  );
};
export default Header;
