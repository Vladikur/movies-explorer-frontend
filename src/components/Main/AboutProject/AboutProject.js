import React from 'react';

function AboutProject() {

  return (
    <section className="aboutProject" name="about-project">
      <h2 className="aboutProject__header">О проекте</h2>
      <div className="aboutProject__cards">
        <div className="aboutProject__card">
          <h3 className="aboutProject__card-header">Дипломный проект включал 5 этапов</h3>
          <p className="aboutProject__card-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="aboutProject__card">
          <h3 className="aboutProject__card-header">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__card-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="aboutProject__container">
        <div className="aboutProject__line1">
          <span className="aboutProject__line-text">1 неделя</span>
          <span className="aboutProject__underline-text">Back-end</span>
        </div>
        <div className="aboutProject__line2">
          <span className="aboutProject__line-text">4 недели</span>
          <span className="aboutProject__underline-text">Front-end</span>
        </div>
      </div>
    </section>
  );
}
export default AboutProject;