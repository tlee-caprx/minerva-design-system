import { jsxs as _, jsx as t } from "react/jsx-runtime";
import { isValidElement as g, useRef as D, useState as k, useEffect as G, cloneElement as A } from "react";
const P = "sticky left-0 z-10", Y = "sticky right-0 z-10", V = "shadow-[var(--shadow-table-outer-right)]", q = "shadow-[var(--shadow-table-outer-left)]", J = { borderRight: "var(--space-1) solid var(--border-surface-base)" }, M = { borderLeft: "var(--space-1) solid var(--border-surface-base)" };
function z(c, l) {
  return [c.props.className ?? "", l].filter(Boolean).join(" ");
}
function X({
  columns: c,
  header: l,
  rows: i,
  stickyFirstColumn: f = !1,
  onRowClick: a,
  paginationTop: m,
  paginationBottom: y,
  className: B = ""
}) {
  var L;
  const O = typeof c == "number" ? `repeat(${c}, 1fr)` : c, u = l.length, p = u - 1, R = i.length + 2, S = (L = i[0]) == null ? void 0 : L[p], v = g(S) && S.props.type === "action", h = D(null), $ = D(null), [j, H] = k(!1), [K, W] = k(!1), b = () => {
    const s = h.current;
    s && (H(s.scrollLeft > 0), W(s.scrollLeft < s.scrollWidth - s.clientWidth - 1));
  };
  G(() => {
    const s = h.current, e = $.current;
    if (!s || !e) return;
    b();
    const o = new ResizeObserver(b);
    return o.observe(s), o.observe(e), () => o.disconnect();
  }, [c, l.length, i.length]);
  const N = (s) => {
    const e = [];
    return f && s === 0 && e.push(P), v && s === p && e.push(Y), e.join(" ");
  }, E = (s) => {
    let e;
    return f && s === 0 && (e = { ...e, ...J }), v && s === p && (e = { ...e, ...M }), e;
  };
  return /* @__PURE__ */ _(
    "div",
    {
      className: `flex flex-col w-full rounded-(--radius-sm) overflow-hidden ${B}`,
      style: { border: "var(--space-1) solid var(--border-surface-base)" },
      children: [
        m,
        m && /* @__PURE__ */ t("div", { className: "h-(--space-1) bg-(--border-surface-base)" }),
        /* @__PURE__ */ t("div", { ref: h, onScroll: b, className: "w-full overflow-x-auto", children: /* @__PURE__ */ _("div", { ref: $, role: "table", className: "grid gap-(--space-1) bg-(--border-surface-base)", style: { gridTemplateColumns: O }, children: [
          f && /* @__PURE__ */ t(
            "div",
            {
              "aria-hidden": "true",
              className: `sticky left-0 z-20 pointer-events-none ${j ? V : ""}`,
              style: { gridColumn: "1 / 2", gridRow: `1 / ${R}` }
            }
          ),
          v && /* @__PURE__ */ t(
            "div",
            {
              "aria-hidden": "true",
              className: `sticky right-0 z-20 pointer-events-none ${K ? q : ""}`,
              style: { gridColumn: `${u} / ${u + 1}`, gridRow: `1 / ${R}` }
            }
          ),
          /* @__PURE__ */ t("div", { role: "row", className: "contents", children: l.map((s, e) => {
            const o = { gridColumn: `${e + 1} / ${e + 2}`, gridRow: "1 / 2" };
            if (!g(s))
              return /* @__PURE__ */ t("div", { style: o, children: s }, e);
            const d = N(e);
            return A(s, {
              key: e,
              className: d ? z(s, d) : s.props.className,
              style: {
                ...s.props.style,
                ...E(e),
                ...o
              }
            });
          }) }),
          i.map((s, e) => {
            const o = e % 2 === 0, d = `${e + 2} / ${e + 3}`, F = (r) => {
              a && (r.key === "Enter" || r.key === " ") && (r.preventDefault(), a(e));
            };
            return (
              // display:contents keeps these cells as direct grid items (so
              // the column template still applies to them) while still
              // giving the row a real DOM node to hang the click handler and
              // `group` hover scope on. role="row" survives display:contents
              // in modern browsers, but a display:contents element generates
              // no box, so it can never itself receive focus — that's why
              // keyboard activation below is wired to the first real cell
              // instead of this wrapper.
              /* @__PURE__ */ t(
                "div",
                {
                  role: "row",
                  className: `contents group ${a ? "cursor-pointer" : ""}`,
                  onClick: a ? () => a(e) : void 0,
                  children: s.map((r, n) => {
                    const C = { gridColumn: `${n + 1} / ${n + 2}`, gridRow: d };
                    if (!g(r))
                      return /* @__PURE__ */ t("div", { style: C, children: r }, n);
                    const T = N(n), w = !!a && n === 0;
                    return A(r, {
                      key: n,
                      odd: o,
                      hoverable: !!a,
                      tabIndex: w ? 0 : void 0,
                      onKeyDown: w ? F : void 0,
                      className: T ? z(r, T) : r.props.className,
                      style: {
                        ...r.props.style,
                        ...E(n),
                        ...C
                      }
                    });
                  })
                },
                e
              )
            );
          })
        ] }) }),
        y && /* @__PURE__ */ t("div", { className: "h-(--space-1) bg-(--border-surface-base)" }),
        y
      ]
    }
  );
}
export {
  X as Table
};
