import { jsxs as s, jsx as o } from "react/jsx-runtime";
const l = "calc((var(--inset-3) * 2 + var(--menu-item-line-height)) * 5)";
function i({ searchBar: e, children: r, className: a = "" }) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: `flex flex-col w-full p-(--space-1) rounded-(--radius-sm) bg-(--bg-surface-base) overflow-hidden ${a}`,
      style: {
        border: "var(--space-1) solid var(--border-surface-inverse)",
        boxShadow: "var(--shadow-surface-md)"
      },
      children: [
        e,
        /* @__PURE__ */ o("div", { className: "overflow-y-auto", style: { maxHeight: l }, children: r })
      ]
    }
  );
}
export {
  i as MenuPanel
};
