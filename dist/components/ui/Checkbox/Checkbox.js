import { jsxs as d, jsx as s } from "react/jsx-runtime";
import { forwardRef as x, useRef as _, useEffect as k } from "react";
import { Icon as w } from "../Icon/Icon.js";
import { CheckMarkIcon as j } from "../Icon/icons/check-mark.js";
import { Text as u } from "../Text/Text.js";
const z = x(function({
  label: l,
  padding: f = !1,
  indeterminate: c = !1,
  readOnly: o = !1,
  disabled: e = !1,
  error: i = !1,
  errorMessage: p = "Required",
  onClick: n,
  className: h = "",
  ...b
}, t) {
  const a = _(null);
  k(() => {
    a.current && (a.current.indeterminate = !e && c);
  }, [c, e]);
  const g = (r) => {
    o && r.preventDefault(), n == null || n(r);
  }, v = e ? "bg-(--bg-control-default-disabled) shadow-none" : i ? [
    "bg-(--bg-control-default-idle)",
    "shadow-[inset_0_0_0_var(--space-1)_var(--border-feedback-error-base)]",
    // Checking the box satisfies the validation — error clears immediately.
    "peer-checked:bg-(--bg-control-selected-idle)",
    "peer-checked:shadow-none"
  ].join(" ") : o ? [
    "bg-(--bg-control-default-readonly)",
    "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]"
  ].join(" ") : c ? [
    "bg-(--bg-control-selected-idle)",
    "group-hover:bg-(--bg-control-selected-hover)",
    "shadow-none"
  ].join(" ") : [
    "bg-(--bg-control-default-idle)",
    "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]",
    "group-hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)]",
    "peer-checked:bg-(--bg-control-selected-idle)",
    "peer-checked:shadow-none",
    "peer-checked:group-hover:bg-(--bg-control-selected-hover)",
    "peer-checked:group-hover:shadow-none"
  ].join(" "), m = o ? "text-(--icon-control-selected-readonly)" : "text-(--icon-control-selected-idle)";
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-(--stack-1) [&:has(:checked)_.checkbox-error-message]:hidden", children: [
    /* @__PURE__ */ d(
      "label",
      {
        className: [
          "group inline-flex items-center gap-(--inline-2)",
          e ? "cursor-not-allowed" : o ? "cursor-default" : "cursor-pointer",
          f ? "py-(--inset-3)" : "",
          h
        ].filter(Boolean).join(" "),
        children: [
          /* @__PURE__ */ s(
            "input",
            {
              type: "checkbox",
              ref: (r) => {
                a.current = r, typeof t == "function" ? t(r) : t && (t.current = r);
              },
              disabled: e,
              readOnly: o,
              "aria-readonly": o || void 0,
              onClick: g,
              className: "peer sr-only",
              ...b
            }
          ),
          /* @__PURE__ */ s(
            "span",
            {
              "aria-hidden": "true",
              className: [
                "inline-flex items-center justify-center shrink-0",
                "w-(--space-18) h-(--space-18)",
                "rounded-(--radius-sm)",
                "transition-colors duration-150",
                v,
                // ─── Focus ──────────────────────────────────────────────────────
                "peer-focus-visible:outline peer-focus-visible:outline-2",
                "peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--border-control-default-focus)",
                // ─── Checkmark visibility (hidden until checked) ──────────────────
                "[&>svg]:opacity-0 [&>svg]:transition-opacity [&>svg]:duration-150",
                "peer-checked:[&>svg]:opacity-100"
              ].join(" "),
              children: !e && (c ? /* @__PURE__ */ s("span", { className: `w-(--space-12) h-(--space-2) rounded-(--radius-sm) ${o ? "bg-(--icon-control-selected-readonly)" : "bg-(--icon-control-selected-idle)"}` }) : /* @__PURE__ */ s(w, { icon: j, size: "small", className: m }))
            }
          ),
          l && /* @__PURE__ */ s(
            u,
            {
              as: "span",
              variant: "option-default",
              className: e ? "text-(--text-control-label-disabled)" : "text-(--text-surface-base)",
              children: l
            }
          )
        ]
      }
    ),
    i && !e && /* @__PURE__ */ s(u, { as: "span", variant: "body-sm", className: "checkbox-error-message text-(--text-feedback-error-base)", children: p })
  ] });
});
export {
  z as Checkbox
};
