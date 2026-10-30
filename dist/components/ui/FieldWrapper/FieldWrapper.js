import { Icon as e } from "../Icon/Icon.js";
import { InfoCircleIcon as t } from "../Icon/icons/info-circle.js";
import { Text as n } from "../Text/Text.js";
import { Tooltip as r } from "../Tooltip/Tooltip.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
// src/components/ui/FieldWrapper/FieldWrapper.tsx
function o({ inputId: o, label: s, required: c = !1, tooltip: l, instructions: u, invalid: d = !1, disabled: f = !1, readOnly: p = !1, leftIcon: m, rightIcon: h, panel: g, flush: _ = !1, children: v }) {
	return /* @__PURE__ */ a("div", {
		className: "flex flex-col gap-(--stack-1)",
		children: [
			s && /* @__PURE__ */ a("div", {
				className: "inline-flex items-center gap-(--inline-1)",
				children: [/* @__PURE__ */ a("label", {
					htmlFor: o,
					children: [/* @__PURE__ */ i(n, {
						as: "span",
						variant: "label-md",
						className: "text-(--text-control-label-idle)",
						children: s
					}), c && /* @__PURE__ */ i(n, {
						as: "span",
						variant: "label-md",
						className: "text-(--text-control-label-idle)",
						children: " *"
					})]
				}), l && /* @__PURE__ */ i(r, {
					content: l,
					children: /* @__PURE__ */ i("span", {
						tabIndex: 0,
						children: /* @__PURE__ */ i(e, {
							icon: t,
							size: "small",
							className: "text-(--text-control-label-idle)"
						})
					})
				})]
			}),
			/* @__PURE__ */ a("div", {
				className: [
					_ ? "relative flex flex-col items-stretch overflow-hidden" : "relative flex items-center py-(--inset-3) px-(--inset-3) gap-(--inline-2)",
					"rounded-(--radius-sm)",
					"transition-colors duration-150",
					f ? "bg-(--bg-control-default-disabled) shadow-none cursor-not-allowed" : d ? "bg-(--bg-control-default-invalid) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-critical-idle)]" : p ? "bg-(--bg-control-default-readonly) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]" : "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)] hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)] focus-within:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)] focus-within:hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]"
				].filter(Boolean).join(" "),
				children: [
					m && /* @__PURE__ */ i("span", {
						className: "shrink-0 inline-flex items-center justify-center",
						children: m
					}),
					v,
					h && /* @__PURE__ */ i("span", {
						className: "shrink-0 inline-flex items-center justify-center",
						children: h
					}),
					g && /* @__PURE__ */ i("div", {
						className: "absolute left-0 right-0 top-full z-50 mt-(--stack-1)",
						children: g
					})
				]
			}),
			(u || d) && /* @__PURE__ */ i(n, {
				as: "span",
				variant: "body-sm",
				className: d ? "text-(--text-feedback-error-base)" : "text-(--text-control-instructions)",
				children: d ? u ?? "Invalid input" : u
			})
		]
	});
}
export { o as FieldWrapper };
