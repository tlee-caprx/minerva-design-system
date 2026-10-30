import { jsx as e } from "react/jsx-runtime";
// src/components/ui/Divider/Divider.tsx
function t({ orientation: t = "horizontal", className: n = "" }) {
	let r = t === "horizontal";
	return /* @__PURE__ */ e("div", {
		role: "separator",
		"aria-orientation": t,
		className: `shrink-0 ${r ? "w-full" : "self-stretch"} ${n}`,
		style: r ? { borderBottom: "var(--space-1) solid var(--border-surface-base)" } : { borderRight: "var(--space-1) solid var(--border-surface-base)" }
	});
}
export { t as Divider };
