import { GlobalHeader as e } from "../../navigation/GlobalHeader/GlobalHeader.js";
import { ActionBar as t } from "../../navigation/ActionBar/ActionBar.js";
import { SideNav as n } from "../../navigation/SideNav/SideNav.js";
import { judiLogoSrc as r } from "../../ui/Icon/icons/judi-logo.js";
import { AlertViewport as i } from "../../ui/Alert/AlertViewport.js";
import { useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
// src/components/layout/AppLayout/AppLayout.tsx
function u({ variant: a = "minerva", logoSrc: u = r, logoIconSrc: p, logoAlt: m, logoHref: h, appName: g, onNotificationsClick: _, onAccountClick: v, headerActions: y, accountLabel: b, onAiClick: x, onKeyboardClick: S, breadcrumbs: C, title: w, onBackClick: T, secondaryContent: E, actions: D, titleMeta: O, completed: k, sideNavContent: A, defaultSideNavOpen: j = !0, rightUtilityContent: M, rightPanelContent: N, rightPanelOpen: P = !1, rightPanelDefaultWidth: F = 480, rightPanelMinWidth: I = 360, subBar: L, noPadding: R = !1, children: z, className: B = "" }) {
	let [V, H] = o(j), U = /* @__PURE__ */ c(e, {
		variant: a,
		logoSrc: u,
		logoIconSrc: p,
		logoAlt: m,
		logoHref: h,
		appName: g,
		onMenuClick: () => H((e) => !e),
		showMenuButton: !!A,
		onNotificationsClick: _,
		onAccountClick: v,
		headerActions: y,
		accountLabel: b,
		onAiClick: x,
		onKeyboardClick: S
	}), W = /* @__PURE__ */ c(t, {
		breadcrumbs: C,
		title: w,
		onBackClick: T,
		secondaryContent: E,
		actions: D,
		titleMeta: O,
		completed: k
	}), G = A ? /* @__PURE__ */ c(n, {
		isOpen: V,
		onToggle: () => H((e) => !e),
		children: A
	}) : null;
	return /* @__PURE__ */ l("div", {
		className: `flex flex-col h-screen overflow-hidden bg-(--bg-surface-base) ${B}`,
		children: [/* @__PURE__ */ c(i, {}), a === "evolution" ? /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("div", {
			className: "sticky top-0 z-50",
			children: U
		}), /* @__PURE__ */ l("div", {
			className: "flex flex-1 overflow-hidden",
			children: [
				V && G,
				/* @__PURE__ */ l("div", {
					className: "flex flex-col flex-1 min-w-0 overflow-hidden",
					children: [
						W,
						L && /* @__PURE__ */ c("div", {
							className: "shrink-0",
							children: L
						}),
						/* @__PURE__ */ c("main", {
							"aria-label": "Page content",
							className: `flex-1 overflow-auto bg-(--bg-surface-subtle) ${R ? "" : "p-(--layout-4)"}`,
							children: z
						})
					]
				}),
				N && /* @__PURE__ */ c(f, {
					open: P,
					defaultWidth: F,
					minWidth: I,
					children: N
				}),
				M && /* @__PURE__ */ c(d, { children: M })
			]
		})] }) : /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ l("div", {
			className: "sticky top-0 z-50",
			children: [
				U,
				W,
				L && /* @__PURE__ */ c("div", {
					className: "shrink-0",
					children: L
				})
			]
		}), /* @__PURE__ */ l("div", {
			className: "flex flex-1 overflow-hidden",
			children: [
				G,
				/* @__PURE__ */ c("main", {
					"aria-label": "Page content",
					className: `flex-1 overflow-auto bg-(--bg-surface-subtle) ${R ? "" : "p-(--layout-4)"}`,
					children: z
				}),
				N && /* @__PURE__ */ c(f, {
					open: P,
					defaultWidth: F,
					minWidth: I,
					children: N
				}),
				M && /* @__PURE__ */ c(d, { children: M })
			]
		})] })]
	});
}
function d({ children: e }) {
	return /* @__PURE__ */ c("aside", {
		"aria-label": "Utility navigation",
		className: "flex h-full w-(--space-48) shrink-0 flex-col items-center gap-(--stack-2) bg-(--bg-surface-base) px-(--inset-2) py-(--inset-3)",
		style: { borderLeft: "var(--space-1) solid var(--border-surface-base)" },
		children: e
	});
}
function f({ children: e, open: t, defaultWidth: n, minWidth: r }) {
	let i = a(null), [s, u] = o(n), d = () => Math.max(r, Math.floor((i.current?.parentElement?.clientWidth ?? window.innerWidth) / 2)), f = (e) => Math.min(d(), Math.max(r, e)), p = (e) => {
		e.preventDefault();
		let t = e.clientX, n = s, r = (e) => {
			u(f(n + t - e.clientX));
		}, i = () => {
			window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", i);
		};
		window.addEventListener("pointermove", r), window.addEventListener("pointerup", i);
	}, m = (e) => u((t) => f(t + e));
	return /* @__PURE__ */ c("aside", {
		ref: i,
		"aria-label": "Utility panel",
		"aria-hidden": !t,
		className: "relative shrink-0 overflow-hidden transition-[width] duration-200 ease-out",
		style: { width: t ? `${s}px` : "0px" },
		children: /* @__PURE__ */ l("div", {
			className: `relative h-full bg-(--bg-surface-base) transition-transform duration-200 ease-out ${t ? "translate-x-0" : "translate-x-full"}`,
			style: {
				width: `${s}px`,
				borderLeft: "var(--space-1) solid var(--border-surface-base)"
			},
			children: [/* @__PURE__ */ c("div", {
				role: "separator",
				"aria-label": "Resize utility panel",
				"aria-orientation": "vertical",
				"aria-valuemin": r,
				"aria-valuemax": d(),
				"aria-valuenow": s,
				tabIndex: t ? 0 : -1,
				onPointerDown: p,
				onKeyDown: (e) => {
					e.key === "ArrowLeft" && (e.preventDefault(), m(16)), e.key === "ArrowRight" && (e.preventDefault(), m(-16));
				},
				className: "absolute inset-y-0 left-0 z-10 w-(--space-4) -translate-x-1/2 cursor-col-resize bg-transparent hover:bg-(--border-control-emphasis) focus-visible:bg-(--border-control-default-focus) focus-visible:outline-none"
			}), e]
		})
	});
}
export { u as AppLayout };
