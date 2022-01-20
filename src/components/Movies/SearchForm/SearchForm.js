import React from 'react';

function SearchForm(props) {

  return (
    <form className="search-form">
      <div className="search-form__container">
        <input className="search-form__input" id="search-movies" type="text" placeholder="Фильм" name="movie" ></input>
        <button className="search-form__button">Найти</button>
      </div>
      <div className="search-form__container">
      <label className="search-form__switch">
        <input className="search-form__switch-input" type="checkbox" />
        <span className="search-form__slider"></span>
      </label>
      <p className="search-form__switch-text">Короткометражки</p>
      </div>
    </form>
  );
}
export default SearchForm;