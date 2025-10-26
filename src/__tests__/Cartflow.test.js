import { BrowserRouter, ScrollRestoration } from "react-router-dom";
import SingleRestaurant from "../Pages/SingleRestaurant";
import { Provider } from "react-redux";
import Header from "../components/Header";
import appStore from "../store/appStore";
import MOCK_RES_DATA from "../mockdata/mockResData.json";
import MOCK_SINGLE_DATA from "../mockdata/mockSingleResData.json";
import { act, fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Appbody from "../components/Appbody";
import CartPage from "../Pages/CartPage";

global.fetch = jest
  .fn()
  // First fetch for AppBody
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_RES_DATA),
    })
  )
  // Second fetch for SingleRestaurant
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_SINGLE_DATA),
    })
  );

describe("Add to Cart", () => {
  test("Should sequentially correctly complete the add cart flow", async () => {
    // Render Appbody
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Appbody />
          </Provider>
        </BrowserRouter>
      )
    );

    const rescards = screen.getAllByTestId("rescard");
    fireEvent.click(rescards[0]);

    // Render SingleRestaurant
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
            <SingleRestaurant />
          </Provider>
        </BrowserRouter>
      )
    );

    const addbtn = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addbtn);

    expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument();

    // Render CartPage
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
            <CartPage />
          </Provider>
        </BrowserRouter>
      )
    );

    const cartres = screen.getByText("Classic Margherita Pizza");
    expect(cartres).toBeInTheDocument();
  });
});

describe("Remove from Cart", () => {
  test("Should sequentially correctly complete the remove cart flow", async () => {
    // Render CartPage
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
            <CartPage />
          </Provider>
        </BrowserRouter>
      )
    );

    const cartremovebtn = screen.getByText("Remove Item");
    fireEvent.click(cartremovebtn);

    expect(screen.getByText("Cart - (0 items)")).toBeInTheDocument();
  });
});
