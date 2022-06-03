import React from "react";
import {NavLink} from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header-right">
          <div className="header-right__name">
            <p>Japanese Text Analyser</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
