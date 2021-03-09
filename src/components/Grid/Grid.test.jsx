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
      login: "test1",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "2",
      login: "test2",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "3",
      login: "test3",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "4",
      login: "test4",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "5",
      login: "test5",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "6",
      login: "test6",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "7",
      login: "test7",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "8",
      login: "test8",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "9",
      login: "test9",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "10",
      login: "test10",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "11",
      login: "test11",
      avatar: "https://reactjs.org/favicon-32x32.png",
    },
    {
      id: "12",
      login: "test12",
      avatar: "https://reactjs.org/favicon-32x32.png",
    }
  ];

  it("renders", () => {
    shallow(
      <Grid
        items={fakeItems}
        visibleItems={[]}
        setVisibleItems={[]}
        finishedItems={[]}
        checkItems={() => {}}
      />
    );
  });

  it("renders a card", async () => {
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

  it("renders item card with images", async () => {
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
