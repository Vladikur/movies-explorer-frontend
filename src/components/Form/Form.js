import React from 'react';

function Form(props) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {props.children}
    </form>
  );
}
export default Form;