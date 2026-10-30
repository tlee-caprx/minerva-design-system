import { jsx as e } from "react/jsx-runtime";
// src/components/ui/TabSet/TabSet.tsx
function t({ children: t }) {
	return /* @__PURE__ */ e("div", {
		role: "tablist",
		className: "flex overflow-hidden px-(--inset-5) bg-(--bg-navigation-item-secondary-idle) w-full",
		style: { boxShadow: "inset 0 -2px 0 var(--border-surface-base)" },
		children: t
	});
}
export { t as TabSet };
