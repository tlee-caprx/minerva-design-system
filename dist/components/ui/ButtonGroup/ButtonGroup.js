import { Children as e, isValidElement as t } from "react";
import { jsx as n } from "react/jsx-runtime";
// src/components/ui/ButtonGroup/ButtonGroup.tsx
function r({ children: r, className: i = "", onClickCapture: a }) {
	let o = e.toArray(r), s = o.length > 0 && o.every((e) => t(e) && e.props.variant === "tertiary");
	return /* @__PURE__ */ n("div", {
		onClickCapture: a,
		className: `flex items-center ${s ? "gap-(--inline-4)" : "gap-(--inline-2)"} ${i}`,
		children: r
	});
}
export { r as ButtonGroup };
