import { jsx as t, jsxs as y, Fragment as h } from "react/jsx-runtime";
import { Text as i } from "../Text/Text.js";
const p = ["text", "link", "date", "number", "money"], E = ["text", "date", "number", "money"], N = ["link", "action"];
function I(e) {
  const { type: s, odd: l = !1, hoverable: r = !1, children: n, className: d = "", style: b, tabIndex: u, onKeyDown: m } = e, o = "subtext" in e ? e.subtext : void 0, x = "color" in e ? e.color : void 0, f = p.includes(s), T = E.includes(s), c = N.includes(s), g = c ? (v) => v.stopPropagation() : void 0, a = /* @__PURE__ */ y(h, { children: [
    T ? /* @__PURE__ */ t(i, { variant: "body-md", className: "whitespace-nowrap", style: { color: x ?? "var(--text-surface-base)" }, children: n }) : n,
    o && /* @__PURE__ */ t(i, { variant: "body-sm", className: "text-(--text-surface-base) whitespace-nowrap", children: o })
  ] });
  return /* @__PURE__ */ t(
    "div",
    {
      role: "cell",
      style: b,
      tabIndex: u,
      onKeyDown: m,
      className: [
        "flex flex-col justify-center",
        f ? "items-start" : "items-center",
        "py-(--inset-3) px-(--inset-5)",
        l ? "bg-(--bg-surface-subtle)" : "bg-(--bg-surface-base)",
        r ? "group-hover:bg-(--bg-surface-muted)" : "",
        d
      ].join(" "),
      children: c ? /* @__PURE__ */ t("span", { onClick: g, className: "contents", children: a }) : a
    }
  );
}
export {
  I as TableCell
};
