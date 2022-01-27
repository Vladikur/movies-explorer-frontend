import React from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import validator from 'validator'

function Profile(props) {

  const userData = React.useContext(CurrentUserContext);

  const [profileName, setProfileName] = React.useState('');
  const [profileEmail, setProfileEmail] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidName, setIsValidName] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorName, setErrorName] = React.useState('');
  const [isRedact, setIsRedact] = React.useState(false);

  const [errConflict, setErrConflict] = React.useState(false);
  const [errConnect, setErrConnect] = React.useState(false);
  const [errText, setErrText] = React.useState('');

  React.useEffect(() => {
    if(props.error === 'Ошибка: Conflict') {
      setErrConflict(true)
      setErrText('Пользователь с таким email уже существует.')
      setIsRedact(true)
    }
    if(props.error !== 'Ошибка: Conflict' && props.error !== '') {
      setErrConnect(true)
      setErrText('При обновлении профиля произошла ошибка.')
      setIsRedact(true)
    }

  }, [props.error]);

  const inputNameClassName = (
    `profile__input ${!isValidName ? 'profile__input_error_active' : ''}`
  );
  const inputMailClassName = (
    `profile__input ${!isValidEmail ? 'profile__input_error_active' : ''}`
  );
  const buttonClassName = (
    `profile__submit ${errConflict || errConnect || !isValidEmail || !isValidEmail ? 'profile__submit_type_disactive' : ''}`
  );


  React.useEffect(() => {
    setProfileName(userData.name);
    setProfileEmail(userData.email);
  }, [userData, props.isOpen]);

  function handleChangeName(e) {
    if (e.target.value.match(/[^a-zа-яё -]/iu)) {
      setErrorName('Имя должно содержать только латиницу, кириллицу, пробел или дефис')
      setIsValidName(false)
    } else if (e.target.value.length < 2) {
      setErrorName('Имя не должно быть короче 2 символов')
      setIsValidName(false)
    } else {
      setErrorName('')
      setProfileName(e.target.value)
      setIsValidName(true)
    }
  }

  function handleChangeEmail(e) {
    setErrConnect(false)
    setErrConflict(false)
    if (!validator.isEmail(e.target.value)) {
      setErrorEmail('Введите корректный E-mail')
      setIsValidEmail(false)
    } else {
      setErrorEmail('')
      setProfileEmail(e.target.value)
      setIsValidEmail(true)
    }
  }

  function resetForm() {
    setErrorEmail('')
    setErrorName('')
    setProfileEmail('')
    setProfileName('')
    setIsValidEmail(false)
    setIsValidName(false)
    setIsRedact(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
        name: profileName,
        email: profileEmail,
    });
    resetForm()
  }

  function handleRedact() {
    setIsRedact(true)
  }

  return (
    <section className="profile">
      <h2 className="profile__greeting">{`Привет, ${userData.name}!`}</h2>
      <form onSubmit={handleSubmit} className="profile__info-form" noValidate>
        <div className="profile__info-container">
          <p className="profile__info-name">Имя</p>
          <input value={profileName || ''} disabled={!isRedact} onChange={handleChangeName} type="text" placeholder="Имя" name="name" className={inputNameClassName} required minLength="2" maxLength="40" />
          <span className="profile__input-error">{errorName}</span>
        </div>
        <div className="profile__info-container">
          <p className="profile__info-name">E-mail</p>
          <input value={profileEmail || ''} disabled={!isRedact} onChange={handleChangeEmail} type="text" placeholder="E-mail" name="email" className={inputMailClassName} required minLength="2" maxLength="40" />
          <span className="profile__input-error">{errorEmail}</span>
        </div>
        <div className="profile__error-container">
          {errConflict || errConnect ? <p className="profile__error-name">{errText}</p> : ''}
        </div>
        {isRedact ? <button disabled={errConflict || errConnect || !isValidEmail || !isValidEmail} type="submit" className={buttonClassName}>Сохранить</button> :
          <div className="profile__container">
            <button onClick={handleRedact} className="profile__redact" aria-label="Редактирование профиля" type="button">Редактировать</button>
            <NavLink onClick={props.singOut} to="/" className="profile__link">Выйти из аккаунта</NavLink>
          </div>
        }
        </form>
    </section>
  );
}
export default Profile;