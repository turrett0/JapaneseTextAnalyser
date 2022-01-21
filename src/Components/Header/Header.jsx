import React from 'react';
import {GiZigzagHieroglyph as HeaderIcon} from 'react-icons/gi';
import './Header.scss';

function Header() {
  return <header className="header">
  <div className="header__inner">
    <div className="header-right">
      <div className="burger-menu__button">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="header-right__name">
        <p>Japanese Text Analyser</p>
      </div>
    </div>
    <div className="header-left">
      <button className="header-account__btn">Log In</button>
    </div>
  </div>
</header>
}

export default Header;
