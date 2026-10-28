import { jsxs as k, Fragment as E, jsx as c } from "react/jsx-runtime";
import { useState as b, useRef as g, useId as D, useLayoutEffect as x, useEffect as h } from "react";
import { createPortal as R } from "react-dom";
import { Button as L } from "../Button/Button.js";
import { Icon as A } from "../Icon/Icon.js";
import { EllipsisVerticalIcon as I } from "../Icon/icons/ellipsis-vertical.js";
import { MenuPanel as S } from "../Dropdown/MenuPanel.js";
import { MenuItem as z } from "../Dropdown/MenuItem.js";
function N({ actions: y, label: f = "Row actions" }) {
  const [o, m] = b(!1), [s, p] = b(null), u = g(null), a = g(null), v = D(), l = (e) => {
    var t;
    m(!1), p(null), e && ((t = u.current) == null || t.focus());
  };
  return x(() => {
    var r, i;
    if (!o) return;
    const e = (r = u.current) == null ? void 0 : r.getBoundingClientRect(), t = (i = a.current) == null ? void 0 : i.getBoundingClientRect();
    if (!e || !t) return;
    const n = e.bottom + t.height <= window.innerHeight;
    p(
      n ? { top: e.bottom, left: e.right, transform: "translateX(-100%)" } : { top: e.top, left: e.right, transform: "translate(-100%, -100%)" }
    );
  }, [o]), h(() => {
    var e, t;
    s && ((t = (e = a.current) == null ? void 0 : e.querySelector('[role="menuitem"]:not(:disabled)')) == null || t.focus({ preventScroll: !0 }));
  }, [s]), h(() => {
    if (!o) return;
    const e = (n) => {
      var i, d;
      const r = n.target;
      !((i = a.current) != null && i.contains(r)) && !((d = u.current) != null && d.contains(r)) && l(!1);
    }, t = (n) => {
      var r;
      n.target instanceof Node && ((r = a.current) != null && r.contains(n.target)) || l(!1);
    };
    return document.addEventListener("pointerdown", e), window.addEventListener("scroll", t, !0), window.addEventListener("resize", t), () => {
      document.removeEventListener("pointerdown", e), window.removeEventListener("scroll", t, !0), window.removeEventListener("resize", t);
    };
  }, [o]), /* @__PURE__ */ k(E, { children: [
    /* @__PURE__ */ c(
      L,
      {
        ref: u,
        variant: "tertiary",
        iconOnly: !0,
        "aria-label": f,
        "aria-haspopup": "menu",
        "aria-expanded": o,
        "aria-controls": o ? v : void 0,
        onClick: () => o ? l(!1) : m(!0),
        children: /* @__PURE__ */ c(A, { icon: I, size: "regular" })
      }
    ),
    o && R(
      /* @__PURE__ */ c(
        "div",
        {
          ref: a,
          id: v,
          role: "menu",
          "aria-label": f,
          onKeyDown: (e) => {
            var i;
            const t = Array.from(((i = a.current) == null ? void 0 : i.querySelectorAll('[role="menuitem"]:not(:disabled)')) ?? []), n = t.indexOf(document.activeElement), r = (d) => {
              var w;
              return (w = t[(d + t.length) % t.length]) == null ? void 0 : w.focus({ preventScroll: !0 });
            };
            switch (e.key) {
              case "ArrowDown":
                e.preventDefault(), r(n + 1);
                break;
              case "ArrowUp":
                e.preventDefault(), r(n - 1);
                break;
              case "Home":
                e.preventDefault(), r(0);
                break;
              case "End":
                e.preventDefault(), r(t.length - 1);
                break;
              case "Escape":
                e.preventDefault(), l(!0);
                break;
              case "Tab":
                l(!1);
                break;
            }
          },
          className: `fixed w-max ${(s == null ? void 0 : s.transform) === "translateX(-100%)" ? "pt-(--stack-1)" : "pb-(--stack-1)"}`,
          style: {
            ...s ?? { top: 0, left: 0 },
            visibility: s ? "visible" : "hidden",
            minWidth: "calc(var(--space-40) * 4)",
            zIndex: 9e3
          },
          children: /* @__PURE__ */ c(S, { children: y.map((e) => /* @__PURE__ */ c(
            z,
            {
              role: "menuitem",
              label: e.label,
              destructive: e.destructive,
              disabled: e.disabled,
              onClick: () => {
                l(!0), e.onClick();
              }
            },
            e.label
          )) })
        }
      ),
      document.body
    )
  ] });
}
export {
  N as TableRowActions
};
