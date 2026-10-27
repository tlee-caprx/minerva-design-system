import { jsxs as m, jsx as r, Fragment as u } from "react/jsx-runtime";
import { useState as x, Children as k, isValidElement as N, cloneElement as S } from "react";
import { Dropdown as v } from "./Dropdown.js";
import { MenuItem as w } from "./MenuItem.js";
import { Badge as y } from "../Badge/Badge.js";
import { Button as C } from "../Button/Button.js";
function M({ children: p, onChange: o, ...d }) {
  const [t, a] = x([]), s = (e) => {
    a(e), o == null || o(e);
  }, n = (e) => {
    s(
      t.includes(e) ? t.filter((l) => l !== e) : [...t, e]
    );
  }, f = k.map(p, (e) => !N(e) || e.type !== w ? e : S(e, {
    checkbox: !0,
    selected: t.includes(e.props.label),
    onClick: (l) => {
      var i, c;
      (c = (i = e.props).onClick) == null || c.call(i, l), n(e.props.label);
    }
  }));
  return /* @__PURE__ */ m("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ r(v, { ...d, children: f }),
    t.length > 0 && /* @__PURE__ */ m(u, { children: [
      /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-(--inline-1) mt-(--stack-2)", children: t.map((e) => /* @__PURE__ */ r(y, { onClose: () => n(e), children: e }, e)) }),
      /* @__PURE__ */ r(C, { variant: "tertiary", className: "self-start mt-(--stack-1)", onClick: () => s([]), children: "Clear All" })
    ] })
  ] });
}
export {
  M as MultiSelectDropdown
};
