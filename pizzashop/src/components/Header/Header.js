import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <FontAwesomeIcon icon={faPizzaSlice} className="pizza-icon" />
      <span className="app-name">Pizza Delivery App</span>
    </header>
  );
};

export default Header;
