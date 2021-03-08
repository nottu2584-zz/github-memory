import React from "react";

import "./Modal.css";

const Modal = (props) => {
  const { visible } = props;

  return (
    <div className="App-modal" hidden={!visible}>
      <div className="wrapper">
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
