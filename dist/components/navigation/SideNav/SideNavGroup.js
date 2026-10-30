import { jsx as e } from "react/jsx-runtime";
// src/components/navigation/SideNav/SideNavGroup.tsx
function t({ label: t, className: n = "" }) {
	return /* @__PURE__ */ e("span", {
		className: `text-(--text-surface-base) uppercase ${n}`,
		style: {
			fontSize: "var(--label-lg-size)",
			lineHeight: "var(--space-18)",
			fontWeight: "var(--label-lg-weight)",
			letterSpacing: "var(--space-1)"
		},
		children: t
	});
}
export { t as SideNavGroup };
