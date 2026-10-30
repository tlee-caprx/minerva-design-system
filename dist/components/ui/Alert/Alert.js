import { CheckCircleIcon as e } from "../Icon/icons/check-circle.js";
import { Icon as t } from "../Icon/Icon.js";
import { InfoCircleIcon as n } from "../Icon/icons/info-circle.js";
import { WarningCircleIcon as r } from "../Icon/icons/warning-circle.js";
import { XCircleIcon as i } from "../Icon/icons/x-circle.js";
import { XCloseIcon as a } from "../Icon/icons/x-close.js";
import { Text as o } from "../Text/Text.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
// src/components/ui/Alert/Alert.tsx
var l = {
	success: {
		icon: e,
		bg: "bg-(--bg-feedback-success-muted)",
		text: "text-(--text-feedback-success-inverse)",
		iconColor: "text-(--icon-feedback-success-inverse)"
	},
	warning: {
		icon: r,
		bg: "bg-(--bg-feedback-warning-muted)",
		text: "text-(--text-feedback-warning-inverse)",
		iconColor: "text-(--icon-feedback-warning-inverse)"
	},
	error: {
		icon: i,
		bg: "bg-(--bg-feedback-error-muted)",
		text: "text-(--text-feedback-error-inverse)",
		iconColor: "text-(--icon-feedback-error-inverse)"
	},
	general: {
		icon: n,
		bg: "bg-(--bg-feedback-informational-muted)",
		text: "text-(--text-feedback-informational-inverse)",
		iconColor: "text-(--icon-feedback-informational-inverse)"
	}
};
function u({ type: e, variant: n, children: r, onClose: i, className: u = "" }) {
	let d = l[e], f = n === "banner", p = /* @__PURE__ */ c("div", {
		className: `flex items-center justify-center gap-(--inline-2) min-w-0 ${f ? "flex-1" : ""}`,
		children: [/* @__PURE__ */ s(t, {
			icon: d.icon,
			size: "regular",
			className: `shrink-0 ${d.iconColor}`
		}), /* @__PURE__ */ s(o, {
			variant: f ? "banner-text" : "toast-text",
			className: `min-w-0 text-center ${d.text}`,
			children: r
		})]
	}), m = e === "error" || e === "warning" ? "alert" : "status";
	return f ? /* @__PURE__ */ c("div", {
		role: m,
		className: `flex items-center w-full py-(--inset-5) px-(--space-30) gap-(--inline-4) ${d.bg} ${u}`,
		children: [p, /* @__PURE__ */ s("button", {
			type: "button",
			onClick: i,
			"aria-label": "Dismiss",
			className: "inline-flex shrink-0 items-center justify-center cursor-pointer bg-transparent p-0 rounded-(--radius-sm) text-(--icon-action-dismiss-inverse-idle) hover:text-(--icon-action-dismiss-inverse-hover) active:text-(--icon-action-dismiss-inverse-pressed) focus-visible:outline-2 focus-visible:outline-(--icon-action-dismiss-inverse-idle)",
			children: /* @__PURE__ */ s(t, {
				icon: a,
				size: "regular"
			})
		})]
	}) : /* @__PURE__ */ s("div", {
		role: m,
		className: `inline-flex items-center justify-center max-w-full py-(--inset-3) px-(--inset-7) rounded-(--radius-sm) ${d.bg} ${u}`,
		children: p
	});
}
export { u as Alert };
