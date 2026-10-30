import { FieldWrapper as e } from "../FieldWrapper/FieldWrapper.js";
import { MenuPanel as t } from "./MenuPanel.js";
import { MenuItem as n } from "./MenuItem.js";
import { Icon as r } from "../Icon/Icon.js";
import { ChevronDownIcon as i } from "../Icon/icons/chevron-down.js";
import { XCloseIcon as a } from "../Icon/icons/x-close.js";
import { Children as o, cloneElement as s, forwardRef as c, isValidElement as l, useEffect as u, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
// src/components/ui/Dropdown/Dropdown.tsx
var g = c(function({ label: c, required: g = !1, tooltip: _, instructions: v, invalid: y = !1, disabled: b = !1, readOnly: x = !1, value: S, placeholder: C, onClear: w, onSelect: T, searchBar: E, children: D, className: O = "", id: k, onClick: A, ...j }, M) {
	let N = d(), P = k ?? N, [F, I] = p(!1), L = f(null), R = f(null), z = () => {
		b || x || (I((e) => !e), L.current?.focus());
	};
	u(() => {
		if (!F) return;
		let e = (e) => {
			R.current && !R.current.contains(e.target) && I(!1);
		}, t = (e) => {
			e.key === "Escape" && (I(!1), L.current?.focus());
		};
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [F]);
	let B = o.toArray(D).some((e) => l(e) && e.type === n && e.props.checkbox) ? D : o.map(D, (e) => !l(e) || e.type !== n ? e : s(e, {
		selected: e.props.label === S,
		onClick: (t) => {
			e.props.onClick?.(t), T?.(e.props.label), I(!1), L.current?.focus();
		}
	}));
	return /* @__PURE__ */ m("div", {
		ref: R,
		children: /* @__PURE__ */ m(e, {
			inputId: P,
			label: c,
			required: g,
			tooltip: _,
			instructions: v,
			invalid: y,
			disabled: b,
			readOnly: x,
			panel: F && D ? /* @__PURE__ */ m(t, {
				searchBar: E,
				children: B
			}) : void 0,
			rightIcon: /* @__PURE__ */ h("div", {
				className: "inline-flex items-center gap-(--inline-1)",
				children: [w && S && /* @__PURE__ */ m("button", {
					type: "button",
					onClick: (e) => {
						e.stopPropagation(), w();
					},
					"aria-label": "Clear selection",
					className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-control-default) hover:text-(--icon-control-strong)",
					children: /* @__PURE__ */ m(r, {
						icon: a,
						size: "small"
					})
				}), /* @__PURE__ */ m("span", {
					onClick: z,
					className: ["inline-flex items-center justify-center", b ? "cursor-not-allowed" : x ? "cursor-default" : "cursor-pointer"].join(" "),
					children: /* @__PURE__ */ m(r, {
						icon: i,
						size: "regular",
						className: `text-(--icon-control-default) transition-transform duration-150 ${F ? "rotate-180" : ""}`
					})
				})]
			}),
			children: /* @__PURE__ */ m("button", {
				id: P,
				ref: (e) => {
					L.current = e, typeof M == "function" ? M(e) : M && (M.current = e);
				},
				type: "button",
				disabled: b,
				"aria-haspopup": "listbox",
				"aria-expanded": F,
				onClick: (e) => {
					z(), A?.(e);
				},
				className: [
					"flex-1 min-w-0 w-full text-left",
					"bg-transparent outline-none",
					b ? "cursor-not-allowed" : x ? "cursor-default" : "cursor-pointer",
					O
				].filter(Boolean).join(" "),
				style: {
					fontSize: "var(--body-md-size)",
					lineHeight: "var(--body-md-line-height)",
					fontWeight: "var(--body-md-weight)",
					color: b ? "var(--text-control-value-disabled)" : S ? "var(--text-control-value)" : "var(--text-control-placeholder)"
				},
				...j,
				children: S || C
			})
		})
	});
});
export { g as Dropdown };
