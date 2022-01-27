import React, { useEffect } from 'react';
import { Route, Switch, NavLink, useHistory, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MobileMenuPopup from '../MobileMenuPopup/MobileMenuPopup';
import PageNotFound from '../PageNotFound/PageNotFound';
import Navigation from '../Navigation/Navigation';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import apiMovies from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


function App() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isReceiving, setIsReceiving] = React.useState(false);
  const [movieName, setMovieName] = React.useState('');
  const [conectionProblem, setConectionProblem] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setСurrentUser] = React.useState({
    _id: '', 
    email: '',
    name: '',
  });
  const [error, setError] = React.useState('');

  function handleMobileMenuClick() {
    setIsMobileMenuOpen(true);
  }

  function closeMenuPopup() {
    setIsMobileMenuOpen(false);
  }

  React.useEffect(() => {
    MainApi
    .getSavedMovie()
    .then (data => {
      setSavedMovies(data)
    })
    .catch(err => console.log(err))
  }, [loggedIn]);

  React.useEffect(() => {
    setIsReceiving(true)
    apiMovies
    .getMovies()
    .then (data => {
      setConectionProblem(false)
      setAllMovies(data)
      const result = data.filter(f => f.nameRU.toLowerCase().match(movieName.toLowerCase()))
      if (movieName) {
        setMovies(result)
      } else {
        setMovies([ ])
      }
    })
    .catch((err) => {
      setConectionProblem(true)
      setMovies([ ])
      console.log(err)
    })
    .finally(() => {
      setIsReceiving(false)
    });
  }, [movieName]);

  function handleSearch(movie) {
    setMovieName(movie)
  }

  function shortMovies(checked) {
    if (checked) {
      const result = movies.filter(f => f.duration < 40)
      setMovies(result)
    } else {
      const result = allMovies.filter(f => f.nameRU.toLowerCase().match(movieName.toLowerCase()))
      setMovies(result)
    }
  }

  function shortMyMovies(checked) {
    if (checked) {
      const result = savedMovies.filter(f => f.duration < 40)
      setSavedMovies(result)
    } else {
      MainApi
      .getSavedMovie()
      .then (data => {
      setSavedMovies(data)
      })
      .catch(err => console.log(err))
    }
  }

  const history = useHistory();

  function handleRegister ({ password, email, name }) {
    MainApi.register({ password, email, name })
    .then((res) => {
      if (res) {
        history.push('/sign-in')
      }
      setError('')
    })
    .catch((err) => {
      console.log(err)
      setError(err)
    })
  }

  function handleLogin({ password, email }) {
    MainApi.authorize({ password, email })
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        tokenCheck()
        setMovies([ ])
        history.push('/movies')
        setError('')
      }
    })
    .catch((err) => {
      console.log(err)
      setError(err)
    })
  }

  useEffect(() => {
    if (loggedIn === true) {
      history.push('/movies')
    }
  }, [loggedIn, history])


  useEffect(() => {
    tokenCheck()
  }, [])

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt')
    if (localStorage.getItem('jwt')) {
      MainApi.getContent(jwt)
      .then((res) => {
        if (res) {
          setСurrentUser({
            _id: res._id, 
            email: res.email,
            name: res.name,
          })
          setLoggedIn(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  function handleSingOut () {
    setСurrentUser({email: '', name: '', _id: ''})
    localStorage.removeItem('jwt');
    setLoggedIn(false)
  }

  function handleCardLike(movie) {
    const movieLiked = {
      country: `${movie.country}`,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailer: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }
    MainApi
    .likedMovie(movieLiked)
    .then((data) => {
      setSavedMovies([...savedMovies, data ])
    })
    .catch(err => console.log(err))
  }

  function handleMovieDelete(movie) {
    const id = movie._id
    MainApi
    .deleteMovie(id)
    .then((data) => {
      setSavedMovies((state) => state.filter((c) => c._id !== data._id));
    })
    .catch(err => console.log(err))
  }

  function handleCardDislike(movie) {
    const result = savedMovies.find(f => f.movieId === movie.id)
    MainApi
    .deleteMovie(result._id)
    .then((data) => {
      setSavedMovies((state) => state.filter((c) => c._id !== result._id));
    })
    .catch(err => console.log(err))
  }

  function handleUpdateUser(user) {
    MainApi
    .updateUser(user)
    .then((data) => {
      setСurrentUser(data)
      setError('')
    })
    .catch((err) => {
      console.log(err)
      setError(err)
    })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>

        <Route exact path='/'>
          <Header
            singOut={handleSingOut}
          >
            <NavLink to="/sign-up" className="navigation__link">Регистрация</NavLink>
            <NavLink to="/sign-in" className="navigation__link navigation__link_type_signin">Войти</NavLink>
          </Header>
          <Main/>
          <Footer/>
        </Route>



        <Route path='/movies'>
          <Header
            singOut={handleSingOut}
          >
            <Navigation
              onMobileMenu={handleMobileMenuClick}
            />
          </Header>
          <ProtectedRoute
            loggedIn={loggedIn}
            shortMovies={shortMovies}
            problemConection={conectionProblem}
            movieName={handleSearch}
            isReceiving={isReceiving}
            initialMovies={movies}
            onCardLike={handleCardLike}
            savedMovies={savedMovies}
            onCardDislike={handleCardDislike}
            component={Movies}
          />
          <Footer/>
        </Route>

        <Route path='/saved-films'>
          <Header
            singOut={handleSingOut}
          >
            <Navigation
              onMobileMenu={handleMobileMenuClick}
            />
          </Header>
          <ProtectedRoute
            loggedIn={loggedIn}
            problemConection={conectionProblem}
            movieName={handleSearch}
            isReceiving={isReceiving}
            savedMovies={savedMovies}
            movieDelete={handleMovieDelete}
            shortMovies={shortMyMovies}
            component={SavedMovies}
          />
          <Footer/>
        </Route>

        <Route path='/profile'>
          <Header
            singOut={handleSingOut}
          >
            <Navigation
              onMobileMenu={handleMobileMenuClick}
            />
          </Header>
          <ProtectedRoute
            loggedIn={loggedIn}
            singOut={handleSingOut}
            onUpdateUser={handleUpdateUser}
            error={error}
            component={Profile}
          />
        </Route>

        <Route path='/sign-in'>
          <Login 
            onLogin={handleLogin}
            error={error}
          />
        </Route>

        <Route path='/sign-up'>
          <Register
            onRegister={handleRegister}
            error={error}
          />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>
      </CurrentUserContext.Provider>

      <MobileMenuPopup 
        isOpen={isMobileMenuOpen}
        closePopup={closeMenuPopup}
      />
    </div>
  );
}

export default App;
