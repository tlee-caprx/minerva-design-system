import { Icon as e } from "../../ui/Icon/Icon.js";
import { ChevronRightIcon as t } from "../../ui/Icon/icons/chevron-right.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
// src/components/navigation/Breadcrumb/Breadcrumb.tsx
var i = {
	fontSize: "var(--breadcrumb-label-size)",
	lineHeight: "var(--breadcrumb-label-line-height)",
	fontWeight: "var(--breadcrumb-label-weight)"
};
function a({ items: a, className: o = "" }) {
	return /* @__PURE__ */ n("nav", {
		"aria-label": "Breadcrumb",
		className: o,
		children: /* @__PURE__ */ n("ol", {
			className: "flex items-center gap-(--inline-2)",
			children: a.map((o, s) => {
				let c = s === a.length - 1;
				return /* @__PURE__ */ r("li", {
					className: "flex items-center gap-(--inline-2)",
					children: [s > 0 && /* @__PURE__ */ n(e, {
						icon: t,
						size: "small",
						className: "text-(--text-navigation-link) shrink-0"
					}), c ? /* @__PURE__ */ n("span", {
						"aria-current": "page",
						className: "text-(--text-navigation-link) cursor-default",
						style: i,
						children: o.label
					}) : /* @__PURE__ */ n("a", {
						href: o.href ?? "/",
						className: "text-(--text-navigation-link) no-underline hover:underline focus-visible:underline outline-none",
						style: i,
						children: o.label
					})]
				}, s);
			})
		})
	});
}
export { a as Breadcrumb };
