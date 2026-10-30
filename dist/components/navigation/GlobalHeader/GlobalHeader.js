import { Button as e } from "../../ui/Button/Button.js";
import { Icon as t } from "../../ui/Icon/Icon.js";
import { MenuGridIcon as n } from "../../ui/Icon/icons/menu-grid.js";
import { MenuBarsIcon as r } from "../../ui/Icon/icons/menu-bars.js";
import { BellIcon as i } from "../../ui/Icon/icons/bell.js";
import { ChevronDownIcon as a } from "../../ui/Icon/icons/chevron-down.js";
import { MessageDotsIcon as o } from "../../ui/Icon/icons/message-dots.js";
import { SettingsIcon as s } from "../../ui/Icon/icons/settings.js";
import { judiLogoSrc as c } from "../../ui/Icon/icons/judi-logo.js";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
// src/components/navigation/GlobalHeader/GlobalHeader.tsx
function f({ variant: f = "minerva", logoSrc: p = c, logoIconSrc: m, logoAlt: h = "Judi", logoHref: g = "/", appName: _, onMenuClick: v, showMenuButton: y = !0, onNotificationsClick: b, headerActions: x, onAccountClick: S, accountLabel: C = "Account", onAiClick: w, onKeyboardClick: T, className: E = "" }) {
	let D = /* @__PURE__ */ d("a", {
		href: g,
		className: "flex items-center h-(--space-24)",
		children: [/* @__PURE__ */ u("img", {
			src: p,
			alt: h,
			className: `h-full w-auto ${m ? "hidden sm:block" : ""}`
		}), m && /* @__PURE__ */ u("img", {
			src: m,
			alt: h,
			className: "h-full w-auto block sm:hidden"
		})]
	});
	return /* @__PURE__ */ u("header", {
		className: `flex items-center px-(--inset-6) py-(--inset-4) ${E}`,
		style: {
			background: "var(--bg-navigation-bar)",
			borderBottom: "var(--space-1) solid var(--border-surface-base)"
		},
		children: f === "evolution" ? /* @__PURE__ */ d(l, { children: [
			/* @__PURE__ */ d("div", {
				className: "flex flex-1 items-center gap-(--inline-3)",
				children: [y && /* @__PURE__ */ u(e, {
					variant: "inverse",
					iconOnly: !0,
					onClick: v,
					"aria-label": "Open menu",
					children: /* @__PURE__ */ u(t, {
						icon: r,
						size: "regular"
					})
				}), _ && /* @__PURE__ */ u("span", {
					className: "text-(--text-surface-inverse)",
					style: {
						fontSize: "var(--global-header-module-title-size)",
						lineHeight: "var(--global-header-module-title-line-height)",
						fontWeight: "var(--global-header-module-title-weight)"
					},
					children: _
				})]
			}),
			D,
			/* @__PURE__ */ d("div", {
				className: "flex flex-1 items-center justify-end gap-(--inline-3)",
				children: [
					x,
					/* @__PURE__ */ u(e, {
						variant: "inverse",
						iconOnly: !0,
						onClick: b,
						"aria-label": "Notifications",
						children: /* @__PURE__ */ u(t, {
							icon: i,
							size: "regular"
						})
					}),
					/* @__PURE__ */ u(e, {
						variant: "inverse",
						iconOnly: !0,
						onClick: w,
						"aria-label": "AI assistant",
						children: /* @__PURE__ */ u(t, {
							icon: o,
							size: "regular"
						})
					}),
					/* @__PURE__ */ u(e, {
						variant: "inverse",
						iconOnly: !0,
						onClick: T,
						"aria-label": "Keyboard shortcuts",
						children: /* @__PURE__ */ u(t, {
							icon: s,
							size: "regular"
						})
					})
				]
			})
		] }) : /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ d("div", {
			className: "flex flex-1 items-center gap-(--inline-4)",
			children: [
				y && /* @__PURE__ */ u(e, {
					variant: "inverse",
					iconOnly: !0,
					onClick: v,
					"aria-label": "Open menu",
					children: /* @__PURE__ */ u(t, {
						icon: n,
						size: "regular"
					})
				}),
				D,
				_ && /* @__PURE__ */ u("span", {
					className: "text-(--text-surface-inverse)",
					style: {
						fontSize: "var(--global-header-module-title-size)",
						lineHeight: "var(--global-header-module-title-line-height)",
						fontWeight: "var(--global-header-module-title-weight)"
					},
					children: _
				})
			]
		}), /* @__PURE__ */ d("div", {
			className: "flex items-center gap-(--inline-4)",
			children: [
				x,
				/* @__PURE__ */ u(e, {
					variant: "inverse",
					iconOnly: !0,
					onClick: b,
					"aria-label": "Notifications",
					children: /* @__PURE__ */ u(t, {
						icon: i,
						size: "regular"
					})
				}),
				/* @__PURE__ */ u(e, {
					variant: "inverse",
					rightIcon: a,
					onClick: S,
					children: C
				})
			]
		})] })
	});
}
export { f as GlobalHeader };
