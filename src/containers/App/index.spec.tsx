import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./index";

vi.mock("../ConfigScreen", () => ({ default: () => <p>config</p> }));
vi.mock("../CustomField", () => ({ default: () => <p>field</p> }));

describe("App routing", () => {
  it.each([
    ["/#/config", "config"],
    ["/#/custom-field", "field"],
    ["/config", "config"],
    ["/custom-field", "field"],
  ])("%s shows %s", (url, text) => {
    window.history.pushState({}, "", url);
    render(<App />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
