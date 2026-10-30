import { Icon as e } from "../../ui/Icon/Icon.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
// src/components/navigation/SideNav/SideNavItem.tsx
var i = {
	fontSize: "var(--menu-item-lg-size)",
	lineHeight: "var(--menu-item-lg-line-height)",
	fontWeight: "var(--menu-item-lg-weight)"
};
function a({ label: a, href: o, onClick: s, active: c = !1, lozenge: l, icon: u, compact: d = !1, className: f = "" }) {
	let p = [
		"flex items-center w-full no-underline rounded-(--radius-sm) cursor-pointer border-0",
		d ? "justify-center p-(--inset-3)" : "justify-between py-(--inset-3) px-(--inset-2) text-left",
		c ? "bg-(--bg-navigation-item-primary-active) text-(--text-navigation-item-primary-active)" : "bg-(--bg-navigation-item-primary-idle) hover:bg-(--bg-navigation-item-primary-hover) text-(--text-navigation-item-primary-idle) hover:text-(--text-navigation-item-primary-hover)",
		f
	].filter(Boolean).join(" "), m = d ? /* @__PURE__ */ r(t, { children: [u && /* @__PURE__ */ n(e, {
		icon: u,
		size: "regular",
		className: "shrink-0"
	}), /* @__PURE__ */ n("span", {
		className: "sr-only",
		children: a
	})] }) : /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ r("span", {
		className: "flex min-w-0 items-center gap-(--inline-2)",
		children: [u && /* @__PURE__ */ n(e, {
			icon: u,
			size: "regular",
			className: "shrink-0"
		}), /* @__PURE__ */ n("span", { children: a })]
	}), l && /* @__PURE__ */ n("span", {
		className: "shrink-0",
		children: l
	})] });
	return o ? /* @__PURE__ */ n("a", {
		href: o,
		className: p,
		style: i,
		"aria-current": c ? "page" : void 0,
		children: m
	}) : /* @__PURE__ */ n("button", {
		onClick: s,
		className: p,
		style: i,
		"aria-label": d ? a : void 0,
		"aria-pressed": d ? c : void 0,
		children: m
	});
}
export { a as SideNavItem };
