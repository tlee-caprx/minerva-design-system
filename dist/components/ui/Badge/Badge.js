import { Icon as e } from "../Icon/Icon.js";
import { XCloseIcon as t } from "../Icon/icons/x-close.js";
import { Text as n } from "../Text/Text.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
// src/components/ui/Badge/Badge.tsx
function a({ children: a, onClose: o, className: s = "" }) {
	return /* @__PURE__ */ i("span", {
		className: `inline-flex items-center gap-(--inline-1) rounded-(--radius-sm) py-(--inset-2) px-(--inset-3) bg-(--bg-surface-subtle) ${s}`,
		style: { border: "1px solid var(--border-surface-base)" },
		children: [/* @__PURE__ */ r(n, {
			as: "span",
			variant: "tag-label",
			className: "text-(--text-surface-subtle)",
			children: a
		}), o && /* @__PURE__ */ r("button", {
			type: "button",
			onClick: o,
			"aria-label": "Remove",
			className: "inline-flex items-center justify-center cursor-pointer border-0 bg-transparent p-0 shrink-0",
			children: /* @__PURE__ */ r(e, {
				icon: t,
				size: "small",
				className: "text-(--icon-action-dismiss-idle)"
			})
		})]
	});
}
export { a as Badge };
