import "@testing-library/jest-dom";
import Header from "../components/Header";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import appStore from "../store/appStore";

describe("Check if Header is loading correctly or not", () => {
  test("Should load login button component", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    // Querying
    const button = screen.getByRole("button");
    // Assertion
    expect(button).toBeInTheDocument();
  });
  test("Should load logo", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    // Querying
    const logo = screen.getByRole("img");
    // Assertion
    expect(logo).toBeInTheDocument();
  });
});
