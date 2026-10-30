import { Input as e } from "./Input.js";
import { Icon as t } from "../Icon/Icon.js";
import { SearchIcon as n } from "../Icon/icons/search.js";
import { XCloseIcon as r } from "../Icon/icons/x-close.js";
import { forwardRef as i, useEffect as a, useRef as o, useState as s } from "react";
import { jsx as c } from "react/jsx-runtime";
// src/components/ui/Input/SearchInput.tsx
var l = i(function({ onChange: i, value: l, defaultValue: u, ...d }, f) {
	let p = o(null), [m, h] = s(() => !!(l ?? u));
	a(() => {
		l !== void 0 && h(!!l);
	}, [l]);
	let g = (e) => {
		h(e.target.value.length > 0), i?.(e);
	}, _ = () => {
		let e = p.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), e.focus());
	};
	return /* @__PURE__ */ c(e, {
		...d,
		value: l,
		defaultValue: u,
		onChange: g,
		type: "text",
		ref: (e) => {
			p.current = e, typeof f == "function" ? f(e) : f && (f.current = e);
		},
		leftIcon: /* @__PURE__ */ c(t, {
			icon: n,
			size: "regular",
			className: "text-(--icon-control-default)"
		}),
		rightIcon: m ? /* @__PURE__ */ c("button", {
			type: "button",
			onClick: _,
			"aria-label": "Clear search",
			className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-control-default) hover:text-(--icon-control-strong)",
			children: /* @__PURE__ */ c(t, {
				icon: r,
				size: "small"
			})
		}) : void 0
	});
});
export { l as SearchInput };
