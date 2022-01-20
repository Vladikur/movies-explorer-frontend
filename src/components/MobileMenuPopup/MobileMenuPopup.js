import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../../images/icon.svg';


function MobileMenuPopup(props) {

  

  return (
    <section className={`menu-popup ${props.isOpen ? 'menu-popup_is-opened' : ''}`}>
      <div className="menu-popup__container">
        <button onClick={props.closePopup} aria-label="Закрыть меню" type="button" className="menu-popup__close"></button>
        <div className="menu-popup__link-container">
          <NavLink onClick={props.closePopup} to="/" className="menu-popup__link">Главная</NavLink>
          <NavLink onClick={props.closePopup} to="/movies" activeClassName="menu-popup__link_active" className="menu-popup__link">Фильмы</NavLink>
          <NavLink onClick={props.closePopup} to="/saved-films" activeClassName="menu-popup__link_active" className="menu-popup__link">Сохраненные фильмы</NavLink>
        </div>
        <div className="menu-popup__container-icon">
          <NavLink onClick={props.closePopup} to="/profile" activeClassName="menu-popup__link_active" className="menu-popup__link-profile">
            <img src={icon} alt="Иконка профиля" className="menu-popup__icon" /><span>Аккаунт</span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
export default MobileMenuPopup;