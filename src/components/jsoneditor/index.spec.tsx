import React from "react";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import JsonEditorComponent from "./index";
import { instances } from "../../test-utils/fakeJsonEditor";

vi.mock("jsoneditor", async () => ({ default: (await import("../../test-utils/fakeJsonEditor")).FakeEditor }));
vi.mock("jsoneditor/dist/jsoneditor.min.css", () => ({}));

beforeEach(() => { instances.length = 0; });

describe("JSON editor component", () => {
  it("offers the five editor modes, starting in code mode", () => {
    render(<JsonEditorComponent value={{ a: 1 }} onChange={vi.fn()} />);
    expect(instances[0].options.mode).toBe("code");
    expect(instances[0].options.modes).toEqual(["code", "form", "text", "tree", "view"]);
  });

  it("loads the stored value and passes edits to onChange", () => {
    const onChange = vi.fn();
    render(<JsonEditorComponent value={{ a: 1 }} onChange={onChange} />);
    expect(instances[0].set).toHaveBeenCalledWith({ a: 1 });
    instances[0].edit({ b: 2 });
    expect(onChange).toHaveBeenCalledWith({ b: 2 });
  });

  it("ignores edits while the text is not valid JSON", () => {
    const onChange = vi.fn();
    render(<JsonEditorComponent value={{}} onChange={onChange} />);
    instances[0].getThrows = true;
    instances[0].options.onChange();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("pushes a new value prop into the editor and destroys it on unmount", () => {
    const { rerender, unmount } = render(<JsonEditorComponent value={{ a: 1 }} onChange={vi.fn()} />);
    rerender(<JsonEditorComponent value={{ a: 2 }} onChange={vi.fn()} />);
    expect(instances[0].update).toHaveBeenLastCalledWith({ a: 2 });
    unmount();
    expect(instances[0].destroy).toHaveBeenCalled();
  });
});
