import React from 'react';
import arrow from '../../../images/arrow.svg';

function Portfolio() {

  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__links">
            <li className="portfolio__link-container">
              <a href="https://vladikur.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel='noreferrer'>Статичный сайт</a>
              <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
            </li>
            <li className="portfolio__link-container">
              <a href="https://vladikur.github.io/russian-travel/" className="portfolio__link" target="_blank" rel='noreferrer'>Адаптивный сайт</a>
              <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
            </li>
            <li className="portfolio__link-container">
              <a href="http://kurmaev.students.nomoredomains.rocks/" className="portfolio__link" target="_blank" rel='noreferrer'>Одностраничное приложение</a>
              <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
            </li>
      </ul>
    </section>
  );
}
export default Portfolio;