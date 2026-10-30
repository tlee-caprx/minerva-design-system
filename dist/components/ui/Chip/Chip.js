import { Text as e } from "../Text/Text.js";
import { jsx as t } from "react/jsx-runtime";
// src/components/ui/Chip/Chip.tsx
function n({ children: n, selected: r = !1, className: i = "", ...a }) {
	return /* @__PURE__ */ t("button", {
		type: "button",
		"aria-pressed": r,
		className: [
			"inline-flex items-center justify-center shrink-0",
			"py-(--inset-1) px-(--inset-5)",
			"rounded-(--radius-full)",
			"cursor-pointer transition-colors duration-150",
			"outline-none focus-visible:outline focus-visible:outline-2",
			"focus-visible:outline-offset-2 focus-visible:outline-(--border-control-default-focus)",
			r ? "bg-(--bg-control-inverse-idle) hover:bg-(--bg-control-inverse-hover) text-(--text-surface-inverse)" : "bg-(--bg-surface-base) text-(--text-surface-subtle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)] hover:bg-(--bg-surface-subtle) hover:text-(--text-surface-base) hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-emphasis)]",
			i
		].filter(Boolean).join(" "),
		...a,
		children: /* @__PURE__ */ t(e, {
			as: "span",
			variant: "body-sm",
			children: n
		})
	});
}
export { n as Chip };
