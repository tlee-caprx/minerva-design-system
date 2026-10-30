import { Icon as e } from "../Icon/Icon.js";
import { CheckMarkIcon as t } from "../Icon/icons/check-mark.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
// src/components/ui/Dropdown/MenuItem.tsx
function i({ label: i, selected: a = !1, destructive: o = !1, checkbox: s = !1, disabled: c = !1, className: l = "", ...u }) {
	return /* @__PURE__ */ r("button", {
		type: "button",
		disabled: c,
		className: [
			"w-full flex items-center justify-between gap-(--inline-2)",
			"py-(--inset-3) px-(--inset-5)",
			"bg-(--bg-surface-base)",
			"border-0 outline-none text-left",
			c ? "text-(--text-control-value-disabled)" : o ? "text-(--text-control-destructive-idle)" : "text-(--text-control-subtle-idle)",
			c ? "cursor-not-allowed" : `cursor-pointer ${c ? "" : o ? "hover:bg-(--bg-control-subtle-destructive-hover) active:bg-(--bg-control-subtle-destructive-hover) focus-visible:bg-(--bg-control-subtle-destructive-hover)" : "hover:bg-(--bg-control-subtle-hover) active:bg-(--bg-control-subtle-hover) focus-visible:bg-(--bg-control-subtle-hover)"}`,
			l
		].filter(Boolean).join(" "),
		style: {
			fontSize: "var(--menu-item-size)",
			lineHeight: "var(--menu-item-line-height)",
			fontWeight: "var(--menu-item-weight)"
		},
		...u,
		children: [/* @__PURE__ */ r("span", {
			className: "inline-flex items-center gap-(--inline-2) min-w-0",
			children: [s && /* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: [
					"inline-flex items-center justify-center shrink-0",
					"w-(--space-18) h-(--space-18) rounded-(--radius-sm)",
					c ? "bg-(--bg-control-default-disabled)" : a ? "bg-(--bg-control-selected-idle)" : "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]"
				].join(" "),
				children: a && !c && /* @__PURE__ */ n(e, {
					icon: t,
					size: "small",
					className: "text-(--icon-control-selected-idle)"
				})
			}), /* @__PURE__ */ n("span", {
				className: "truncate",
				children: i
			})]
		}), !s && a && /* @__PURE__ */ n(e, {
			icon: t,
			size: "small"
		})]
	});
}
export { i as MenuItem };
