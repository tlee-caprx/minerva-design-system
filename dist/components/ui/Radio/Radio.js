import { jsxs as p, jsx as r } from "react/jsx-runtime";
import { forwardRef as f } from "react";
import { Text as b } from "../Text/Text.js";
const m = f(function({
  label: l,
  padding: s = !1,
  disabled: o = !1,
  readOnly: e = !1,
  className: a = "",
  onClick: t,
  ...c
}, i) {
  const d = (n) => {
    e && n.preventDefault(), t == null || t(n);
  }, u = o ? "bg-(--bg-control-default-disabled) shadow-none" : e ? [
    "bg-(--bg-control-default-readonly)",
    "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]",
    "peer-checked:bg-(--bg-control-selected-readonly)"
  ].join(" ") : [
    "bg-(--bg-control-default-idle)",
    "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]",
    "group-hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)]",
    "peer-checked:bg-(--bg-control-selected-idle)",
    "peer-checked:shadow-none",
    "peer-checked:group-hover:bg-(--bg-control-selected-hover)"
  ].join(" ");
  return /* @__PURE__ */ p(
    "label",
    {
      className: [
        "group inline-flex items-center gap-(--inline-2)",
        o ? "cursor-not-allowed" : e ? "cursor-default" : "cursor-pointer",
        s ? "py-(--inset-3)" : "",
        a
      ].filter(Boolean).join(" "),
      children: [
        /* @__PURE__ */ r(
          "input",
          {
            ref: i,
            type: "radio",
            disabled: o,
            readOnly: e,
            "aria-readonly": e || void 0,
            onClick: d,
            className: "peer sr-only",
            ...c
          }
        ),
        /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: [
              "inline-flex items-center justify-center shrink-0",
              "w-(--space-18) h-(--space-18) rounded-(--radius-full)",
              "transition-colors duration-150",
              u,
              "peer-focus-visible:outline peer-focus-visible:outline-2",
              "peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--border-control-default-focus)",
              "peer-checked:[&>span]:scale-100"
            ].join(" "),
            children: !o && /* @__PURE__ */ r(
              "span",
              {
                className: [
                  "w-(--space-8) h-(--space-8) rounded-(--radius-full)",
                  e ? "bg-(--icon-control-selected-readonly)" : "bg-(--icon-control-selected-idle)",
                  "scale-0 transition-transform duration-150"
                ].join(" ")
              }
            )
          }
        ),
        l && /* @__PURE__ */ r(
          b,
          {
            as: "span",
            variant: "option-default",
            className: o ? "text-(--text-control-label-disabled)" : "text-(--text-control-label-idle)",
            children: l
          }
        )
      ]
    }
  );
});
export {
  m as Radio
};
