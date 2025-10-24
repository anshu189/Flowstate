import { render, screen } from "@testing-library/react";
import About from "../Pages/About";
import "@testing-library/jest-dom";

// Group test cases
describe("About us Test Cases for minor Components", () => {
  test("Should load About Us Component", () => {
    render(<About />);
    const heading = screen.getByRole("heading");
    // Assertion
    expect(heading).toBeInTheDocument();
  });

  test("Should load p tag inside About Us Component", () => {
    render(<About />);
    //   Querying
    const name = screen.getAllByRole("paragraph");
    // Assertion
    expect(name.length).toBe(3);
  });
});
