import React from 'react';

function MoviesCardList(props) {

  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.children}
      </div>
      { props.visibleMoreButton ?
      <button onClick={props.seeMore} className="movies-card-list__button" aria-label="Ещё фильмы" type="button">Ещё</button> :
      <div className="movies-card-list__emty-container"></div>
      }
    </div>
  );
}
export default MoviesCardList;