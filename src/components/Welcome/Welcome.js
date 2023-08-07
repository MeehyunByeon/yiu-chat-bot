import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { colors } from "../../assets/colors";

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h2 style={{ color: "white", textAlign: "center" }}>용인대학교</h2>
    </div>
  );
};
export default Welcome;
