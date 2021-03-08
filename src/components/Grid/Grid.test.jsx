// Grid.test.jsx

import { shallow } from "enzyme";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Grid from "./Grid";

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

describe("Grid Component", () => {
  const fakeItems = [
    {
      id: "1",
      login: "john_doe",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "2",
      login: "jane_doe",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "3",
      login: "joss_doe",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
  ];

  it("renders Card", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeItems),
      })
    );

    const wrapper = shallow(
      <Grid
        items={fakeItems}
        visibleItems={[]}
        setVisibleItems={[]}
        finishedItems={[]}
        checkItems={() => {}}
      />
    );

    expect(wrapper.find("Card")).toHaveLength(fakeItems.length);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

  it("renders item with Card", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeItems),
      })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Grid
          items={fakeItems}
          visibleItems={[]}
          setVisibleItems={[]}
          finishedItems={[]}
          checkItems={() => {}}
        />,
        container
      );
    });

    expect(container.querySelector("img").getAttribute("src")).toBe(
      fakeItems[0].avatar
    );
    expect(container.querySelector("img").getAttribute("alt")).toBe(
      fakeItems[0].login
    );

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});
