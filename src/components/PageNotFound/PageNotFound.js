import React from 'react';
import { useHistory } from 'react-router-dom';



function PageNotFound(props) {

  const history = useHistory();

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__header">404</h2>
      <p className="page-not-found__text">Страница не найдена</p>
      <button onClick={() => history.goBack()} className="page-not-found__button">Назад</button>
    </section>
  );
}
export default PageNotFound;