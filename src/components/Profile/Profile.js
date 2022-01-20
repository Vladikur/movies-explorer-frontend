import React from 'react';
import { NavLink } from 'react-router-dom';

function Profile(props) {

  return (
    <section className="profile">
      <h2 className="profile__greeting">Привет, Виталий!</h2>
        <div className="profile__info-container">
          <p className="profile__info-name">Имя</p>
          <p className="profile__info">Виталий</p>
        </div>
        <div className="profile__info-container">
          <p className="profile__info-name">E-mail</p>
          <p className="profile__info">pochta@yandex.ru</p>
        </div>
        <button className="profile__redact" aria-label="Редактирование профиля" type="button">Редактировать</button>
        <NavLink to="/sign-in" className="profile__link">Выйти из аккаунта</NavLink>
    </section>
  );
}
export default Profile;