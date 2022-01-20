import React from 'react';

function MoviesCardList(props) {

  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.children}
      </div>
    </div>
  );
}
export default MoviesCardList;