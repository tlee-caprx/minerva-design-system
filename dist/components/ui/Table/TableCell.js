import { Text as e } from "../Text/Text.js";
import { Tooltip as t } from "../Tooltip/Tooltip.js";
import { useLayoutEffect as n, useRef as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
// src/components/ui/Table/TableCell.tsx
var c = [
	"text",
	"link",
	"date",
	"number",
	"money"
], l = [
	"text",
	"date",
	"number",
	"money"
], u = [
	"link",
	"action",
	"checkbox",
	"radio",
	"expand"
];
function d(e) {
	let t = r(null), [a, o] = i(!1);
	return n(() => {
		let n = t.current;
		if (!e || !n) return;
		let r = () => {
			let e = Array.from(n.querySelectorAll("[data-truncate]"));
			o(e.some((e) => e.scrollWidth > e.clientWidth));
		};
		r();
		let i = new ResizeObserver(r);
		return i.observe(n), () => i.disconnect();
	}), [t, a];
}
function f(n) {
	let { type: r, children: i, subtext: f, color: p, maxWidth: m, className: h = "", style: g, onClick: _, ...v } = n, y = c.includes(r), b = l.includes(r), x = u.includes(r), S = m !== void 0, [C, w] = d(S), T = (e) => {
		x && e.stopPropagation(), _?.(e);
	}, E = S ? "block truncate" : "whitespace-nowrap", D = /* @__PURE__ */ s(a, { children: [b ? /* @__PURE__ */ o(e, {
		variant: "body-md",
		"data-truncate": S || void 0,
		className: E,
		style: { color: p ?? "var(--text-surface-base)" },
		children: i
	}) : i, f && /* @__PURE__ */ o(e, {
		variant: "body-sm",
		"data-truncate": S || void 0,
		className: `text-(--text-surface-base) ${E}`,
		children: f
	})] });
	return /* @__PURE__ */ o("td", {
		...v,
		"data-type": r,
		onClick: T,
		style: g,
		className: `py-(--inset-3) px-(--inset-5) align-middle ${h}`,
		children: /* @__PURE__ */ o("div", {
			className: `flex flex-col justify-center ${y ? "items-start" : "items-center"}`,
			style: S ? { maxWidth: m } : void 0,
			children: S ? /* @__PURE__ */ o(t, {
				disabled: !w,
				content: f ? /* @__PURE__ */ s(a, { children: [
					i,
					/* @__PURE__ */ o("br", {}),
					f
				] }) : i,
				children: /* @__PURE__ */ o("span", {
					ref: C,
					className: "block min-w-0",
					children: D
				})
			}) : D
		})
	});
}
export { f as TableCell };
