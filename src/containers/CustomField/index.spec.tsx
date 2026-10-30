import React from "react";
import { render, waitFor } from "@testing-library/react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CustomField from "./index";
import { instances } from "../../test-utils/fakeJsonEditor";
import { makeSdk } from "../../test-utils/sdk";

vi.mock("@contentstack/app-sdk", () => ({ default: { init: vi.fn() } }));
vi.mock("jsoneditor", async () => ({ default: (await import("../../test-utils/fakeJsonEditor")).FakeEditor }));
vi.mock("jsoneditor/dist/jsoneditor.min.css", () => ({}));

const mount = async (opts: Parameters<typeof makeSdk>[0]) => {
  const made = makeSdk(opts);
  vi.mocked(ContentstackAppSDK.init).mockResolvedValue(made.sdk as never);
  render(<CustomField />);
  await waitFor(() => expect(instances.length).toBe(1));
  return made;
};

beforeEach(() => { instances.length = 0; vi.clearAllMocks(); });

describe("saved data shape", () => {
  it("saves an edit as [object] when stringify is off", async () => {
    const { setData } = await mount({ stored: [{ a: 1 }] });
    instances[0].edit({ b: 2 });
    expect(setData).toHaveBeenLastCalledWith([{ b: 2 }]);
  });

  it("saves an edit as [JSON string] when the global isStringified setting is on", async () => {
    const { setData } = await mount({ stored: [{ a: 1 }], globalStringify: true });
    instances[0].edit({ b: 2 });
    expect(setData).toHaveBeenLastCalledWith(['{"b":2}']);
  });

  it("re-saves stored data in the configured shape on load", async () => {
    const { setData } = await mount({ stored: [{ a: 1 }], globalStringify: true });
    await waitFor(() => expect(setData).toHaveBeenLastCalledWith(['{"a":1}']));
  });

  it("on load, a content-type stringify=false override beats global true", async () => {
    const { setData } = await mount({ stored: [{ a: 1 }], globalStringify: true, fieldStringify: false });
    await waitFor(() => expect(setData).toHaveBeenLastCalledWith([{ a: 1 }]));
  });

  it("on load, a content-type stringify=true override beats global false", async () => {
    const { setData } = await mount({ stored: [{ a: 1 }], globalStringify: false, fieldStringify: true });
    await waitFor(() => expect(setData).toHaveBeenLastCalledWith(['{"a":1}']));
  });

  // BUG: MKT-19751 `let isStringified` is re-declared on every render, so the per-content-type override is lost by the time onChangeSave runs.
  it.skip("a content-type stringify=true override beats global false", async () => {
    const { setData } = await mount({ stored: [{ a: 1 }], globalStringify: false, fieldStringify: true });
    instances[0].edit({ b: 2 });
    expect(setData).toHaveBeenLastCalledWith(['{"b":2}']);
  });

  // BUG: MKT-19751 same cause as above.
  it.skip("a content-type stringify=false override beats global true", async () => {
    const { setData } = await mount({ stored: [{ a: 1 }], globalStringify: true, fieldStringify: false });
    instances[0].edit({ b: 2 });
    expect(setData).toHaveBeenLastCalledWith([{ b: 2 }]);
  });
});

describe("loading stored data", () => {
  it("shows stored [object] data in the editor", async () => {
    await mount({ stored: [{ a: 1 }] });
    expect(instances[0].set).toHaveBeenCalledWith({ a: 1 });
  });

  it("parses stored [JSON string] data for the editor", async () => {
    await mount({ stored: ['{"a":1}'] });
    expect(instances[0].set).toHaveBeenCalledWith({ a: 1 });
  });

  it("starts with an empty object when nothing is stored", async () => {
    await mount({ stored: undefined });
    expect(instances[0].set).toHaveBeenCalledWith({});
  });

  it("treats a blank stored string as an empty object", async () => {
    await mount({ stored: ["   "] });
    expect(instances[0].set).toHaveBeenCalledWith({});
  });

  it("does not crash on invalid stored JSON and shows the editor", async () => {
    await mount({ stored: ["{not json"] });
    expect(instances[0].set).toHaveBeenCalled();
  });

  // BUG: MKT-19751 invalid stored JSON silently becomes {} and is then saved back, destroying the original text.
  it.skip("keeps invalid stored JSON instead of overwriting it with {}", async () => {
    const { setData } = await mount({ stored: ["{not json"] });
    expect(setData).not.toHaveBeenCalledWith([{}]);
  });
});

describe("SDK init", () => {
  it("sets the frame height", async () => {
    const { sdk } = await mount({ stored: [{}] });
    expect(sdk.location.CustomField.frame.updateHeight).toHaveBeenCalledWith(300);
  });

  // BUG: MKT-19751 when the SDK fails to initialise the page stays blank; no message is shown.
  it.skip("shows a message when the SDK fails to initialise", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(ContentstackAppSDK.init).mockRejectedValue(new Error("boom"));
    const { findByRole } = render(<CustomField />);
    expect(await findByRole("alert")).toBeInTheDocument();
  });

  it("logs the failure and renders no editor when the SDK fails to initialise", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(ContentstackAppSDK.init).mockRejectedValue(new Error("boom"));
    render(<CustomField />);
    await waitFor(() => expect(err).toHaveBeenCalled());
    expect(instances.length).toBe(0);
  });
});
