import { Icon as e } from "../Icon/Icon.js";
import { InfoCircleIcon as t } from "../Icon/icons/info-circle.js";
import { XCircleIcon as n } from "../Icon/icons/x-circle.js";
import { WarningCircleIcon as r } from "../Icon/icons/warning-circle.js";
import { CheckCircleIcon as i } from "../Icon/icons/check-circle.js";
import { Text as a } from "../Text/Text.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
// src/components/ui/Message/Message.tsx
var c = {
	informational: t,
	error: n,
	warning: r,
	success: i
}, l = {
	informational: {
		bg: "bg-(--bg-feedback-informational-inverse)",
		border: "var(--border-feedback-informational-muted)",
		icon: "text-(--icon-feedback-informational-base)"
	},
	error: {
		bg: "bg-(--bg-feedback-error-inverse)",
		border: "var(--border-feedback-error-muted)",
		icon: "text-(--icon-feedback-error-base)"
	},
	warning: {
		bg: "bg-(--bg-feedback-warning-inverse)",
		border: "var(--border-feedback-warning-muted)",
		icon: "text-(--icon-feedback-warning-base)"
	},
	success: {
		bg: "bg-(--bg-feedback-success-inverse)",
		border: "var(--border-feedback-success-muted)",
		icon: "text-(--icon-feedback-success-base)"
	}
};
function u({ variant: t, icon: n, ai: r = !1, header: i, children: u, action: d, className: f = "" }) {
	let p = l[t], m = n ?? c[t];
	return /* @__PURE__ */ s("div", {
		className: `flex items-start gap-(--inline-2) p-(--inset-6) rounded-(--radius-sm) ${p.bg} ${f}`,
		style: {
			border: `var(--space-1) solid ${p.border}`,
			backgroundImage: r ? "var(--gradient-ai-default)" : void 0
		},
		children: [
			/* @__PURE__ */ o(e, {
				icon: m,
				size: "regular",
				className: `shrink-0 ${p.icon}`
			}),
			/* @__PURE__ */ s("div", {
				className: "flex-1 min-w-0 flex flex-col gap-(--stack-2)",
				children: [i && /* @__PURE__ */ o(a, {
					variant: "body-md",
					weight: "semibold",
					className: "text-(--text-surface-base)",
					children: i
				}), /* @__PURE__ */ o(a, {
					variant: "body-md",
					className: "text-(--text-surface-subtle)",
					children: u
				})]
			}),
			d && /* @__PURE__ */ o("div", {
				className: "shrink-0",
				children: d
			})
		]
	});
}
export { u as Message };
