import React from 'react';

function MoviesCardList(props) {

  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.children}
      </div>
      <button className="movies-card-list__button" aria-label="Ещё фильмы" type="button">Ещё</button>
    </div>
  );
}
export default MoviesCardList;