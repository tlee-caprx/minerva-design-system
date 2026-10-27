import { jsx as a } from "react/jsx-runtime";
import { Children as s, isValidElement as l } from "react";
function f({ children: t, className: i = "", onClickCapture: n }) {
  const r = s.toArray(t), o = r.length > 0 && r.every(
    (e) => l(e) && e.props.variant === "tertiary"
  );
  return /* @__PURE__ */ a(
    "div",
    {
      onClickCapture: n,
      className: `flex items-center ${o ? "gap-(--inline-4)" : "gap-(--inline-2)"} ${i}`,
      children: t
    }
  );
}
export {
  f as ButtonGroup
};
