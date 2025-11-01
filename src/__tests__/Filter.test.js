import { act, fireEvent, render, screen } from "@testing-library/react";
import Appbody from "../components/Appbody";
import MOCK_DATA from "../mockdata/mockResData.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock fetch functionality for jsdom
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

describe("Testing Search & Filter Component Functionality", () => {
  beforeAll(async () => {});

  beforeEach(async () => {});

  afterAll(async () => {});

  afterEach(async () => {});
  test("should check Search Input box is present or not", async () => {
    await act(() =>
      render(
        <BrowserRouter>
          <Appbody />
        </BrowserRouter>
      )
    );
    // Querying
    const searchInput = screen.getByPlaceholderText("Search...");
    // Assetion
    expect(searchInput).toBeInTheDocument();
  });

  test("should check search functionality", async () => {
    await act(() =>
      render(
        <BrowserRouter>
          <Appbody />
        </BrowserRouter>
      )
    );
    // Querying
    const searchbtn = screen.getByRole("button", { name: "Search" });
    const searchInput = screen.getByTestId("searchinput");
    fireEvent.change(searchInput, { target: { value: "chicken" } });
    fireEvent.click(searchbtn);
    // screen should load 5 cards
    const rescards = screen.getAllByTestId("rescard");
    // Assetion
    // screen.debug(rescards);
    expect(rescards.length).toBe(5);
  });
});
