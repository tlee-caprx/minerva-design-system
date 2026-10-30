import { Icon as e } from "../Icon/Icon.js";
import { CheckMarkIcon as t } from "../Icon/icons/check-mark.js";
import { Text as n } from "../Text/Text.js";
import { forwardRef as r, useEffect as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
// src/components/ui/Checkbox/Checkbox.tsx
var c = r(function({ label: r, padding: c = !1, indeterminate: l = !1, readOnly: u = !1, disabled: d = !1, error: f = !1, errorMessage: p = "Required", onClick: m, className: h = "", ...g }, _) {
	let v = a(null);
	i(() => {
		v.current && (v.current.indeterminate = !d && l);
	}, [l, d]);
	let y = (e) => {
		u && e.preventDefault(), m?.(e);
	}, b = d ? "bg-(--bg-control-default-disabled) shadow-none" : f ? "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-feedback-error-base)] peer-checked:bg-(--bg-control-selected-idle) peer-checked:shadow-none" : u ? "bg-(--bg-control-default-readonly) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)]" : l ? "bg-(--bg-control-selected-idle) group-hover:bg-(--bg-control-selected-hover) shadow-none" : "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)] group-hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)] peer-checked:bg-(--bg-control-selected-idle) peer-checked:shadow-none peer-checked:group-hover:bg-(--bg-control-selected-hover) peer-checked:group-hover:shadow-none", x = u ? "text-(--icon-control-selected-readonly)" : "text-(--icon-control-selected-idle)";
	return /* @__PURE__ */ s("div", {
		className: "flex flex-col gap-(--stack-1) [&:has(:checked)_.checkbox-error-message]:hidden",
		children: [/* @__PURE__ */ s("label", {
			className: [
				"group inline-flex items-center gap-(--inline-2)",
				d ? "cursor-not-allowed" : u ? "cursor-default" : "cursor-pointer",
				c ? "py-(--inset-3)" : "",
				h
			].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ o("input", {
					type: "checkbox",
					ref: (e) => {
						v.current = e, typeof _ == "function" ? _(e) : _ && (_.current = e);
					},
					disabled: d,
					readOnly: u,
					"aria-readonly": u || void 0,
					onClick: y,
					className: "peer sr-only",
					...g
				}),
				/* @__PURE__ */ o("span", {
					"aria-hidden": "true",
					className: [
						"inline-flex items-center justify-center shrink-0",
						"w-(--space-18) h-(--space-18)",
						"rounded-(--radius-sm)",
						"transition-colors duration-150",
						b,
						"peer-focus-visible:outline peer-focus-visible:outline-2",
						"peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--border-control-default-focus)",
						"[&>svg]:opacity-0 [&>svg]:transition-opacity [&>svg]:duration-150",
						"peer-checked:[&>svg]:opacity-100"
					].join(" "),
					children: !d && (l ? /* @__PURE__ */ o("span", { className: `w-(--space-12) h-(--space-2) rounded-(--radius-sm) ${u ? "bg-(--icon-control-selected-readonly)" : "bg-(--icon-control-selected-idle)"}` }) : /* @__PURE__ */ o(e, {
						icon: t,
						size: "small",
						className: x
					}))
				}),
				r && /* @__PURE__ */ o(n, {
					as: "span",
					variant: "option-default",
					className: d ? "text-(--text-control-label-disabled)" : "text-(--text-surface-base)",
					children: r
				})
			]
		}), f && !d && /* @__PURE__ */ o(n, {
			as: "span",
			variant: "body-sm",
			className: "checkbox-error-message text-(--text-feedback-error-base)",
			children: p
		})]
	});
});
export { c as Checkbox };
