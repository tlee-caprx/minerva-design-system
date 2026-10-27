import { jsx as e, jsxs as a, Fragment as g } from "react/jsx-runtime";
import { Icon as d } from "../../ui/Icon/Icon.js";
const h = {
  fontSize: "var(--menu-item-lg-size)",
  lineHeight: "var(--menu-item-lg-line-height)",
  fontWeight: "var(--menu-item-lg-weight)"
};
function y({
  label: r,
  href: s,
  onClick: p,
  active: n = !1,
  lozenge: l,
  icon: i,
  compact: t = !1,
  className: c = ""
}) {
  const m = [
    "flex items-center w-full no-underline rounded-(--radius-sm) cursor-pointer border-0",
    t ? "justify-center p-(--inset-3)" : "justify-between py-(--inset-3) px-(--inset-2) text-left",
    n ? "bg-(--bg-navigation-item-primary-active) text-(--text-navigation-item-primary-active)" : "bg-(--bg-navigation-item-primary-idle) hover:bg-(--bg-navigation-item-primary-hover) text-(--text-navigation-item-primary-idle) hover:text-(--text-navigation-item-primary-hover)",
    c
  ].filter(Boolean).join(" "), o = t ? /* @__PURE__ */ a(g, { children: [
    i && /* @__PURE__ */ e(d, { icon: i, size: "regular", className: "shrink-0" }),
    /* @__PURE__ */ e("span", { className: "sr-only", children: r })
  ] }) : /* @__PURE__ */ a(g, { children: [
    /* @__PURE__ */ a("span", { className: "flex min-w-0 items-center gap-(--inline-2)", children: [
      i && /* @__PURE__ */ e(d, { icon: i, size: "regular", className: "shrink-0" }),
      /* @__PURE__ */ e("span", { children: r })
    ] }),
    l && /* @__PURE__ */ e("span", { className: "shrink-0", children: l })
  ] });
  return s ? /* @__PURE__ */ e("a", { href: s, className: m, style: h, "aria-current": n ? "page" : void 0, children: o }) : /* @__PURE__ */ e(
    "button",
    {
      onClick: p,
      className: m,
      style: h,
      "aria-label": t ? r : void 0,
      "aria-pressed": t ? n : void 0,
      children: o
    }
  );
}
export {
  y as SideNavItem
};
