import { Button as e } from "../Button/Button.js";
import { EllipsisVerticalIcon as t } from "../Icon/icons/ellipsis-vertical.js";
import { Icon as n } from "../Icon/Icon.js";
import { MenuItem as r } from "../Dropdown/MenuItem.js";
import { MenuPanel as i } from "../Dropdown/MenuPanel.js";
import { useEffect as a, useId as o, useLayoutEffect as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import { createPortal as p } from "react-dom";
// src/components/ui/Table/TableRowActions.tsx
function m({ actions: m, label: h = "Row actions" }) {
	let [g, _] = l(!1), [v, y] = l(null), b = c(null), x = c(null), S = o(), C = (e) => {
		_(!1), y(null), e && b.current?.focus();
	};
	return s(() => {
		if (!g) return;
		let e = b.current?.getBoundingClientRect(), t = x.current?.getBoundingClientRect();
		if (!e || !t) return;
		let n = e.bottom + t.height <= window.innerHeight;
		y(n ? {
			top: e.bottom,
			left: e.right,
			transform: "translateX(-100%)"
		} : {
			top: e.top,
			left: e.right,
			transform: "translate(-100%, -100%)"
		});
	}, [g]), a(() => {
		v && x.current?.querySelector("[role=\"menuitem\"]:not(:disabled)")?.focus({ preventScroll: !0 });
	}, [v]), a(() => {
		if (!g) return;
		let e = (e) => {
			let t = e.target;
			!x.current?.contains(t) && !b.current?.contains(t) && C(!1);
		}, t = (e) => {
			e.target instanceof Node && x.current?.contains(e.target) || C(!1);
		};
		return document.addEventListener("pointerdown", e), window.addEventListener("scroll", t, !0), window.addEventListener("resize", t), () => {
			document.removeEventListener("pointerdown", e), window.removeEventListener("scroll", t, !0), window.removeEventListener("resize", t);
		};
	}, [g]), /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(e, {
		ref: b,
		variant: "tertiary",
		iconOnly: !0,
		unpadded: !0,
		"aria-label": h,
		"aria-haspopup": "menu",
		"aria-expanded": g,
		"aria-controls": g ? S : void 0,
		onClick: () => g ? C(!1) : _(!0),
		children: /* @__PURE__ */ d(n, {
			icon: t,
			size: "regular"
		})
	}), g && p(/* @__PURE__ */ d("div", {
		ref: x,
		id: S,
		role: "menu",
		"aria-label": h,
		onKeyDown: (e) => {
			let t = Array.from(x.current?.querySelectorAll("[role=\"menuitem\"]:not(:disabled)") ?? []), n = t.indexOf(document.activeElement), r = (e) => t[(e + t.length) % t.length]?.focus({ preventScroll: !0 });
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), r(n + 1);
					break;
				case "ArrowUp":
					e.preventDefault(), r(n - 1);
					break;
				case "Home":
					e.preventDefault(), r(0);
					break;
				case "End":
					e.preventDefault(), r(t.length - 1);
					break;
				case "Escape":
					e.preventDefault(), C(!0);
					break;
				case "Tab": C(!1);
			}
		},
		className: `fixed w-max ${v?.transform === "translateX(-100%)" ? "pt-(--stack-1)" : "pb-(--stack-1)"}`,
		style: {
			...v ?? {
				top: 0,
				left: 0
			},
			visibility: v ? "visible" : "hidden",
			minWidth: "calc(var(--space-40) * 4)",
			zIndex: 9e3
		},
		children: /* @__PURE__ */ d(i, { children: m.map((e) => /* @__PURE__ */ d(r, {
			role: "menuitem",
			label: e.label,
			destructive: e.destructive,
			disabled: e.disabled,
			onClick: () => {
				C(!0), e.onClick();
			}
		}, e.label)) })
	}), document.body)] });
}
export { m as TableRowActions };
