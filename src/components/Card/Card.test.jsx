// Card.test.jsx

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "./Card";

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

it("renders with item", async () => {
  const fakeItem = {
    id: "32",
    login: "john_doe",
    avatar: "https://reactjs.org/favicon-32x32.png",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeItem)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Card item={fakeItem} />, container);
  });

  expect(container.querySelector("img").getAttribute("src")).toBe(
    fakeItem.avatar
  );
  expect(container.querySelector("img").getAttribute("alt")).toBe(fakeItem.login);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
