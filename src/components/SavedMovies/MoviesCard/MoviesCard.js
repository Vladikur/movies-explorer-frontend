import React from 'react';
import movie from '../../../images/movie.png';

function MoviesCard(props) {

  return (
    <div className="movies-card">
      <div className="movies-card__container">
      <img src={movie} alt="Изображение фильма" className="movies-card__image" />
      </div>
      <div className="movies-card__info-container">
        <p className="movies-card__movie-name">33 слова о дизайне</p>
        <p className="movies-card__movie-duration">1ч 47м</p>
        <button className="movies-card__delete" aria-label="Удаление" type="button"></button>
      </div>
    </div>
  );
}
export default MoviesCard;