import { BrowserRouter } from "react-router-dom";
import SingleRestaurant from "../Pages/SingleRestaurant";
import { Provider } from "react-redux";
import Header from "../components/Header";
import appStore from "../store/appStore";
import MOCK_DATA from "../mockdata/mockSingleResData.json";
import { act, fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

test("Should correctly complete the cart flow ", async () => {
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
});
