import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
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


function App() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  function handleMobileMenuClick() {
    setIsMobileMenuOpen(true);
  }

  function closeMenuPopup() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="page">
      <Switch>

        <Route exact path='/'>
          <Header>
            <NavLink to="/sign-up" className="navigation__link">Регистрация</NavLink>
            <NavLink to="/sign-in" className="navigation__link navigation__link_type_signin">Войти</NavLink>
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
          <Movies/>
          <Footer/>
        </Route>

        <Route path='/saved-films'>
          <Header>
            <Navigation
              onMobileMenu={handleMobileMenuClick}
            />
          </Header>
          <SavedMovies/>
          <Footer/>
        </Route>

        <Route path='/profile'>
          <Header>
            <Navigation
              onMobileMenu={handleMobileMenuClick}
            />
          </Header>
          <Profile/>
        </Route>

        <Route path='/sign-in'>
          <Login/>
        </Route>

        <Route path='/sign-up'>
          <Register/>
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>

      <MobileMenuPopup 
        isOpen={isMobileMenuOpen}
        closePopup={closeMenuPopup}
      />
    </div>
  );
}

export default App;
