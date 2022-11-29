import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ConfigPage from "./index";

const inputLabel = "Data format In Entry";

const UIElementsIDs = [
  "cs-form",
  "cs-field",
  "cs-field-label",
  "cs-tooltip",
  "cs-radio-one",
  "cs-radio-two",
  "cs-instruction-text",
];

beforeEach(async () => {
  render(<ConfigPage />);
});
jest.spyOn(React, "useEffect").mockImplementation();

afterEach(cleanup);

describe(`UI Elements of Custom Field Screen`, () => {
  UIElementsIDs.forEach((id: string) => {
    test(`Rendered ${id} element`, async () => {
      expect(screen.getByTestId(`${id}`)).toBeInTheDocument();
    });
  });

  test(`Text Label`, async () => {
    expect(screen.getByText(inputLabel)).toBeInTheDocument();
  });

  test(`FireEvent Functionality`, async () => {
    const input = screen
      .getByTestId(`cs-radio-one`)
      .querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "false" } });
    expect(input.value).toBe("false");
  });
});
