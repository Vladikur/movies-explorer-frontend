import React, { useCallback } from 'react';
import Form from '../Form/Form';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import validator from 'validator'

function Login(props) {
  
  const [valueEmail, setValueEmail] = React.useState('');
  const [valuePassword, setValuePassword] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);

  function handleChangeEmail(e) {
    if (!validator.isEmail(e.target.value)) {
      setErrorEmail('Введите корректный E-mail')
      setIsValidEmail(false)
    } else {
      setErrorEmail('')
      setValueEmail(e.target.value)
      setIsValidEmail(true)
    }
  };

  function handleChangePassword(e) {
    if (e.target.value.length < 4) {
      setErrorPassword('Пароль должен быть длинной не менее 4 символов')
      setIsValidPassword(false)
    } else {
      setErrorPassword('')
      setValuePassword(e.target.value)
      setIsValidPassword(true)
    }
  }

  function resetForm() {
    setErrorPassword('')
    setErrorEmail('')
    setValueEmail('')
    setValuePassword('')
    setIsValidPassword(false)
    setIsValidEmail(false)
  }

  const inputMailClassName = (
    `form__input ${!isValidEmail ? 'form__input_error_active' : ''}`
  );
  const inputPasswordClassName = (
    `form__input ${!isValidPassword ? 'form__input_error_active' : ''}`
  );
  const submitButtonClassName = (
    `form__submit ${!isValidPassword || !isValidEmail ? 'form__submit_type_disactive' : ''}`
  );

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: valueEmail,
      password: valuePassword,
    }
    props.onLogin(data);
    resetForm();
  }

  return (
    <section className="login">
      <div className="login__header-container">
        <Header />
      </div>
      <Form>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2 className="form__header">Рады видеть!</h2>
        <div className="form__input-container">
          <span className="form__input-name">E-mail</span>
          <input className={inputMailClassName} onChange={handleChangeEmail} type="email" name="email" required />
          <span className="form__input-error">{errorEmail}</span>
        </div>
        <div className="form__input-container">
          <span className="form__input-name">Пароль</span>
          <input className={inputPasswordClassName} onChange={handleChangePassword} type="password" name="password" required minLength="4" maxLength="40" />
          <span className="form__input-error">{errorPassword}</span>
        </div>
        <div className="form__error-container form__error-container_margin-top_login">
          <p className="form__error-name">Пользователь с таким email уже существует.</p>
        </div>
        <button disabled={!isValidPassword || !isValidEmail} type="submit" className={submitButtonClassName}>Войти</button>
        <div className="form__link-container">
          <p className="form__link-text">Ещё не зарегистрированы?</p>
          <NavLink to="/sign-up" className="form__link">Регистрация</NavLink>
        </div>
      </form>
      </Form>
    </section>
  );
}
export default Login;