
function searvhingMovies(movies, foundMovieName) {
  const result = movies.filter(f => f.nameRU.toLowerCase().match(foundMovieName.toLowerCase()))
  return result
}

export const moviesSearch = (movies, foundMovieName, onlyShortMovies) => {
  if (onlyShortMovies) {
    const shortMovies = movies.filter(f => f.duration < 40)
    return searvhingMovies(shortMovies, foundMovieName)
  }
  if (!onlyShortMovies) {
    return searvhingMovies(movies, foundMovieName)
  }
};

