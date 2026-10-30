import { Text as e } from "../Text/Text.js";
import { jsx as t } from "react/jsx-runtime";
// src/components/ui/Lozenge/Lozenge.tsx
var n = {
	light: "bg-(--bg-surface-muted) text-(--text-surface-subtle)",
	dark: "bg-(--bg-surface-inverse) text-(--text-surface-inverse)"
};
function r({ count: r = 0, variant: i = "light", className: a = "" }) {
	return /* @__PURE__ */ t(e, {
		as: "span",
		variant: "label-md",
		className: `inline-flex items-center justify-center rounded-(--radius-full) px-(--inset-2) py-(--space-2) ${n[i]} ${a}`,
		children: r
	});
}
export { r as Lozenge };
