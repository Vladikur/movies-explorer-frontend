import React from 'react';
import Form from '../Form/Form';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';

function Login(props) {

  const [validationMail, setValidationMail] = React.useState('');
  const [validationPassword, setValidationPassword] = React.useState('');
  const [data, setData] = React.useState({
    password: '', 
    email: '',
  });

  function handleChange(e) {
    const {name, value, validationMessage} = e.target
    setData({
        ...data,
        [name]: value
    })
    if(name === 'email'){
      setValidationMail(validationMessage)
    }
    if(name === 'password'){
      setValidationPassword(validationMessage)
    }
  }

  const inputMailClassName = (
    `form__input ${validationMail ? 'form__input_error_active' : ''}`
  );
  const inputPasswordClassName = (
    `form__input ${validationPassword ? 'form__input_error_active' : ''}`
  );

  return (
    <section className="login">
      <div className="login__header-container">
        <Header />
      </div>
      <Form>
        <h2 className="form__header">Рады видеть!</h2>
        <div className="form__input-container">
          <span className="form__input-name">E-mail</span>
          <input className={inputMailClassName} onChange={handleChange} type="email" name="email" required />
          <span className="form__input-error">{validationMail}</span>
        </div>
        <div className="form__input-container">
          <span className="form__input-name">Пароль</span>
          <input className={inputPasswordClassName} onChange={handleChange} type="password" name="password" required minLength="4" maxLength="40" />
          <span className="form__input-error">{validationPassword}</span>
        </div>
        <button type="submit" className="form__submit form__submit_margin-top_login">Войти</button>
        <div className="form__link-container">
          <p className="form__link-text">Ещё не зарегистрированы?</p>
          <NavLink to="/sign-up" className="form__link">Регистрация</NavLink>
        </div>
      </Form>
    </section>
  );
}
export default Login;