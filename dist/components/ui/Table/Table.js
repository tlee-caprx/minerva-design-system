import { jsxs as S, jsx as e, Fragment as N } from "react/jsx-runtime";
import { useRef as p, useState as v, useEffect as E, useContext as R, Children as W, createContext as g } from "react";
const h = g("body");
function L({
  children: l,
  stickyFirstColumn: r = !1,
  paginationTop: o,
  paginationBottom: c,
  className: b = ""
}) {
  const a = p(null), n = p(null), [i, d] = v(!1), [m, s] = v(!1), [y, w] = v(), f = () => {
    const t = a.current;
    t && (d(t.scrollLeft > 0), s(t.scrollLeft < t.scrollWidth - t.clientWidth - 1), w(t.clientWidth));
  };
  return E(() => {
    const t = a.current, x = n.current;
    if (!t || !x) return;
    f();
    const u = new ResizeObserver(f);
    return u.observe(t), u.observe(x), () => u.disconnect();
  }, []), /* @__PURE__ */ S(
    "div",
    {
      className: `minerva-table-frame flex flex-col max-w-full rounded-(--radius-sm) overflow-hidden ${b}`,
      style: { border: "var(--space-1) solid var(--border-surface-base)" },
      children: [
        o,
        o && /* @__PURE__ */ e("div", { className: "h-(--space-1) bg-(--border-surface-base)" }),
        /* @__PURE__ */ e(
          "div",
          {
            ref: a,
            onScroll: f,
            className: "w-full overflow-x-auto",
            style: y ? { "--table-visible-width": `${y}px` } : void 0,
            children: /* @__PURE__ */ e(
              "table",
              {
                ref: n,
                className: "minerva-table",
                "data-sticky-first": r || void 0,
                "data-scrolled-start": i || void 0,
                "data-scrolled-end": m || void 0,
                children: l
              }
            )
          }
        ),
        c && /* @__PURE__ */ e("div", { className: "h-(--space-1) bg-(--border-surface-base)" }),
        c
      ]
    }
  );
}
function P({ children: l, ...r }) {
  return /* @__PURE__ */ e(h.Provider, { value: "head", children: /* @__PURE__ */ e("thead", { ...r, children: l }) });
}
function $({ children: l, ...r }) {
  return /* @__PURE__ */ e(h.Provider, { value: "body", children: /* @__PURE__ */ e("tbody", { ...r, children: l }) });
}
function k({ children: l, onClick: r, detail: o, expanded: c = !1, className: b = "", onKeyDown: a, ...n }) {
  const i = R(h), d = i === "body" && !!r;
  return /* @__PURE__ */ S(N, { children: [
    /* @__PURE__ */ e(
      "tr",
      {
        ...n,
        "data-row": "",
        "data-clickable": d || void 0,
        "aria-expanded": i === "body" && o !== void 0 ? c : void 0,
        tabIndex: d ? 0 : void 0,
        onClick: d ? r : void 0,
        onKeyDown: (s) => {
          a == null || a(s), !(!d || s.target !== s.currentTarget) && (s.key === "Enter" || s.key === " ") && (s.preventDefault(), r == null || r());
        },
        className: [
          // Focus ring is drawn by the cells in table.css.
          d ? "cursor-pointer" : "",
          b
        ].join(" "),
        children: l
      }
    ),
    i === "body" && c && o !== void 0 && /* @__PURE__ */ e("tr", { "data-detail": "", children: /* @__PURE__ */ e("td", { colSpan: W.toArray(l).length, className: "p-0", children: /* @__PURE__ */ e("div", { className: "sticky left-0 w-(--table-visible-width) p-(--inset-5)", children: o }) }) })
  ] });
}
export {
  L as Table,
  $ as TableBody,
  P as TableHeader,
  k as TableRow
};
