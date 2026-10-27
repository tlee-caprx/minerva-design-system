import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges conflicting Tailwind classes using last-write wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("handles conditional and nullable class inputs", () => {
    const shouldHide = false;

    expect(cn("inline-flex", shouldHide ? "hidden" : "", null, undefined)).toBe("inline-flex");
  });

  it("does not collapse explicit fg + length-hinted font-size Mochi utilities", () => {
    expect(cn("text-ds-button-fg-default", "text-(length:--ds-button-default-font-size)")).toBe(
      "text-ds-button-fg-default text-(length:--ds-button-default-font-size)",
    );
  });

  it("merges registered brand typography font-size utilities", () => {
    expect(cn("text-brand-body-md", "text-3xl")).toBe("text-3xl");
    expect(cn("text-3xl", "text-brand-body-md")).toBe("text-brand-body-md");
    expect(cn("text-brand-body-md", "text-brand-heading-xl")).toBe("text-brand-heading-xl");
  });

  it("merges registered brand typography leading utilities", () => {
    expect(cn("leading-brand-body-md", "leading-10")).toBe("leading-10");
    expect(cn("leading-10", "leading-brand-body-md")).toBe("leading-brand-body-md");
    expect(cn("leading-brand-body-md", "leading-brand-heading-xl")).toBe(
      "leading-brand-heading-xl",
    );
  });

  it("uses Tailwind font-size and leading conflict behavior", () => {
    expect(cn("leading-brand-body-md", "text-3xl")).toBe("text-3xl");
    expect(cn("text-3xl", "leading-brand-body-md")).toBe("text-3xl leading-brand-body-md");
  });

  it("merges registered brand typography font-family utilities", () => {
    expect(cn("font-brand-body", "font-sans")).toBe("font-sans");
    expect(cn("font-sans", "font-brand-body")).toBe("font-brand-body");
    expect(cn("font-brand-body", "font-brand-heading")).toBe("font-brand-heading");
  });

  it("merges registered brand typography font-weight utilities", () => {
    expect(cn("font-brand-body-weight", "font-bold")).toBe("font-bold");
    expect(cn("font-bold", "font-brand-body-weight")).toBe("font-brand-body-weight");
    expect(cn("font-brand-body-weight", "font-brand-heading-weight")).toBe(
      "font-brand-heading-weight",
    );
  });

  it("merges brand color utilities independently from typography utilities", () => {
    expect(cn("text-brand-tertiary-800", "text-red-500")).toBe("text-red-500");
    expect(cn("text-red-500", "text-brand-tertiary-800")).toBe("text-brand-tertiary-800");

    expect(cn("bg-brand-primary-500", "bg-red-500")).toBe("bg-red-500");
    expect(cn("border-semantic-error-500", "border-red-500")).toBe("border-red-500");

    expect(cn("text-brand-tertiary-800", "text-brand-heading-xl")).toBe(
      "text-brand-tertiary-800 text-brand-heading-xl",
    );
  });

  it("merges atomic brand typography recipes", () => {
    expect(
      cn(
        "font-brand-body font-brand-body-weight text-brand-body-md",
        "font-brand-heading font-brand-heading-weight text-brand-heading-xl",
      ),
    ).toBe("font-brand-heading font-brand-heading-weight text-brand-heading-xl");
  });

  it("allows atomic overrides within brand typography recipes", () => {
    expect(cn("font-brand-body font-brand-body-weight text-brand-body-md", "text-3xl")).toBe(
      "font-brand-body font-brand-body-weight text-3xl",
    );

    expect(cn("font-brand-body font-brand-body-weight text-brand-body-md", "font-bold")).toBe(
      "font-brand-body text-brand-body-md font-bold",
    );

    expect(cn("font-brand-body font-brand-body-weight text-brand-body-md", "leading-8")).toBe(
      "font-brand-body font-brand-body-weight text-brand-body-md leading-8",
    );
  });
});
