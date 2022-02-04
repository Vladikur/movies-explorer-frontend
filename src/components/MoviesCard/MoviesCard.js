import React from 'react';
// import movie from {`${props.movieImage}`};

function MoviesCard(props) {

  const [isMovieTime, setMovieTime] = React.useState('');
    
  React.useEffect(() => {
    const hours = Math.trunc(props.movieDuration/60);
    const minutes = props.movieDuration - Math.trunc(props.movieDuration / 60) * 60;
    setMovieTime(`${hours}ч ${minutes}м`)
  }, [props.movieDuration])

  const isLiked = props.savedMovies.some(i => i.movieId === props.thisMovie.id);
  const cardLikeButtonClassName = (
    `movies-card__like ${isLiked ? 'movies-card__like_active' : ''}`
  );

  function handleLikeClick() {
    if (!isLiked) {
      props.onCardLike(props.thisMovie);
    } else {
      props.onCardDisike(props.thisMovie)
    }
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.thisMovie);
  }

  return (
    <div className="movies-card">
      <div className="movies-card__container">
      <a href={props.movieTrailerLink} className="movies-card__link" target="_blank" rel='noreferrer'><img src={props.movieImage} alt={props.movieName} className="movies-card__image" /></a>
      </div>
      <div className="movies-card__info-container">
        <p className="movies-card__movie-name">{props.movieName}</p>
        <p className="movies-card__movie-duration">{isMovieTime}</p>
        {
          props.allMovies ?
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="Лайк" type="button"></button> :
          <button onClick={handleDeleteClick} className='movies-card__delete' aria-label="Удаление" type="button"></button>
        }
      </div>
    </div>
  );
}
export default MoviesCard;