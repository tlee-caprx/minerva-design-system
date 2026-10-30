import { Dropdown as e } from "./Dropdown.js";
import { MenuItem as t } from "./MenuItem.js";
import { Badge as n } from "../Badge/Badge.js";
import { Button as r } from "../Button/Button.js";
import { Children as i, cloneElement as a, isValidElement as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
// src/components/ui/Dropdown/MultiSelectDropdown.tsx
function d({ children: d, onChange: f, ...p }) {
	let [m, h] = s([]), g = (e) => {
		h(e), f?.(e);
	}, _ = (e) => {
		g(m.includes(e) ? m.filter((t) => t !== e) : [...m, e]);
	}, v = i.map(d, (e) => !o(e) || e.type !== t ? e : a(e, {
		checkbox: !0,
		selected: m.includes(e.props.label),
		onClick: (t) => {
			e.props.onClick?.(t), _(e.props.label);
		}
	}));
	return /* @__PURE__ */ u("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ l(e, {
			...p,
			children: v
		}), m.length > 0 && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("div", {
			className: "flex flex-wrap gap-(--inline-1) mt-(--stack-2)",
			children: m.map((e) => /* @__PURE__ */ l(n, {
				onClose: () => _(e),
				children: e
			}, e))
		}), /* @__PURE__ */ l(r, {
			variant: "tertiary",
			className: "self-start mt-(--stack-1)",
			onClick: () => g([]),
			children: "Clear All"
		})] })]
	});
}
export { d as MultiSelectDropdown };
