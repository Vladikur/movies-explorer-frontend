import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function Movies(props) {

  const [size, setSize] = React.useState(window.innerWidth)

  const [numberOfItems, setNumberOfItems] = React.useState('');
  const [moreItems, setMoreItems] = React.useState('');
  const [visibleMoreButton, setVisibleMoreButton] = React.useState(true);
  const [messageNoKeyWord, setMessageNoKeyWord] = React.useState(false);
  const [movieName, setMovieName] = React.useState('');

  function countMovies(size) {
    if (size < 790) {
      setNumberOfItems(5)
      setMoreItems(1)
      setVisibleMoreButton(true)
    } else if (790 < size < 1300) {
      setNumberOfItems(8)
      setMoreItems(2)
      setVisibleMoreButton(true)
    }
    if (size > 1300) {
      setNumberOfItems(6)
      setMoreItems(3)
      setVisibleMoreButton(true)
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', updateWidth);

    countMovies(size)

    return () => window.removeEventListener("resize", updateWidth);
  }, [size])

  const updateWidth = () => {
    setSize(window.innerWidth)
  }

  const visibleMovies = props.initialMovies.slice(0, numberOfItems)

  function moreMovies() {
    setNumberOfItems(numberOfItems + moreItems)
    if (visibleMovies.length === props.initialMovies.length) {
      setVisibleMoreButton(false)
    }
  }

  function resetCounts() {
    countMovies(size)
  }

  function noKeyWord(isWord) {
    setMessageNoKeyWord(isWord)
  }

  function searchMovieName(name) {
    setMovieName(name)
  }

  return (
    <section className="movies">
      <SearchForm
        nameMovie={props.movieName}
        resetCounts={resetCounts}
        noKeyWord={noKeyWord}
        movie={searchMovieName}
        shortMovies={props.shortMovies}
      />
      {props.problemConection ? <p className="movies__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p> : ''}
      {props.initialMovies.length === 0 && movieName ? <p className="movies__text">Ничего не найдено.</p> : ''}
      {messageNoKeyWord ? <p className="movies__text">Нужно ввести ключевое слово.</p> : ''}
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