import { jsx as e } from "react/jsx-runtime";
// src/components/ui/Dropdown/MenuGroup.tsx
function t({ label: t, className: n = "" }) {
	return /* @__PURE__ */ e("div", {
		className: `w-full py-(--inset-1) px-(--inset-5) bg-(--bg-surface-base) ${n}`,
		children: /* @__PURE__ */ e("span", {
			className: "uppercase text-(--text-surface-base)",
			style: {
				fontSize: "var(--label-lg-size)",
				lineHeight: "var(--space-18)",
				fontWeight: "var(--label-lg-weight)",
				letterSpacing: "var(--space-1)"
			},
			children: t
		})
	});
}
export { t as MenuGroup };
