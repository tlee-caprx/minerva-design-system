import { jsxs as l, jsx as e } from "react/jsx-runtime";
import { Text as t } from "../Text/Text.js";
import { Tooltip as u } from "../Tooltip/Tooltip.js";
import { Icon as v } from "../Icon/Icon.js";
import { InfoCircleIcon as b } from "../Icon/icons/info-circle.js";
function y({
  inputId: d,
  label: o,
  required: f = !1,
  tooltip: n,
  instructions: r,
  invalid: a = !1,
  disabled: m = !1,
  readOnly: h = !1,
  leftIcon: s,
  rightIcon: i,
  panel: c,
  flush: _ = !1,
  children: p
}) {
  return /* @__PURE__ */ l("div", { className: "flex flex-col gap-(--stack-1)", children: [
    o && /* @__PURE__ */ l("div", { className: "inline-flex items-center gap-(--inline-1)", children: [
      /* @__PURE__ */ l("label", { htmlFor: d, children: [
        /* @__PURE__ */ e(t, { as: "span", variant: "label-md", className: "text-(--text-control-label-idle)", children: o }),
        f && /* @__PURE__ */ e(t, { as: "span", variant: "label-md", className: "text-(--text-control-label-idle)", children: " *" })
      ] }),
      n && /* @__PURE__ */ e(u, { content: n, children: /* @__PURE__ */ e("span", { tabIndex: 0, children: /* @__PURE__ */ e(v, { icon: b, size: "small", className: "text-(--text-control-label-idle)" }) }) })
    ] }),
    /* @__PURE__ */ l(
      "div",
      {
        className: [
          _ ? "relative flex flex-col items-stretch overflow-hidden" : "relative flex items-center py-(--inset-3) px-(--inset-3) gap-(--inline-2)",
          "rounded-(--radius-sm)",
          "transition-colors duration-150",
          m ? "bg-(--bg-control-default-disabled) shadow-none cursor-not-allowed" : a ? [
            "bg-(--bg-control-default-invalid)",
            // No glow, no hover/focus variance — the error signal stays put.
            "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-critical-idle)]"
          ].join(" ") : h ? [
            "bg-(--bg-control-default-readonly)",
            "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]"
          ].join(" ") : [
            "bg-(--bg-control-default-idle)",
            "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]",
            "hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)]",
            "focus-within:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]",
            // Focus must win over hover when both apply — hover: and focus-within: are
            // equal specificity, so without this, hovering a focused field could clear
            // the focus glow depending on Tailwind's generated rule order.
            "focus-within:hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]"
          ].join(" ")
        ].filter(Boolean).join(" "),
        children: [
          s && /* @__PURE__ */ e("span", { className: "shrink-0 inline-flex items-center justify-center", children: s }),
          p,
          i && /* @__PURE__ */ e("span", { className: "shrink-0 inline-flex items-center justify-center", children: i }),
          c && // left-0 + right-0 forces this to span the box's exact width, so
          // whatever's inside (MenuPanel) can just be w-full and automatically
          // match the trigger — no measuring/JS needed.
          /* @__PURE__ */ e("div", { className: "absolute left-0 right-0 top-full z-50 mt-(--stack-1)", children: c })
        ]
      }
    ),
    (r || a) && /* @__PURE__ */ e(
      t,
      {
        as: "span",
        variant: "body-sm",
        className: a ? "text-(--text-feedback-error-base)" : "text-(--text-control-instructions)",
        children: a ? r ?? "Invalid input" : r
      }
    )
  ] });
}
export {
  y as FieldWrapper
};
