import { Button as e } from "../Button/Button.js";
import { Icon as t } from "../Icon/Icon.js";
import { ChevronRightIcon as n } from "../Icon/icons/chevron-right.js";
import { Fragment as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
// src/components/ui/Steps/Steps.tsx
function o({ steps: o, className: s = "" }) {
	return /* @__PURE__ */ i("div", {
		className: `flex items-center gap-(--inline-2) px-(--inset-7) py-(--inset-3) bg-(--bg-surface-subtle) ${s}`,
		children: o.map((o, s) => /* @__PURE__ */ a(r, { children: [s > 0 && /* @__PURE__ */ i(t, {
			icon: n,
			size: "small",
			className: "text-(--icon-surface-base) shrink-0"
		}), o.active ? /* @__PURE__ */ i(e, {
			variant: "tertiary",
			onClick: o.onClick,
			children: o.label
		}) : /* @__PURE__ */ i("div", {
			className: "opacity-30 pointer-events-none",
			children: /* @__PURE__ */ i(e, {
				variant: "tertiary",
				children: o.label
			})
		})] }, o.label))
	});
}
export { o as Steps };
