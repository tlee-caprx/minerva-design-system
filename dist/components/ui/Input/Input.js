import { FieldWrapper as e } from "../FieldWrapper/FieldWrapper.js";
import { forwardRef as t, useId as n } from "react";
import { jsx as r } from "react/jsx-runtime";
// src/components/ui/Input/Input.tsx
var i = t(function({ label: t, required: i = !1, tooltip: a, instructions: o, invalid: s = !1, leftIcon: c, rightIcon: l, disabled: u = !1, readOnly: d = !1, className: f = "", id: p, ...m }, h) {
	let g = n(), _ = p ?? g;
	return /* @__PURE__ */ r(e, {
		inputId: _,
		label: t,
		required: i,
		tooltip: a,
		instructions: o,
		invalid: s,
		disabled: u,
		readOnly: d,
		leftIcon: c,
		rightIcon: l,
		children: /* @__PURE__ */ r("input", {
			id: _,
			ref: h,
			disabled: u,
			readOnly: d,
			className: [
				"flex-1 min-w-0 w-full",
				"bg-transparent outline-none",
				d ? "caret-transparent cursor-default" : "",
				u ? "cursor-not-allowed" : "",
				f
			].filter(Boolean).join(" "),
			style: {
				fontSize: "var(--body-md-size)",
				lineHeight: "var(--body-md-line-height)",
				fontWeight: "var(--body-md-weight)",
				color: "var(--text-control-value)"
			},
			...m
		})
	});
});
export { i as Input };
