import { jsx as o } from "react/jsx-runtime";
function t({ children: e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      role: "tablist",
      className: "flex overflow-hidden px-(--inset-5) bg-(--bg-navigation-item-secondary-idle) w-full",
      style: { boxShadow: "inset 0 -2px 0 var(--border-surface-base)" },
      children: e
    }
  );
}
export {
  t as TabSet
};
