import { jsx as o } from "react/jsx-runtime";
import { forwardRef as x, useId as g } from "react";
import { FieldWrapper as h } from "../FieldWrapper/FieldWrapper.js";
const b = x(function({
  label: n,
  required: a = !1,
  tooltip: i,
  instructions: l,
  invalid: f = !1,
  disabled: e = !1,
  readOnly: t = !1,
  className: s = "",
  id: c,
  rows: m = 4,
  ...d
}, u) {
  const p = g(), r = c ?? p;
  return /* @__PURE__ */ o(
    h,
    {
      inputId: r,
      label: n,
      required: a,
      tooltip: i,
      instructions: l,
      invalid: f,
      disabled: e,
      readOnly: t,
      children: /* @__PURE__ */ o(
        "textarea",
        {
          id: r,
          ref: u,
          rows: m,
          disabled: e,
          readOnly: t,
          className: [
            "flex-1 min-w-0 w-full resize-none",
            "bg-transparent outline-none",
            t ? "caret-transparent cursor-default" : "",
            e ? "cursor-not-allowed" : "",
            s
          ].filter(Boolean).join(" "),
          style: {
            fontSize: "var(--body-md-size)",
            lineHeight: "var(--body-md-line-height)",
            fontWeight: "var(--body-md-weight)",
            color: "var(--text-control-value)"
          },
          ...d
        }
      )
    }
  );
});
export {
  b as Textarea
};
