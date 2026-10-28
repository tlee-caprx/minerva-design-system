import { jsxs as c, jsx as i } from "react/jsx-runtime";
import { Icon as a } from "../Icon/Icon.js";
import { InfoCircleIcon as d } from "../Icon/icons/info-circle.js";
import { XCircleIcon as x } from "../Icon/icons/x-circle.js";
import { WarningCircleIcon as b } from "../Icon/icons/warning-circle.js";
import { CheckCircleIcon as u } from "../Icon/icons/check-circle.js";
import { Text as g } from "../Text/Text.js";
import { XCloseIcon as v } from "../Icon/icons/x-close.js";
const p = {
  success: {
    icon: u,
    bg: "bg-(--bg-feedback-success-muted)",
    text: "text-(--text-feedback-success-inverse)",
    iconColor: "text-(--icon-feedback-success-inverse)"
  },
  warning: {
    icon: b,
    bg: "bg-(--bg-feedback-warning-muted)",
    text: "text-(--text-feedback-warning-inverse)",
    iconColor: "text-(--icon-feedback-warning-inverse)"
  },
  error: {
    icon: x,
    bg: "bg-(--bg-feedback-error-muted)",
    text: "text-(--text-feedback-error-inverse)",
    iconColor: "text-(--icon-feedback-error-inverse)"
  },
  general: {
    icon: d,
    bg: "bg-(--bg-feedback-informational-muted)",
    text: "text-(--text-feedback-informational-inverse)",
    iconColor: "text-(--icon-feedback-informational-inverse)"
  }
};
function N({ type: n, variant: l, children: m, onClose: f, className: r = "" }) {
  const e = p[n], t = l === "banner", o = /* @__PURE__ */ c("div", { className: `flex items-center justify-center gap-(--inline-2) min-w-0 ${t ? "flex-1" : ""}`, children: [
    /* @__PURE__ */ i(a, { icon: e.icon, size: "regular", className: `shrink-0 ${e.iconColor}` }),
    /* @__PURE__ */ i(g, { variant: t ? "banner-text" : "toast-text", className: `min-w-0 text-center ${e.text}`, children: m })
  ] }), s = n === "error" || n === "warning" ? "alert" : "status";
  return t ? /* @__PURE__ */ c(
    "div",
    {
      role: s,
      className: `flex items-center w-full py-(--inset-5) px-(--space-30) gap-(--inline-4) ${e.bg} ${r}`,
      children: [
        o,
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: f,
            "aria-label": "Dismiss",
            className: "inline-flex shrink-0 items-center justify-center cursor-pointer bg-transparent p-0 rounded-(--radius-sm) text-(--icon-action-dismiss-inverse-idle) hover:text-(--icon-action-dismiss-inverse-hover) active:text-(--icon-action-dismiss-inverse-pressed) focus-visible:outline-2 focus-visible:outline-(--icon-action-dismiss-inverse-idle)",
            children: /* @__PURE__ */ i(a, { icon: v, size: "regular" })
          }
        )
      ]
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      role: s,
      className: `inline-flex items-center justify-center max-w-full py-(--inset-3) px-(--inset-7) rounded-(--radius-sm) ${e.bg} ${r}`,
      children: o
    }
  );
}
export {
  N as Alert
};
