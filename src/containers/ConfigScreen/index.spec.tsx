import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ConfigScreen from "./index";
import { makeSdk } from "../../test-utils/sdk";

vi.mock("@contentstack/app-sdk", () => ({ default: { init: vi.fn() } }));

const radio = (id: string) => document.getElementById(id) as HTMLInputElement;

const mount = async (installation: Record<string, unknown> = {}) => {
  const made = makeSdk({ installation });
  vi.mocked(ContentstackAppSDK.init).mockResolvedValue(made.sdk as never);
  render(<ConfigScreen />);
  await waitFor(() => expect(made.sdk.location.AppConfigWidget.installation.getInstallationData).toHaveBeenCalled());
  return made;
};

beforeEach(() => vi.clearAllMocks());

describe("config screen", () => {
  it("shows the data-format setting with JSON Object selected by default", async () => {
    await mount();
    expect(screen.getByText("Data format In Entry")).toBeInTheDocument();
    expect(radio("jsonObject").checked).toBe(true);
    expect(radio("stringified").checked).toBe(false);
  });

  it("saves isStringified=true when JSON Stringified is chosen", async () => {
    const { setInstallationData } = await mount();
    fireEvent.click(radio("stringified"));
    await waitFor(() => expect(setInstallationData).toHaveBeenCalled());
    expect(setInstallationData.mock.calls[0][0].configuration.isStringified).toBe(true);
    expect(radio("stringified").checked).toBe(true);
  });

  it("saves isStringified=false when JSON Object is chosen", async () => {
    const { setInstallationData } = await mount({ isStringified: true });
    fireEvent.click(radio("jsonObject"));
    await waitFor(() => expect(setInstallationData).toHaveBeenCalled());
    expect(setInstallationData.mock.calls[0][0].configuration.isStringified).toBe(false);
  });

  it("shows the saved stringified choice selected on reopen", async () => {
    await mount({ isStringified: true });
    await waitFor(() => expect(radio("stringified").checked).toBe(true));
  });

  it("logs and still renders when the SDK fails", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(ContentstackAppSDK.init).mockRejectedValue(new Error("boom"));
    render(<ConfigScreen />);
    await waitFor(() => expect(err).toHaveBeenCalled());
    expect(screen.getByTestId("cs-form")).toBeInTheDocument();
  });
});

describe("config screen without an installation widget", () => {
  it("renders the form with defaults", async () => {
    const { sdk } = makeSdk();
    vi.mocked(ContentstackAppSDK.init).mockResolvedValue({ ...sdk, location: {} } as never);
    render(<ConfigScreen />);
    await waitFor(() => expect(ContentstackAppSDK.init).toHaveBeenCalled());
    expect(radio("jsonObject").checked).toBe(true);
    fireEvent.click(radio("stringified"));
    expect(radio("stringified").checked).toBe(true);
  });
});
