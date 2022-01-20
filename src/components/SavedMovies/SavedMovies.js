import React from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import SearchForm from './SearchForm/SearchForm';

function SavedMovies(props) {

  return (
    <section className="saved-movies">
      <SearchForm/>
      <MoviesCardList>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </MoviesCardList>
    </section>
  );
}
export default SavedMovies;