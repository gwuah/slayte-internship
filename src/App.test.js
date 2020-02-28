import React from "react";
import { render } from "@testing-library/react";
import App from "./pages/App";

test("renders learn react link", () => {
  const { getByTestId } = render(<App />);
  const divElement = getByTestId("firebaseui-auth-container");
  expect(divElement).toBeInTheDocument();
});
