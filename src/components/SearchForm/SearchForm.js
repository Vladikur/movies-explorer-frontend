import React from 'react';

function SearchForm(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.submitMoviesSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="search-form" noValidate>
      {props.children}
    </form>
  );
}

export default SearchForm;