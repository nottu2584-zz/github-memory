// Modal.test.jsx

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Modal from "./Modal";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with children", async () => {
  const visible = true;

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Modal visible={visible}>
        <div className="title">Test Modal</div>
        <div className="button">
          <button onClick={()=>{}}>Button</button>
        </div>
      </Modal>,
      container
    );
  });

  expect(container.querySelector(".title")).toHaveTextContent("Test Modal");
  expect(container.querySelector("button")).toHaveTextContent("Button");
});
