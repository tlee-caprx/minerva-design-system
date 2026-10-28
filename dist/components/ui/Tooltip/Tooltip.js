import { jsxs as x, jsx as s } from "react/jsx-runtime";
import { useState as h, useRef as v, useId as w } from "react";
import { createPortal as N } from "react-dom";
import { Text as B } from "../Text/Text.js";
const S = {
  top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
};
function j({ content: n, beak: o = "bottom", id: r, className: l = "" }) {
  return /* @__PURE__ */ x(
    "span",
    {
      role: "tooltip",
      id: r,
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
            className: `absolute w-(--space-8) h-(--space-8) rotate-45 bg-(--bg-surface-inverse) ${S[o]}`
          }
        ),
        /* @__PURE__ */ s(B, { as: "span", variant: "body-sm", className: "relative text-(--text-surface-inverse)", children: n })
      ]
    }
  );
}
const a = 8;
function I({ content: n, beak: o = "bottom", disabled: r = !1, children: l, className: g = "" }) {
  const [i, c] = h(!1), [f, y] = h(null), p = v(null), m = w(), u = () => {
    var b;
    if (r) return;
    const t = (b = p.current) == null ? void 0 : b.getBoundingClientRect();
    if (!t) return;
    const e = { position: "fixed" };
    switch (o) {
      case "top":
        e.top = t.bottom + a, e.left = t.left + t.width / 2, e.transform = "translateX(-50%)";
        break;
      case "left":
        e.top = t.top + t.height / 2, e.left = t.right + a, e.transform = "translateY(-50%)";
        break;
      case "right":
        e.top = t.top + t.height / 2, e.left = t.left - a, e.transform = "translate(-100%, -50%)";
        break;
      case "bottom":
      case "none":
      default:
        e.top = t.top - a, e.left = t.left + t.width / 2, e.transform = "translate(-50%, -100%)";
        break;
    }
    y(e), c(!0);
  }, d = () => c(!1);
  return /* @__PURE__ */ x(
    "span",
    {
      ref: p,
      className: "inline-flex max-w-full",
      onMouseEnter: u,
      onMouseLeave: d,
      onFocus: u,
      onBlur: d,
      children: [
        /* @__PURE__ */ s("span", { className: "min-w-0", "aria-describedby": i ? m : void 0, children: l }),
        i && !r && f && N(
          // Arbitrary max z-index (beyond Tailwind's z-50 ceiling, which the
          // sidebar/header also use) — a tooltip must always paint above
          // everything else on the page, no matter what.
          /* @__PURE__ */ s("span", { style: { ...f, zIndex: 9999 }, children: /* @__PURE__ */ s(j, { content: n, beak: o, id: m, className: g }) }),
          document.body
        )
      ]
    }
  );
}
export {
  I as Tooltip,
  j as TooltipBubble
};
