import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { moviesSearch } from '../../utils/FindMovies';

function SavedMovies(props) {

  const [foundMovieName, setFoundMovieName] = React.useState('');
  const [shortMovies, setShortMovies] = React.useState(false);
  const [visibleMovies, setVisibleMovies] = React.useState([]);
  const [isSubmit, setIsSubmit] = React.useState(false);

  React.useEffect(() => {
    setVisibleMovies(props.savedMovies)
  }, [props.savedMovies])

  function handleChangeMovieName(e) {
    setFoundMovieName(e.target.value)
    setIsSubmit(false)
  }

  function handleChange(e) {
    setShortMovies(e.target.checked)
    setIsSubmit(false)
  }

  function handleSubmit() {
    setVisibleMovies(moviesSearch(props.savedMovies, foundMovieName, shortMovies))
    setIsSubmit(true)
  }

  return (
    <section className="saved-movies">
      <SearchForm
        submitMoviesSearch={handleSubmit}
      >
        <div className="search-form__container">
          <input onChange={handleChangeMovieName} value={foundMovieName} className="search-form__input" id="search-movies" type="text" placeholder="Фильм" name="movie" required ></input>
          <button className="search-form__button">Найти</button>
        </div>
        <div className="search-form__container">
          <label className="search-form__switch">
            <input onClick={handleChange} defaultChecked={shortMovies} className="search-form__switch-input" type="checkbox"/>
            <span className="search-form__slider"></span>
          </label>
          <p className="search-form__switch-text">Короткометражки</p>
        </div>
      </SearchForm>
      {props.problemConection ? <p className="movies__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p> : ''}
      {visibleMovies.length === 0 && foundMovieName && isSubmit ? <p className="movies__text">Ничего не найдено.</p> : ''}
      {!foundMovieName && isSubmit ? <p className="movies__text">Нужно ввести ключевое слово.</p> : ''}
      {props.isReceiving ? 
        <Preloader/> :
        <MoviesCardList>
        {visibleMovies.map((movie) => (
          <MoviesCard
            key={movie._id}
            movieImage={movie.image}
            movieName={movie.nameRU}
            movieDuration={movie.duration}
            movieTrailerLink={movie.trailer}
            thisMovie={movie}
            onMovieDelete={props.movieDelete}
            savedMovies={props.savedMovies}
          />
        ))}
        </MoviesCardList>
      }
    </section>
  );
}
export default SavedMovies;