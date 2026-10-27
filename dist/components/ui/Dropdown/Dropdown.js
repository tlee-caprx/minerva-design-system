import { jsx as t, jsxs as F } from "react/jsx-runtime";
import { forwardRef as H, useId as K, useState as T, useRef as h, useEffect as V, Children as b, isValidElement as E, cloneElement as X } from "react";
import { MenuPanel as $ } from "./MenuPanel.js";
import { MenuItem as I } from "./MenuItem.js";
import { FieldWrapper as q } from "../FieldWrapper/FieldWrapper.js";
import { Icon as j } from "../Icon/Icon.js";
import { XCloseIcon as G } from "../Icon/icons/x-close.js";
import { ChevronDownIcon as J } from "../Icon/icons/chevron-down.js";
const oe = H(function({
  label: k,
  required: C = !1,
  tooltip: D,
  instructions: N,
  invalid: z = !1,
  disabled: n = !1,
  readOnly: a = !1,
  value: l,
  placeholder: L,
  onClear: v,
  onSelect: m,
  searchBar: M,
  children: c,
  className: R = "",
  id: P,
  onClick: d,
  ...W
}, u) {
  const A = K(), g = P ?? A, [s, f] = T(!1), p = h(null), x = h(null), w = () => {
    var e;
    n || a || (f((o) => !o), (e = p.current) == null || e.focus());
  };
  V(() => {
    if (!s) return;
    const e = (r) => {
      x.current && !x.current.contains(r.target) && f(!1);
    }, o = (r) => {
      var i;
      r.key === "Escape" && (f(!1), (i = p.current) == null || i.focus());
    };
    return document.addEventListener("mousedown", e), document.addEventListener("keydown", o), () => {
      document.removeEventListener("mousedown", e), document.removeEventListener("keydown", o);
    };
  }, [s]);
  const B = b.toArray(c).some(
    (e) => E(e) && e.type === I && e.props.checkbox
  ) ? c : b.map(c, (e) => !E(e) || e.type !== I ? e : X(e, {
    selected: e.props.label === l,
    onClick: (o) => {
      var r, i, y;
      (i = (r = e.props).onClick) == null || i.call(r, o), m == null || m(e.props.label), f(!1), (y = p.current) == null || y.focus();
    }
  }));
  return /* @__PURE__ */ t("div", { ref: x, children: /* @__PURE__ */ t(
    q,
    {
      inputId: g,
      label: k,
      required: C,
      tooltip: D,
      instructions: N,
      invalid: z,
      disabled: n,
      readOnly: a,
      panel: s && c ? /* @__PURE__ */ t($, { searchBar: M, children: B }) : void 0,
      rightIcon: /* @__PURE__ */ F("div", { className: "inline-flex items-center gap-(--inline-1)", children: [
        v && l && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation(), v();
            },
            "aria-label": "Clear selection",
            className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-control-default) hover:text-(--icon-control-strong)",
            children: /* @__PURE__ */ t(j, { icon: G, size: "small" })
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            onClick: w,
            className: [
              "inline-flex items-center justify-center",
              n ? "cursor-not-allowed" : a ? "cursor-default" : "cursor-pointer"
            ].join(" "),
            children: /* @__PURE__ */ t(
              j,
              {
                icon: J,
                size: "regular",
                className: `text-(--icon-control-default) transition-transform duration-150 ${s ? "rotate-180" : ""}`
              }
            )
          }
        )
      ] }),
      children: /* @__PURE__ */ t(
        "button",
        {
          id: g,
          ref: (e) => {
            p.current = e, typeof u == "function" ? u(e) : u && (u.current = e);
          },
          type: "button",
          disabled: n,
          "aria-haspopup": "listbox",
          "aria-expanded": s,
          onClick: (e) => {
            w(), d == null || d(e);
          },
          className: [
            "flex-1 min-w-0 w-full text-left",
            "bg-transparent outline-none",
            n ? "cursor-not-allowed" : a ? "cursor-default" : "cursor-pointer",
            R
          ].filter(Boolean).join(" "),
          style: {
            fontSize: "var(--body-md-size)",
            lineHeight: "var(--body-md-line-height)",
            fontWeight: "var(--body-md-weight)",
            color: n ? "var(--text-control-value-disabled)" : l ? "var(--text-control-value)" : "var(--text-control-placeholder)"
          },
          ...W,
          children: l || L
        }
      )
    }
  ) });
});
export {
  oe as Dropdown
};
