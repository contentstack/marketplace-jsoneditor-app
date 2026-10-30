import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./components/ErrorBoundary";
import VenusHelp from "./components/venus-help";
import { isEmpty, mergeObjects } from "./common/utils";
import getAppLocation from "./common/utils/function";
import useAnalytics from "./hooks/useAnalytics";
import { appSdkRefAtom } from "./hooks/useAppSdk";

describe("utils", () => {
  it("isEmpty", () => {
    expect([undefined, null, {}, "  "].every(isEmpty)).toBe(true);
    expect([0, "a", { a: 1 }, false].some(isEmpty)).toBe(false);
  });

  it("mergeObjects keeps target keys, overlays source, merges nested objects", () => {
    expect(mergeObjects({ a: 1, n: { x: 1 } }, { b: 2, n: { y: 2 } })).toEqual({ a: 1, b: 2, n: { x: 1, y: 2 } });
  });

  it("getAppLocation returns the first non-empty location, else empty string", () => {
    expect(getAppLocation({ location: { A: {}, B: { x: 1 } } } as never)).toBe("B");
    expect(getAppLocation({ location: {} } as never)).toBe("");
  });
});

describe("ErrorBoundary", () => {
  it("renders children, then a fallback when a child throws", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    const Boom = () => { throw new Error("x"); };
    const { rerender } = render(<ErrorBoundary><p>ok</p></ErrorBoundary>);
    expect(screen.getByText("ok")).toBeInTheDocument();
    rerender(<ErrorBoundary><Boom /></ErrorBoundary>);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});

it("ErrorBoundary logs the error in development", async () => {
  vi.stubEnv("NODE_ENV", "development");
  vi.resetModules();
  const { default: DevBoundary } = await import("./components/ErrorBoundary");
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const err = vi.spyOn(console, "error").mockImplementation(() => {});
  const Boom = () => { throw new Error("dev-boom"); };
  render(<DevBoundary><Boom /></DevBoundary>);
  expect(err).toHaveBeenCalledWith(expect.objectContaining({ message: "dev-boom" }));
  vi.unstubAllEnvs();
});

it("VenusHelp renders the help icon", () => {
  const { container } = render(<VenusHelp />);
  expect(container.querySelector("svg[name='Help']")).not.toBeNull();
});

describe("useAnalytics", () => {
  const withSdk = (pulse: () => void) => {
    const store = createStore();
    store.set(appSdkRefAtom, { pulse } as never);
    return ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;
  };

  it("does not send pulses outside production", () => {
    const pulse = vi.fn();
    renderHook(() => useAnalytics().trackEvent("e"), { wrapper: withSdk(pulse) });
    expect(pulse).not.toHaveBeenCalled();
  });

  it("sends pulses in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.resetModules();
    const { default: prodAnalytics } = await import("./hooks/useAnalytics");
    const { appSdkRefAtom: atom } = await import("./hooks/useAppSdk");
    const pulse = vi.fn();
    const store = createStore();
    store.set(atom, { pulse } as never);
    const { result } = renderHook(() => prodAnalytics(), {
      wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
    });
    result.current.trackEvent("e", { a: 1 });
    expect(pulse).toHaveBeenCalledWith("e", { a: 1 });
    vi.unstubAllEnvs();
  });
});
