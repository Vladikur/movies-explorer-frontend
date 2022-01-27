import React from 'react';

function Form(props) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      {props.children}
    </>
  );
}
export default Form;