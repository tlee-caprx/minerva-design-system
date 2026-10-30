import { Text as e } from "../Text/Text.js";
import { useId as t, useRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { createPortal as o } from "react-dom";
// src/components/ui/Tooltip/Tooltip.tsx
var s = {
	top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
	bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
	left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
	right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
};
function c({ content: t, beak: n = "bottom", id: r, className: o = "" }) {
	return /* @__PURE__ */ a("span", {
		role: "tooltip",
		id: r,
		className: [
			"relative inline-block w-max max-w-[240px]",
			"px-(--inset-5) py-(--inset-3)",
			"rounded-(--radius-sm) bg-(--bg-surface-inverse)",
			o
		].join(" "),
		children: [n !== "none" && /* @__PURE__ */ i("span", {
			"aria-hidden": "true",
			className: `absolute w-(--space-8) h-(--space-8) rotate-45 bg-(--bg-surface-inverse) ${s[n]}`
		}), /* @__PURE__ */ i(e, {
			as: "span",
			variant: "body-sm",
			className: "relative text-(--text-surface-inverse)",
			children: t
		})]
	});
}
var l = 8;
function u({ content: e, beak: s = "bottom", disabled: u = !1, children: d, className: f = "" }) {
	let [p, m] = r(!1), [h, g] = r(null), _ = n(null), v = t(), y = () => {
		if (u) return;
		let e = _.current?.getBoundingClientRect();
		if (!e) return;
		let t = { position: "fixed" };
		switch (s) {
			case "top":
				t.top = e.bottom + l, t.left = e.left + e.width / 2, t.transform = "translateX(-50%)";
				break;
			case "left":
				t.top = e.top + e.height / 2, t.left = e.right + l, t.transform = "translateY(-50%)";
				break;
			case "right":
				t.top = e.top + e.height / 2, t.left = e.left - l, t.transform = "translate(-100%, -50%)";
				break;
			default: t.top = e.top - l, t.left = e.left + e.width / 2, t.transform = "translate(-50%, -100%)";
		}
		g(t), m(!0);
	}, b = () => m(!1);
	return /* @__PURE__ */ a("span", {
		ref: _,
		className: "inline-flex max-w-full",
		onMouseEnter: y,
		onMouseLeave: b,
		onFocus: y,
		onBlur: b,
		children: [/* @__PURE__ */ i("span", {
			className: "flex min-w-0",
			"aria-describedby": p ? v : void 0,
			children: d
		}), p && !u && h && o(/* @__PURE__ */ i("span", {
			style: {
				...h,
				zIndex: 9999
			},
			children: /* @__PURE__ */ i(c, {
				content: e,
				beak: s,
				id: v,
				className: f
			})
		}), document.body)]
	});
}
export { u as Tooltip, c as TooltipBubble };
