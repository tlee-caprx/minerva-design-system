import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { Icon as f } from "../Icon/Icon.js";
import { CheckCircleIcon as l } from "../Icon/icons/check-circle.js";
import { WarningCircleIcon as g } from "../Icon/icons/warning-circle.js";
import { XCircleIcon as u } from "../Icon/icons/x-circle.js";
import { InfoCircleIcon as k } from "../Icon/icons/info-circle.js";
import { Text as c } from "../Text/Text.js";
const x = {
  informational: k,
  error: u,
  warning: g,
  success: l
}, v = {
  informational: {
    bg: "bg-(--bg-feedback-informational-inverse)",
    border: "var(--border-feedback-informational-muted)",
    icon: "text-(--icon-feedback-informational-base)"
  },
  error: {
    bg: "bg-(--bg-feedback-error-inverse)",
    border: "var(--border-feedback-error-muted)",
    icon: "text-(--icon-feedback-error-base)"
  },
  warning: {
    bg: "bg-(--bg-feedback-warning-inverse)",
    border: "var(--border-feedback-warning-muted)",
    icon: "text-(--icon-feedback-warning-base)"
  },
  success: {
    bg: "bg-(--bg-feedback-success-inverse)",
    border: "var(--border-feedback-success-muted)",
    icon: "text-(--icon-feedback-success-base)"
  }
};
function $({ variant: o, icon: n, ai: t = !1, header: a, children: b, action: s, className: d = "" }) {
  const r = v[o], m = n ?? x[o];
  return /* @__PURE__ */ i(
    "div",
    {
      className: `flex items-start gap-(--inline-2) p-(--inset-6) rounded-(--radius-sm) ${r.bg} ${d}`,
      style: {
        border: `var(--space-1) solid ${r.border}`,
        backgroundImage: t ? "var(--gradient-ai-default)" : void 0
      },
      children: [
        /* @__PURE__ */ e(f, { icon: m, size: "regular", className: `shrink-0 ${r.icon}` }),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 flex flex-col gap-(--stack-2)", children: [
          a && /* @__PURE__ */ e(c, { variant: "body-md", weight: "semibold", className: "text-(--text-surface-base)", children: a }),
          /* @__PURE__ */ e(c, { variant: "body-md", className: "text-(--text-surface-subtle)", children: b })
        ] }),
        s && /* @__PURE__ */ e("div", { className: "shrink-0", children: s })
      ]
    }
  );
}
export {
  $ as Message
};
