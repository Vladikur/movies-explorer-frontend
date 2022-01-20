import React from 'react';
import Form from '../Form/Form';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';

function Register(props) {

  const [validationName, setValidationName] = React.useState('');
  const [validationMail, setValidationMail] = React.useState('');
  const [validationPassword, setValidationPassword] = React.useState('');
  const [data, setData] = React.useState({
    name: '', 
    password: '', 
    email: '',
  });

  function handleChange(e) {
    const {name, value, validationMessage} = e.target
    setData({
        ...data,
        [name]: value
    })
    if(name === 'name'){
      setValidationName(validationMessage)
    }
    if(name === 'email'){
      setValidationMail(validationMessage)
    }
    if(name === 'password'){
      setValidationPassword(validationMessage)
    }
  }



  const inputNameClassName = (
    `form__input ${validationName ? 'form__input_error_active' : ''}`
  );
  const inputMailClassName = (
    `form__input ${validationMail ? 'form__input_error_active' : ''}`
  );
  const inputPasswordClassName = (
    `form__input ${validationPassword ? 'form__input_error_active' : ''}`
  );

  return (
    <section className="register">
      <div className="register__header-container">
        <Header />
      </div>
      <Form>
        <h2 className="form__header">Добро пожаловать!</h2>
        <div className="form__input-container">
          <span className="form__input-name">Имя</span>
          <input className={inputNameClassName} onChange={handleChange} type="text" name="name" required minLength="1" maxLength="40" />
          <span className="form__input-error">{validationName}</span>
        </div>
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
        <button type="submit" className="form__submit form__submit_margin-top_register">Зарегистрироваться</button>
        <div className="form__link-container">
          <p className="form__link-text">Уже зарегистрированы?</p>
          <NavLink to="/sign-in" className="form__link">Войти</NavLink>
        </div>
      </Form>
    </section>
  );
}
export default Register;