import { jsx as e, jsxs as t } from "react/jsx-runtime";
// src/components/ui/Panel/Panel.tsx
var n = {
	default: "bg-(--bg-surface-base) shadow-(--shadow-surface-sm) after:content-[\"\"] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:shadow-[inset_0_0_0_var(--space-1)_var(--border-surface-base)]",
	nested: "bg-(--bg-surface-subtle)"
};
function r({ variant: r = "default", tabs: i, children: a, className: o = "", ...s }) {
	let c = `relative rounded-(--radius-sm) ${n[r]}`;
	return i ? /* @__PURE__ */ t("div", {
		...s,
		className: `${c} flex flex-col overflow-hidden ${o}`,
		children: [i, /* @__PURE__ */ e("div", {
			className: "p-(--inset-7)",
			children: a
		})]
	}) : /* @__PURE__ */ e("div", {
		...s,
		className: `${c} p-(--inset-7) ${o}`,
		children: a
	});
}
export { r as Panel };
