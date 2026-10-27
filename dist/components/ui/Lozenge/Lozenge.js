import { jsx as s } from "react/jsx-runtime";
import { Text as n } from "../Text/Text.js";
const i = {
  light: "bg-(--bg-surface-muted) text-(--text-surface-subtle)",
  dark: "bg-(--bg-surface-inverse) text-(--text-surface-inverse)"
};
function c({ count: e = 0, variant: t = "light", className: r = "" }) {
  return /* @__PURE__ */ s(
    n,
    {
      as: "span",
      variant: "label-md",
      className: `inline-flex items-center justify-center rounded-(--radius-full) px-(--inset-2) py-(--space-2) ${i[t]} ${r}`,
      children: e
    }
  );
}
export {
  c as Lozenge
};
