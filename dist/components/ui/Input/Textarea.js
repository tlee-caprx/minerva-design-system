import { FieldWrapper as e } from "../FieldWrapper/FieldWrapper.js";
import { forwardRef as t, useId as n } from "react";
import { jsx as r } from "react/jsx-runtime";
// src/components/ui/Input/Textarea.tsx
var i = t(function({ label: t, required: i = !1, tooltip: a, instructions: o, invalid: s = !1, disabled: c = !1, readOnly: l = !1, className: u = "", id: d, rows: f = 4, ...p }, m) {
	let h = n(), g = d ?? h;
	return /* @__PURE__ */ r(e, {
		inputId: g,
		label: t,
		required: i,
		tooltip: a,
		instructions: o,
		invalid: s,
		disabled: c,
		readOnly: l,
		children: /* @__PURE__ */ r("textarea", {
			id: g,
			ref: m,
			rows: f,
			disabled: c,
			readOnly: l,
			className: [
				"flex-1 min-w-0 w-full resize-none",
				"bg-transparent outline-none",
				l ? "caret-transparent cursor-default" : "",
				c ? "cursor-not-allowed" : "",
				u
			].filter(Boolean).join(" "),
			style: {
				fontSize: "var(--body-md-size)",
				lineHeight: "var(--body-md-line-height)",
				fontWeight: "var(--body-md-weight)",
				color: "var(--text-control-value)"
			},
			...p
		})
	});
});
export { i as Textarea };
