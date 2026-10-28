import { jsx as a } from "react/jsx-runtime";
import { Text as n } from "../Text/Text.js";
const i = {
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
function f({ variant: t = "info", children: e, className: r = "" }) {
  const { className: c, border: s } = i[t];
  return /* @__PURE__ */ a(
    n,
    {
      as: "span",
      variant: "tag-label",
      title: typeof e == "string" ? e : void 0,
      className: `inline-flex items-center min-w-0 max-w-full whitespace-nowrap rounded-(--radius-sm) py-(--inset-1) px-(--inset-3) ${c} ${r}`,
      style: s ? { border: s } : void 0,
      children: /* @__PURE__ */ a("span", { className: "truncate", children: e })
    }
  );
}
export {
  f as Tag
};
