import React from 'react';

function Footer() {

  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022. Владислав Курмаев</p>
        <nav>
          <ul className="footer__links">
            <li className="footer__link-container">
              <a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel='noreferrer'>Яндекс.Практикум</a>
            </li>
            <li className="footer__link-container">
              <a href="https://github.com/Vladikur" className="footer__link" target="_blank" rel='noreferrer'>Github</a>
            </li>
            <li className="footer__link-container">
              <a href="https://vk.com/wladikur" className="footer__link" target="_blank" rel='noreferrer'>Vkontakte</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;