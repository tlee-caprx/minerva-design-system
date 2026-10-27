import { jsx as i, jsxs as o } from "react/jsx-runtime";
import { Fragment as l } from "react";
import { Icon as c } from "../Icon/Icon.js";
import { ChevronRightIcon as m } from "../Icon/icons/chevron-right.js";
import { Button as r } from "../Button/Button.js";
function d({ steps: n, className: t = "" }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: `flex items-center gap-(--inline-2) px-(--inset-7) py-(--inset-3) bg-(--bg-surface-subtle) ${t}`,
      children: n.map((e, a) => /* @__PURE__ */ o(l, { children: [
        a > 0 && /* @__PURE__ */ i(
          c,
          {
            icon: m,
            size: "small",
            className: "text-(--icon-surface-base) shrink-0"
          }
        ),
        e.active ? /* @__PURE__ */ i(r, { variant: "tertiary", onClick: e.onClick, children: e.label }) : /* @__PURE__ */ i("div", { className: "opacity-30 pointer-events-none", children: /* @__PURE__ */ i(r, { variant: "tertiary", children: e.label }) })
      ] }, e.label))
    }
  );
}
export {
  d as Steps
};
