import { jsx as r } from "react/jsx-runtime";
import { forwardRef as h, useId as v } from "react";
import { FieldWrapper as w } from "../FieldWrapper/FieldWrapper.js";
const y = h(function({
  label: n,
  required: i = !1,
  tooltip: a,
  instructions: l,
  invalid: f = !1,
  leftIcon: s,
  rightIcon: u,
  disabled: t = !1,
  readOnly: e = !1,
  className: p = "",
  id: c,
  ...m
}, d) {
  const g = v(), o = c ?? g;
  return /* @__PURE__ */ r(
    w,
    {
      inputId: o,
      label: n,
      required: i,
      tooltip: a,
      instructions: l,
      invalid: f,
      disabled: t,
      readOnly: e,
      leftIcon: s,
      rightIcon: u,
      children: /* @__PURE__ */ r(
        "input",
        {
          id: o,
          ref: d,
          disabled: t,
          readOnly: e,
          className: [
            "flex-1 min-w-0 w-full",
            "bg-transparent outline-none",
            e ? "caret-transparent cursor-default" : "",
            t ? "cursor-not-allowed" : "",
            p
          ].filter(Boolean).join(" "),
          style: {
            fontSize: "var(--body-md-size)",
            lineHeight: "var(--body-md-line-height)",
            fontWeight: "var(--body-md-weight)",
            color: "var(--text-control-value)"
          },
          ...m
        }
      )
    }
  );
});
export {
  y as Input
};
