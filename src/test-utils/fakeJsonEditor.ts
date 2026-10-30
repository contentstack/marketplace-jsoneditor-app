import { vi } from "vitest";

/** Stand-in for the `jsoneditor` package: records options and lets tests drive edits. */
export const instances: FakeEditor[] = [];

export class FakeEditor {
  value: unknown;
  getThrows = false;
  set = vi.fn((v: unknown) => { this.value = v; });
  update = vi.fn((v: unknown) => { this.value = v; });
  destroy = vi.fn();
  get = vi.fn(() => {
    if (this.getThrows) throw new Error("invalid json");
    return this.value;
  });
  constructor(public el: HTMLElement, public options: { mode: string; modes: string[]; onChange: () => void }) {
    instances.push(this);
  }
  /** Simulates the user editing the document. */
  edit(v: unknown) {
    this.value = v;
    this.options.onChange();
  }
}
