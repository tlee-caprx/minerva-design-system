import { Text as e } from "../Text/Text.js";
import { jsx as t } from "react/jsx-runtime";
// src/components/ui/Tag/Tag.tsx
var n = {
	info: {
		className: "bg-(--bg-surface-subtle) text-(--text-surface-subtle)",
		border: "1px solid var(--border-surface-base)"
	},
	"info-high-contrast": { className: "bg-(--bg-surface-accent-secondary) text-(--text-surface-inverse)" },
	success: { className: "bg-(--bg-feedback-success-base) text-(--text-feedback-success-inverse)" },
	warning: { className: "bg-(--bg-feedback-warning-base) text-(--text-feedback-warning-strong)" },
	error: { className: "bg-(--bg-feedback-error-base) text-(--text-feedback-error-inverse)" },
	system: { className: "bg-(--bg-feedback-informational-base) text-(--text-feedback-informational-inverse)" },
	"system-alt": { className: "bg-(--bg-surface-accent-primary) text-(--text-surface-inverse)" }
};
function r({ variant: r = "info", children: i, className: a = "" }) {
	let { className: o, border: s } = n[r];
	return /* @__PURE__ */ t(e, {
		as: "span",
		variant: "tag-label",
		title: typeof i == "string" ? i : void 0,
		className: `inline-flex items-center min-w-0 max-w-full whitespace-nowrap rounded-(--radius-sm) py-(--inset-1) px-(--inset-3) ${o} ${a}`,
		style: s ? { border: s } : void 0,
		children: /* @__PURE__ */ t("span", {
			className: "truncate",
			children: i
		})
	});
}
export { r as Tag };
