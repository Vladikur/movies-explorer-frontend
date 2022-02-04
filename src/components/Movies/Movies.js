import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { moviesSearch } from '../../utils/FindMovies';
import { useLocalStorage } from '../../utils/UseLocalStorage';

function Movies(props) {

  const [size, setSize] = React.useState(window.innerWidth)
  const [foundMovieName, setFoundMovieName] = useLocalStorage("foundMovieName", "");
  const [shortMovies, setShortMovies] = useLocalStorage("shortMovies", "");
  const [movies] = useLocalStorage("movies", "");
  const [foundMovies, setFoundMovies] = React.useState(moviesSearch(movies, foundMovieName, shortMovies));
  const [visibleMovies, setVisibleMovies] = React.useState([]);
  const [moreItems, setMoreItems] = React.useState('');
  const [numberOfItems, setNumberOfItems] = React.useState('');
  const [visibleMoreButton, setVisibleMoreButton] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false);

  function handleChangeMovieName(e) {
    setFoundMovieName(e.target.value)
    setIsSubmit(false)
  }

  function handleChange(e) {
    setShortMovies(e.target.checked)
    setIsSubmit(false)
  }

  function handleSubmit() {
    setFoundMovies(moviesSearch(movies, foundMovieName, shortMovies))
    setIsSubmit(true)
  }

  function countMovies(size) {
    if (size < 790) {
      handleVisibleMovies(5)
      setMoreItems(1)
    } else if (790 < size < 1300) {
      handleVisibleMovies(8)
      setMoreItems(2)
    }
    if (size > 1300) {
      handleVisibleMovies(6)
      setMoreItems(3)
    }
  }
  
  React.useEffect(() => {
    window.addEventListener('resize', updateWidth);

    countMovies(size)

    return () => window.removeEventListener("resize", updateWidth);
  }, [size, foundMovies])

  const updateWidth = () => {
    setSize(window.innerWidth)
  }

  function handleVisibleMovies(count) {
    const result = foundMovies.slice(0, count)
    setNumberOfItems(count)
    setVisibleMovies(result)
  }

  function moreMovies() {
    const result = foundMovies.slice(0, (numberOfItems + moreItems))
    setVisibleMovies(result)
    setNumberOfItems(numberOfItems + moreItems)
  }

  React.useEffect(() => {
    if (foundMovies.length === visibleMovies.length) {
      setVisibleMoreButton(false)
    }
    if (foundMovies.length > visibleMovies.length) {
      setVisibleMoreButton(true)
    }
  }, [foundMovies, visibleMovies])

  React.useEffect(() => {
    if (foundMovieName.length === 0 && isSubmit) {
      setFoundMovies([])
    }
  }, [foundMovieName, isSubmit])

  React.useEffect(() => {
    if (foundMovieName.length === 0) {
      setFoundMovies([])
    }
  }, [])

  return (
    <section className="movies">
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
        <MoviesCardList
          seeMore={moreMovies}
          visibleMoreButton={visibleMoreButton}
        >
        {visibleMovies.map((movie) => (
          <MoviesCard
            allMovies={true}
            key={movie.id}
            movieImage={`https://api.nomoreparties.co/${movie.image.url}`}
            movieName={movie.nameRU}
            movieDuration={movie.duration}
            movieTrailerLink={movie.trailerLink}
            thisMovie={movie}
            onCardLike={props.onCardLike}
            onCardDisike={props.onCardDislike}
            savedMovies={props.savedMovies}
          />
        ))}
        </MoviesCardList>
      }
    </section>
  );
}
export default Movies;