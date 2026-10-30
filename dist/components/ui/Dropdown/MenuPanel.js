import { jsx as e, jsxs as t } from "react/jsx-runtime";
// src/components/ui/Dropdown/MenuPanel.tsx
var n = "calc((var(--inset-3) * 2 + var(--menu-item-line-height)) * 5)";
function r({ searchBar: r, children: i, className: a = "" }) {
	return /* @__PURE__ */ t("div", {
		className: `flex flex-col w-full p-(--space-1) rounded-(--radius-sm) bg-(--bg-surface-base) overflow-hidden ${a}`,
		style: {
			border: "var(--space-1) solid var(--border-surface-inverse)",
			boxShadow: "var(--shadow-surface-md)"
		},
		children: [r, /* @__PURE__ */ e("div", {
			className: "overflow-y-auto",
			style: { maxHeight: n },
			children: i
		})]
	});
}
export { r as MenuPanel };
