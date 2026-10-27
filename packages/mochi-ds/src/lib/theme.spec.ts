import { describe, expect, it } from "vitest";

import { buildOverrideCSS } from "./theme";

describe("buildOverrideCSS", () => {
  it("maps shared brand roles to runtime CSS overrides", () => {
    expect(buildOverrideCSS({ brand: { primary: "#1438ff", statusUrgent: "#ca1a26" } })).toBe(
      ":root {\n  --brand-primary: #1438ff;\n  --brand-status-urgent: #ca1a26;\n}",
    );
  });

  it("ignores unknown keys rather than emitting unsupported tokens", () => {
    expect(buildOverrideCSS({ brand: { nonexistent: "red" } })).toBe("");
  });
});
