import React from 'react';
import Form from '../Form/Form';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import validator from 'validator'

function Register(props) {

  const [valueEmail, setValueEmail] = React.useState('');
  const [valuePassword, setValuePassword] = React.useState('');
  const [valueName, setValueName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [errorName, setErrorName] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isValidName, setIsValidName] = React.useState(false);

  const [err, setErr] = React.useState(false);
  const [errText, setErrText] = React.useState('');

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

  function handleChangeName(e) {
    if (e.target.value.match(/[^a-zа-яё -]/iu)) {
      setErrorName('Имя должно содержать только латиницу, кириллицу, пробел или дефис')
      setIsValidName(false)
    } else if (e.target.value.length < 2) {
      setErrorName('Имя не должно быть короче 2 символов')
      setIsValidName(false)
    } else {
      setErrorName('')
      setValueName(e.target.value)
      setIsValidName(true)
    }
  }

  function resetForm() {
    setErrorPassword('')
    setErrorEmail('')
    setErrorName('')
    setValueEmail('')
    setValuePassword('')
    setValueName('')
    setIsValidPassword(false)
    setIsValidEmail(false)
    setIsValidName(false)
  }

  const inputNameClassName = (
    `form__input ${!isValidName ? 'form__input_error_active' : ''}`
  );
  const inputMailClassName = (
    `form__input ${!isValidEmail ? 'form__input_error_active' : ''}`
  );
  const inputPasswordClassName = (
    `form__input ${!isValidPassword ? 'form__input_error_active' : ''}`
  );
  const submitButtonClassName = (
    `form__submit ${!isValidPassword || !isValidEmail || !isValidName ? 'form__submit_type_disactive' : ''}`
  );

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: valueName,
      email: valueEmail,
      password: valuePassword,
    }
    props.onRegister(data);
    resetForm();
  }

  React.useEffect(() => {
    if(props.error === 'Ошибка: Conflict') {
      setErr(true)
      setErrText('Пользователь с таким email уже существует.')
    }
    if(props.error !== 'Ошибка: Conflict' && props.error !== '') {
      setErr(true)
      setErrText('При регистрации произошла ошибка. Попробуйте ещё раз.')
    }

  }, [props.error]);

  return (
    <section className="register">
      <div className="register__header-container">
        <Header />
      </div>
      <Form>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2 className="form__header">Добро пожаловать!</h2>
        <div className="form__input-container">
          <span className="form__input-name">Имя</span>
          <input className={inputNameClassName} onChange={handleChangeName} type="text" name="name" required minLength="1" maxLength="40" />
          <span className="form__input-error">{errorName}</span>
        </div>
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
        <div className="form__error-container form__error-container_margin-top_register">
          {err ? <p className="form__error-name">{errText}</p> : ''}
        </div>
        <button disabled={!isValidPassword || !isValidEmail || !isValidName } type="submit" className={submitButtonClassName}>Зарегистрироваться</button>
        <div className="form__link-container">
          <p className="form__link-text">Уже зарегистрированы?</p>
          <NavLink to="/sign-in" className="form__link">Войти</NavLink>
        </div>
        </form>
      </Form>
    </section>
  );
}
export default Register;