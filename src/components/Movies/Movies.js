import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';

function Movies(props) {

  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </MoviesCardList>
    </section>
  );
}
export default Movies;