import React from 'react';
import logo from '../../images/header-logo.svg';
import { NavLink } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <NavLink onClick={props.singOut} to="/" className="header__link"><img src={logo} alt="Логотип" className="header__logo" /></NavLink>
      <div className="header__container1">
        {props.children}
      </div>
    </header>
  );
}
export default Header;