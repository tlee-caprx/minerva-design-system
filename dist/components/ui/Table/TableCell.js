import { jsx as t, jsxs as x, Fragment as b } from "react/jsx-runtime";
import { useRef as A, useState as I, useLayoutEffect as S } from "react";
import { Tooltip as _ } from "../Tooltip/Tooltip.js";
import { Text as p } from "../Text/Text.js";
const g = ["text", "link", "date", "number", "money"], w = ["text", "date", "number", "money"], C = ["link", "action", "checkbox", "radio", "expand"];
function L(l) {
  const e = A(null), [n, s] = I(!1);
  return S(() => {
    const o = e.current;
    if (!l || !o) return;
    const a = () => {
      const d = Array.from(o.querySelectorAll("[data-truncate]"));
      s(d.some((c) => c.scrollWidth > c.clientWidth));
    };
    a();
    const i = new ResizeObserver(a);
    return i.observe(o), () => i.disconnect();
  }), [e, n];
}
function Y(l) {
  const { type: e, children: n, subtext: s, color: o, maxWidth: a, className: i = "", style: d, onClick: c, ...h } = l, T = g.includes(e), y = w.includes(e), v = C.includes(e), r = a !== void 0, [E, N] = L(r), k = (f) => {
    v && f.stopPropagation(), c == null || c(f);
  }, u = r ? "block truncate" : "whitespace-nowrap", m = /* @__PURE__ */ x(b, { children: [
    y ? /* @__PURE__ */ t(p, { variant: "body-md", "data-truncate": r || void 0, className: u, style: { color: o ?? "var(--text-surface-base)" }, children: n }) : n,
    s && /* @__PURE__ */ t(p, { variant: "body-sm", "data-truncate": r || void 0, className: `text-(--text-surface-base) ${u}`, children: s })
  ] });
  return /* @__PURE__ */ t(
    "td",
    {
      ...h,
      "data-type": e,
      onClick: k,
      style: d,
      className: `py-(--inset-3) px-(--inset-5) align-middle ${i}`,
      children: /* @__PURE__ */ t(
        "div",
        {
          className: `flex flex-col justify-center ${T ? "items-start" : "items-center"}`,
          style: r ? { maxWidth: a } : void 0,
          children: r ? /* @__PURE__ */ t(
            _,
            {
              disabled: !N,
              content: s ? /* @__PURE__ */ x(b, { children: [
                n,
                /* @__PURE__ */ t("br", {}),
                s
              ] }) : n,
              children: /* @__PURE__ */ t("span", { ref: E, className: "block min-w-0", children: m })
            }
          ) : m
        }
      )
    }
  );
}
export {
  Y as TableCell
};
