import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {

  const [messageNoKeyWord, setMessageNoKeyWord] = React.useState(false);
  const [movieName, setMovieName] = React.useState('');
  const [searchSavedMovies, setSearchSavedMovies] = React.useState(props.savedMovies);

  React.useEffect(() => {
    setSearchSavedMovies(props.savedMovies)
  }, [props.savedMovies]);

  function noKeyWord(isWord) {
    setMessageNoKeyWord(isWord)
  }

  function searchMovieName(name) {
    setMovieName(name)
    setSearchSavedMovies(props.savedMovies.filter(f => f.nameRU.toLowerCase().match(name.toLowerCase())))
  }

  return (
    <section className="saved-movies">
      <SearchForm
        nameMovie={props.movieName}
        noKeyWord={noKeyWord}
        movie={searchMovieName}
        noCount={true}
        shortMovies={props.shortMovies}
      />
      {props.problemConection ? <p className="movies__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p> : ''}
      {searchSavedMovies.length === 0 && movieName ? <p className="movies__text">Ничего не найдено.</p> : ''}
      {messageNoKeyWord ? <p className="movies__text">Нужно ввести ключевое слово.</p> : ''}
      {props.isReceiving ? 
        <Preloader/> :
        <MoviesCardList>
        {searchSavedMovies.map((movie) => (
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