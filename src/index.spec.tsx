import ContentstackAppSDK from "@contentstack/app-sdk";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeSdk } from "./test-utils/sdk";

vi.mock("@contentstack/app-sdk", () => ({ default: { init: vi.fn() } }));

// Contentstack loads the app in an iframe at <host>/#/custom-field and <host>/#/config (see the app's docs page).
describe("entry", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(ContentstackAppSDK.init).mockResolvedValue(makeSdk().sdk as never);
    document.body.innerHTML = '<div id="root"></div>';
  });

  it("renders the editor at /#/custom-field", async () => {
    window.history.pushState({}, "", "/#/custom-field");
    await import("./main");
    await vi.waitFor(() => expect(document.querySelector(".layout-container .jsoneditor")).not.toBeNull());
  });

  it("renders the config screen at /#/config", async () => {
    window.history.pushState({}, "", "/#/config");
    await import("./main");
    await vi.waitFor(() => expect(document.querySelector('[data-testid="cs-form"]')).not.toBeNull());
  });
});
