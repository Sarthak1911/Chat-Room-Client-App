import React from "react";
const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group col m-0 p-0">
      <input
        name={name}
        {...rest}
        className="form-control"
        id={name}
        placeholder={label}
      ></input>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
