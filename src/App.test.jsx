// App.test.jsx
import * as React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("Some message", () => {
  const setState = jest.fn();
  const useStateMock = (initState) => [initState, setState];
  const useEffectMock = (initState) => [initState, setState];

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders", () => {
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    jest.spyOn(React, "useEffect").mockImplementation(useEffectMock);
    shallow(<App />);
  });
});
