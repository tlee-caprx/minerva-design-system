import { jsx as c } from "react/jsx-runtime";
import { Text as n } from "../Text/Text.js";
const b = {
  info: {
    className: "bg-(--bg-surface-subtle) text-(--text-surface-subtle)",
    border: "1px solid var(--border-surface-base)"
  },
  "info-high-contrast": {
    className: "bg-(--bg-surface-accent-secondary) text-(--text-surface-inverse)"
  },
  success: {
    className: "bg-(--bg-feedback-success-base) text-(--text-feedback-success-inverse)"
  },
  warning: {
    className: "bg-(--bg-feedback-warning-base) text-(--text-feedback-warning-strong)"
  },
  error: {
    className: "bg-(--bg-feedback-error-base) text-(--text-feedback-error-inverse)"
  },
  system: {
    className: "bg-(--bg-feedback-informational-base) text-(--text-feedback-informational-inverse)"
  },
  "system-alt": {
    className: "bg-(--bg-surface-accent-primary) text-(--text-surface-inverse)"
  }
};
function f({ variant: s = "info", children: a, className: t = "" }) {
  const { className: r, border: e } = b[s];
  return /* @__PURE__ */ c(
    n,
    {
      as: "span",
      variant: "tag-label",
      className: `inline-flex items-center rounded-(--radius-sm) py-(--inset-1) px-(--inset-3) ${r} ${t}`,
      style: e ? { border: e } : void 0,
      children: a
    }
  );
}
export {
  f as Tag
};
