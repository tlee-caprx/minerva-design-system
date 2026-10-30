import { Icon as e } from "../Icon/Icon.js";
import { InfoCircleIcon as t } from "../Icon/icons/info-circle.js";
import { SortIcon as n } from "../Icon/icons/sort.js";
import { Text as r } from "../Text/Text.js";
import { Tooltip as i } from "../Tooltip/Tooltip.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
// src/components/ui/Table/TableHead.tsx
function s({ children: s, tooltip: c, sortable: l = !1, sortDirection: u, onSort: d, align: f = "left", grow: p = !1, className: m = "", style: h, ...g }) {
	let _ = (e) => {
		l && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), d?.());
	}, v = (e) => e.stopPropagation();
	return /* @__PURE__ */ a("th", {
		...g,
		scope: "col",
		"data-grow": p || void 0,
		tabIndex: l ? 0 : void 0,
		"aria-sort": l ? u === "asc" ? "ascending" : u === "desc" ? "descending" : "none" : void 0,
		onClick: l ? d : void 0,
		onKeyDown: _,
		style: h,
		className: [
			"p-(--inset-5) align-middle font-[inherit]",
			l ? "cursor-pointer outline-none hover:bg-(--bg-control-subtle-hover) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--border-control-default-focus)" : "",
			m
		].join(" "),
		children: /* @__PURE__ */ o("div", {
			className: `flex items-center gap-(--inline-1) ${f === "center" ? "justify-center" : ""}`,
			children: [
				typeof s == "string" || typeof s == "number" ? /* @__PURE__ */ a(r, {
					variant: "body-md",
					weight: "semibold",
					className: "text-(--text-surface-base) whitespace-nowrap",
					children: s
				}) : s,
				c && /* @__PURE__ */ a(i, {
					content: c,
					children: /* @__PURE__ */ a("span", {
						tabIndex: 0,
						onClick: v,
						children: /* @__PURE__ */ a(e, {
							icon: t,
							size: "small",
							className: "text-(--icon-surface-base)"
						})
					})
				}),
				l && /* @__PURE__ */ a(n, {
					direction: u,
					width: 14,
					height: 14,
					className: "shrink-0"
				})
			]
		})
	});
}
export { s as TableHead };
