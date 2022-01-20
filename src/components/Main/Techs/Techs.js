import React from 'react';

function Techs() {

  return (
    <section className="techs" name="technologies">
      <h2 className="techs__header">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__header2">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__skills">
            <li className="techs__skill">HTML</li>
            <li className="techs__skill">CSS</li>
            <li className="techs__skill">JS</li>
            <li className="techs__skill">React</li>
            <li className="techs__skill">Git</li>
            <li className="techs__skill">Express.js</li>
            <li className="techs__skill">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
export default Techs;