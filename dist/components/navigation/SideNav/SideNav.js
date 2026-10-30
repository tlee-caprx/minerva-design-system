import { Button as e } from "../../ui/Button/Button.js";
import { Icon as t } from "../../ui/Icon/Icon.js";
import { MenuBarsIcon as n } from "../../ui/Icon/icons/menu-bars.js";
import { XCloseIcon as r } from "../../ui/Icon/icons/x-close.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
// src/components/navigation/SideNav/SideNav.tsx
function s({ isOpen: s, onToggle: c, children: l, className: u = "" }) {
	return /* @__PURE__ */ a("aside", {
		className: `flex flex-col shrink-0 h-full bg-(--bg-surface-base) ${u}`,
		style: {
			width: s ? "var(--sidenav-width-expanded)" : void 0,
			borderRight: "var(--space-1) solid var(--border-surface-base)",
			transition: "width 0.2s ease"
		},
		children: s ? /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("div", {
			className: "flex justify-end shrink-0 px-(--inset-7) pt-(--inset-7)",
			children: /* @__PURE__ */ a(e, {
				variant: "tertiary",
				iconOnly: !0,
				onClick: c,
				"aria-label": "Close navigation",
				children: /* @__PURE__ */ a(t, {
					icon: r,
					size: "regular"
				})
			})
		}), l && /* @__PURE__ */ a("div", {
			className: "flex flex-col overflow-y-auto px-(--inset-7) pb-(--inset-7)",
			children: l
		})] }) : /* @__PURE__ */ a("div", {
			className: "flex justify-center pt-(--inset-7) px-(--inset-3)",
			children: /* @__PURE__ */ a(e, {
				variant: "tertiary",
				iconOnly: !0,
				onClick: c,
				"aria-label": "Open navigation",
				children: /* @__PURE__ */ a(t, {
					icon: n,
					size: "regular",
					className: "text-(--icon-action-secondary-idle)"
				})
			})
		})
	});
}
export { s as SideNav };
