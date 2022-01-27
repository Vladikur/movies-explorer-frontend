import React from 'react';

function SearchForm(props) {

  const [movieName, setMovieName] = React.useState('');

  function handleChangeMovieName(e) {
    setMovieName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.nameMovie(movieName);
    props.movie(movieName);
    if (movieName) {
      props.noKeyWord(false)
    } else {
      props.noKeyWord(true)
    }
    if (!props.noCount) {
      props.resetCounts()
    }
  }

  function handleChange(e) {
    props.shortMovies(e.target.checked)
  }

  return (
    <form onSubmit={handleSubmit} className="search-form" noValidate>
      <div className="search-form__container">
        <input onChange={handleChangeMovieName} className="search-form__input" id="search-movies" type="text" placeholder="Фильм" name="movie" required ></input>
        <button className="search-form__button">Найти</button>
      </div>
      <div className="search-form__container">
      <label className="search-form__switch">
        <input onClick={handleChange} className="search-form__switch-input" type="checkbox"/>
        <span className="search-form__slider"></span>
      </label>
      <p className="search-form__switch-text">Короткометражки</p>
      </div>
    </form>
  );
}
export default SearchForm;