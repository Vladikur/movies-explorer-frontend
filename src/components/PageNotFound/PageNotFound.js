import React from 'react';

function PageNotFound(props) {

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__header">404</h2>
      <p className="page-not-found__text">Страница не найдена</p>
      <button onClick={props.back} className="page-not-found__button">Назад</button>
    </section>
  );
}
export default PageNotFound;