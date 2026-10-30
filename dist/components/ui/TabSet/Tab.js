import { jsx as e, jsxs as t } from "react/jsx-runtime";
// src/components/ui/TabSet/Tab.tsx
function n({ label: n, selected: r = !1, onClick: i, leftSlot: a, rightSlot: o }) {
	return /* @__PURE__ */ t("button", {
		type: "button",
		role: "tab",
		"aria-selected": r,
		onClick: i,
		className: "relative inline-flex items-center px-(--inset-1) py-(--inset-3) bg-(--bg-navigation-item-secondary-idle) cursor-pointer select-none whitespace-nowrap outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--border-navigation-primary-active)",
		style: {
			border: "none",
			boxShadow: "inset 0 -2px 0 var(--border-surface-base)"
		},
		children: [/* @__PURE__ */ e("span", {
			className: ["px-(--inline-2) py-(--inset-1) rounded-(--radius-sm) transition-colors duration-150", !r && "hover:bg-(--bg-navigation-item-secondary-hover)"].filter(Boolean).join(" "),
			children: /* @__PURE__ */ t("span", {
				className: "relative inline-flex items-center gap-(--inline-1)",
				children: [
					a,
					/* @__PURE__ */ e("span", {
						className: "text-(--text-navigation-item-secondary-idle)",
						style: {
							fontSize: "var(--menu-item-size)",
							lineHeight: "var(--menu-item-line-height)",
							fontWeight: "var(--menu-item-weight)"
						},
						children: n
					}),
					o
				]
			})
		}), r && /* @__PURE__ */ e("span", { className: "absolute bottom-0 left-0 right-0 h-[2px] bg-(--border-navigation-primary-active)" })]
	});
}
export { n as Tab };
