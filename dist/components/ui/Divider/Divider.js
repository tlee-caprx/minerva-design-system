import { jsx as e } from "react/jsx-runtime";
function t({ orientation: r = "horizontal", className: a = "" }) {
  const o = r === "horizontal";
  return /* @__PURE__ */ e(
    "div",
    {
      role: "separator",
      "aria-orientation": r,
      className: `shrink-0 ${o ? "w-full" : "self-stretch"} ${a}`,
      style: o ? { borderBottom: "var(--space-1) solid var(--border-surface-base)" } : { borderRight: "var(--space-1) solid var(--border-surface-base)" }
    }
  );
}
export {
  t as Divider
};
