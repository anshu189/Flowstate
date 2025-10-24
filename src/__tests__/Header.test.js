import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../store/appStore";
import Header from "../components/Header";
import { BrowserRouter } from "react-router";
import { fireEvent, screen, render } from "@testing-library/react";

describe("Check if Header Component is loading correctly or not", () => {
  test("Should load login button component", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    // Querying
    const button = screen.getByRole("button", { name: "Login" });
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

  test("Should change the Login to Logout onclick", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    // Querying
    const Loginbtn = screen.getByRole("button", { name: "Login" });
    // Event Firing
    fireEvent.click(Loginbtn);
    // Querying
    const Logoutbtn = screen.getByRole("button", { name: "Logout" });
    // Assertion
    expect(Logoutbtn).toBeInTheDocument();
  });
});
