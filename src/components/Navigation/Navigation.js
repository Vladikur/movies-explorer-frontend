import React from 'react';
import icon from '../../images/icon.svg';
import { NavLink } from 'react-router-dom';

function Navigation(props) {

  return (
    <div className="navigation__container">
      <div className="navigation__container_links">
        <NavLink to="/movies" activeClassName="navigation__link_active" className="navigation__link navigation__link_margin-rigt_16px">Фильмы</NavLink>
        <NavLink to="/saved-films" activeClassName="navigation__link_active" className="navigation__link">Сохраненные фильмы</NavLink>
      </div>
      <div className="navigation__container-icon">
        <NavLink to="/profile" activeClassName="navigation__link_active" className="navigation__link navigation__link_type_profile">
          <img src={icon} alt="Иконка профиля" className="navigation__icon" /><span>Аккаунт</span>
        </NavLink>
      </div>
      <button onClick={props.onMobileMenu} className="navigation__button-menu" aria-label="Открыть меню" type="button"></button>
    </div>
  );
}
export default Navigation;