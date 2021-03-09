// Card.test.jsx

import { shallow } from "enzyme";
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

describe("Card Component", () => {
  const fakeItem = {
    id: "1",
    login: "test1",
    avatar: "https://reactjs.org/favicon-32x32.png",
  };

  it("renders", () => {
    shallow(<Card item={fakeItem} />);
  });

  it("renders an image", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeItem),
      })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Card item={fakeItem} />, container);
    });

    expect(container.querySelector("img").getAttribute("src")).toBe(
      fakeItem.avatar
    );
    expect(container.querySelector("img").getAttribute("alt")).toBe(
      fakeItem.login
    );

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

  it("test click event", () => {
    const mockCallBack = jest.fn();

    const card = shallow(
      <Card item={fakeItem} onClick={mockCallBack}>
        Ok!
      </Card>
    );
    card.find(".card").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
