import { jsxs as x, jsx as s } from "react/jsx-runtime";
import { useState as h, useRef as y, useId as v } from "react";
import { createPortal as w } from "react-dom";
import { Text as B } from "../Text/Text.js";
const N = {
  top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
};
function S({ content: a, beak: o = "bottom", id: n, className: l = "" }) {
  return /* @__PURE__ */ x(
    "span",
    {
      role: "tooltip",
      id: n,
      className: [
        "relative inline-block w-max max-w-[240px]",
        "px-(--inset-5) py-(--inset-3)",
        "rounded-(--radius-sm) bg-(--bg-surface-inverse)",
        l
      ].join(" "),
      children: [
        o !== "none" && /* @__PURE__ */ s(
          "span",
          {
            "aria-hidden": "true",
            className: `absolute w-(--space-8) h-(--space-8) rotate-45 bg-(--bg-surface-inverse) ${N[o]}`
          }
        ),
        /* @__PURE__ */ s(B, { as: "span", variant: "body-sm", className: "relative text-(--text-surface-inverse)", children: a })
      ]
    }
  );
}
const r = 8;
function E({ content: a, beak: o = "bottom", children: n, className: l = "" }) {
  const [i, c] = h(!1), [f, g] = h(null), p = y(null), d = v(), m = () => {
    var b;
    const t = (b = p.current) == null ? void 0 : b.getBoundingClientRect();
    if (!t) return;
    const e = { position: "fixed" };
    switch (o) {
      case "top":
        e.top = t.bottom + r, e.left = t.left + t.width / 2, e.transform = "translateX(-50%)";
        break;
      case "left":
        e.top = t.top + t.height / 2, e.left = t.right + r, e.transform = "translateY(-50%)";
        break;
      case "right":
        e.top = t.top + t.height / 2, e.left = t.left - r, e.transform = "translate(-100%, -50%)";
        break;
      case "bottom":
      case "none":
      default:
        e.top = t.top - r, e.left = t.left + t.width / 2, e.transform = "translate(-50%, -100%)";
        break;
    }
    g(e), c(!0);
  }, u = () => c(!1);
  return /* @__PURE__ */ x(
    "span",
    {
      ref: p,
      className: "inline-flex",
      onMouseEnter: m,
      onMouseLeave: u,
      onFocus: m,
      onBlur: u,
      children: [
        /* @__PURE__ */ s("span", { "aria-describedby": i ? d : void 0, children: n }),
        i && f && w(
          // Arbitrary max z-index (beyond Tailwind's z-50 ceiling, which the
          // sidebar/header also use) — a tooltip must always paint above
          // everything else on the page, no matter what.
          /* @__PURE__ */ s("span", { style: { ...f, zIndex: 9999 }, children: /* @__PURE__ */ s(S, { content: a, beak: o, id: d, className: l }) }),
          document.body
        )
      ]
    }
  );
}
export {
  E as Tooltip,
  S as TooltipBubble
};
