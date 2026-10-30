import { Text as e } from "../Text/Text.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
// src/components/ui/Radio/Radio.tsx
var i = t(function({ label: t, padding: i = !1, disabled: a = !1, readOnly: o = !1, className: s = "", onClick: c, ...l }, u) {
	let d = (e) => {
		o && e.preventDefault(), c?.(e);
	}, f = a ? "bg-(--bg-control-default-disabled) shadow-none" : o ? "bg-(--bg-control-default-readonly) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-readonly)] peer-checked:bg-(--bg-control-selected-readonly)" : "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)] group-hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)] peer-checked:bg-(--bg-control-selected-idle) peer-checked:shadow-none peer-checked:group-hover:bg-(--bg-control-selected-hover)";
	return /* @__PURE__ */ r("label", {
		className: [
			"group inline-flex items-center gap-(--inline-2)",
			a ? "cursor-not-allowed" : o ? "cursor-default" : "cursor-pointer",
			i ? "py-(--inset-3)" : "",
			s
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n("input", {
				ref: u,
				type: "radio",
				disabled: a,
				readOnly: o,
				"aria-readonly": o || void 0,
				onClick: d,
				className: "peer sr-only",
				...l
			}),
			/* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: [
					"inline-flex items-center justify-center shrink-0",
					"w-(--space-18) h-(--space-18) rounded-(--radius-full)",
					"transition-colors duration-150",
					f,
					"peer-focus-visible:outline peer-focus-visible:outline-2",
					"peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--border-control-default-focus)",
					"peer-checked:[&>span]:scale-100"
				].join(" "),
				children: !a && /* @__PURE__ */ n("span", { className: [
					"w-(--space-8) h-(--space-8) rounded-(--radius-full)",
					o ? "bg-(--icon-control-selected-readonly)" : "bg-(--icon-control-selected-idle)",
					"scale-0 transition-transform duration-150"
				].join(" ") })
			}),
			t && /* @__PURE__ */ n(e, {
				as: "span",
				variant: "option-default",
				className: a ? "text-(--text-control-label-disabled)" : "text-(--text-control-label-idle)",
				children: t
			})
		]
	});
});
export { i as Radio };
