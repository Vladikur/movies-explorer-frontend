import React, { useEffect } from 'react';
import { Route, Switch, NavLink, useHistory } from 'react-router-dom';
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
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isReceiving, setIsReceiving] = React.useState(false);
  const [conectionProblem, setConectionProblem] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setСurrentUser] = React.useState({
    _id: '', 
    email: '',
    name: '',
  });
  const [error, setError] = React.useState('');
  const history = useHistory();

  function handleMobileMenuClick() {
    setIsMobileMenuOpen(true);
  }

  function closeMenuPopup() {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    MainApi
    .getSavedMovie()
    .then (data => {
      setSavedMovies(data)
    })
    .catch(err => console.log(err))
  }, [loggedIn]);

  useEffect(() => {
    setIsReceiving(true)
    apiMovies
    .getMovies()
    .then (data => {
      localStorage.setItem("movies", JSON.stringify(data));
      setConectionProblem(false)
    })
    .catch((err) => {
      setConectionProblem(true)
      localStorage.setItem("movies", JSON.stringify([]));
      console.log(err)
    })
    .finally(() => {
      setIsReceiving(false)
    });
  }, [loggedIn]);

  function handleRegister ({ password, email, name }) {
    MainApi.register({ password, email, name })
    .then((res) => {
      if (res) {
        handleLogin({ password, email })
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
        setError('')
      }
    })
    .catch((err) => {
      console.log(err)
      setError(err)
    })
  }
  
  useEffect(() => {
    if (loggedIn === true && history.location.pathname === "/sign-up") {
      history.push('/movies')
    }
    if (loggedIn === true && history.location.pathname === "/sign-in") {
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
        setLoggedIn(false)
      })
    } else {
      setLoggedIn(false)
    }
  }

  function goToBack () {
    history.goBack()
  }

  function handleSingOut () {
    setСurrentUser({email: '', name: '', _id: ''})
    localStorage.removeItem('jwt');
    localStorage.setItem("movies", JSON.stringify([]));
    localStorage.setItem("foundMovieName", JSON.stringify(''));
    localStorage.setItem("shortMovies", JSON.stringify(false));
    setLoggedIn(false)
  }

  function handleCardLike(movie) {
    console.log(movie)
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
      localStorage.setItem("savedMovies", JSON.stringify([...savedMovies, data ]));
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
    .then(() => {
      setSavedMovies((state) => state.filter((c) => c._id !== result._id));
    })
    .catch(err => console.log(err))
  }

  function handleUpdateUser(user) {
    MainApi
    .updateUser(user)
    .then((data) => {
      setСurrentUser(data)
      setError('Данные успешно изменены.')
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
          <Header>
            { loggedIn ? 
              <Navigation
                onMobileMenu={handleMobileMenuClick}
              /> :
              <div className="navigation__container2">
                <NavLink to="/sign-up" className="navigation__link">Регистрация</NavLink>
                <NavLink to="/sign-in" className="navigation__link navigation__link_type_signin">Войти</NavLink>
              </div>
            }
          </Header>
          <Main/>
          <Footer/>
        </Route>

        <Route path='/movies'>
          <Header>
            <Navigation
              onMobileMenu={handleMobileMenuClick}
            />
          </Header>
          <ProtectedRoute
            loggedIn={loggedIn}
            problemConection={conectionProblem}
            isReceiving={isReceiving}
            onCardLike={handleCardLike}
            savedMovies={savedMovies}
            onCardDislike={handleCardDislike}
            component={Movies}
          />
          <Footer/>
        </Route>

        <Route path='/saved-films'>
          <Header>
            <Navigation
              onMobileMenu={handleMobileMenuClick}
            />
          </Header>
          <ProtectedRoute
            loggedIn={loggedIn}
            problemConection={conectionProblem}
            isReceiving={isReceiving}
            savedMovies={savedMovies}
            movieDelete={handleMovieDelete}
            component={SavedMovies}
          />
          <Footer/>
        </Route>

        <Route path='/profile'>
          <Header>
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
          <PageNotFound 
          back={goToBack}
          />
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
