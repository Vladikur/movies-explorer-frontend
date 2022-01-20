import React from 'react';
import vlad from '../../../images/vlad.png';

function AboutMe() {

  return (
    <section className="about-me" name="about-student">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__text-name">Владислав</h3>
          <h4 className="about-me__text-profeshion">Фронтенд-разработчик, 26 лет</h4>
          <p className="about-me__text-description">Я родился в Борисоглебске, сейчас живу в Санкт-Петербурге, закончил факультет транспортных и энергетических систем ПГУПС. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить и понял, что это то, чем я хочу заниматься. С 2018 года работал в компании «РЖД» 2 года. Потом решил попробовать себя в роли мастера по ремонту очков. После того, как прошёл курс по веб-разработке, начал поиски работы в новой сфере.</p>
          <ul className="about-me__links">
            <li className="about-me__link-container"><a href="https://vk.com/wladikur" className="about-me__link" target="_blank" rel='noreferrer'>Vkontakte</a></li>
            <li className="about-me__link-container"><a href="https://github.com/Vladikur" className="about-me__link" target="_blank" rel='noreferrer'>Github</a></li>
          </ul>
        </div>
        <img src={vlad} alt="Фотография Влада" className="about__image"/>
      </div>
    </section>
  );
}
export default AboutMe;