import { Icon as e } from "../Icon/Icon.js";
import { ChevronRightIcon as t } from "../Icon/icons/chevron-right.js";
import { ChevronDownIcon as n } from "../Icon/icons/chevron-down.js";
import { CheckMarkIcon as r } from "../Icon/icons/check-mark.js";
import { Text as i } from "../Text/Text.js";
import { useId as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
// src/components/ui/Collapse/Collapse.tsx
var l = {
	default: {
		border: "full",
		headerPadding: "px-(--inset-7) py-(--inset-6)",
		bodyPadding: "px-(--inset-7) py-(--inset-6)"
	},
	underline: {
		border: "bottom",
		headerPadding: "px-(--inset-7) py-(--inset-6)",
		bodyPadding: "px-(--inset-7) py-(--inset-6)"
	},
	blank: {
		border: "none",
		headerPadding: "px-(--inset-7) py-(--inset-6)",
		bodyPadding: "px-(--inset-7) py-(--inset-6)"
	},
	"underline-flush": {
		border: "bottom",
		headerPadding: "py-(--inset-6)",
		bodyPadding: "py-(--inset-6)"
	},
	"blank-flush": {
		border: "none",
		headerPadding: "py-(--inset-6)",
		bodyPadding: "py-(--inset-6)"
	},
	unpadded: {
		border: "none",
		headerPadding: "",
		bodyPadding: "py-(--inset-6)"
	}
}, u = {
	full: { border: "var(--space-1) solid var(--border-surface-base)" },
	bottom: { borderBottom: "var(--space-1) solid var(--border-surface-base)" },
	none: {}
};
function d({ style: d = "default", trigger: f = "chevron", title: p, actions: m, defaultOpen: h = !1, children: g, className: _ = "" }) {
	let [v, y] = o(h), b = a(), x = l[d], S = () => y((e) => !e);
	return /* @__PURE__ */ c("div", {
		className: `flex flex-col bg-(--bg-surface-base) ${x.border === "full" ? "rounded-(--radius-sm)" : ""} ${_}`,
		style: u[x.border],
		children: [/* @__PURE__ */ c("div", {
			role: "button",
			tabIndex: 0,
			"aria-expanded": v,
			"aria-controls": b,
			onClick: S,
			onKeyDown: (e) => {
				(e.key === "Enter" || e.key === " ") && (e.preventDefault(), S());
			},
			className: [
				"flex items-center justify-between gap-(--inline-4)",
				"cursor-pointer outline-none",
				"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
				"focus-visible:outline-(--border-control-default-focus)",
				x.headerPadding
			].join(" "),
			style: d === "default" && v ? { borderBottom: "var(--space-1) solid var(--border-surface-base)" } : void 0,
			children: [/* @__PURE__ */ c("span", {
				className: "flex items-center gap-(--inline-2) min-w-0",
				children: [f === "chevron" ? /* @__PURE__ */ s(e, {
					icon: v ? n : t,
					size: "regular",
					className: "text-(--icon-action-base-idle) shrink-0"
				}) : /* @__PURE__ */ s("span", {
					"aria-hidden": "true",
					className: [
						"inline-flex items-center justify-center shrink-0",
						"w-(--space-18) h-(--space-18) rounded-(--radius-sm)",
						v ? "bg-(--bg-control-selected-idle)" : "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]"
					].join(" "),
					children: v && /* @__PURE__ */ s(e, {
						icon: r,
						size: "small",
						className: "text-(--icon-control-selected-idle)"
					})
				}), /* @__PURE__ */ s(i, {
					variant: "body-md",
					weight: "semibold",
					className: "text-(--text-action-base-idle) truncate",
					children: p
				})]
			}), m && /* @__PURE__ */ s("span", {
				onClick: (e) => e.stopPropagation(),
				className: "flex items-center gap-(--inline-3) shrink-0",
				children: m
			})]
		}), v && /* @__PURE__ */ s("div", {
			id: b,
			className: x.bodyPadding,
			children: g
		})]
	});
}
export { d as Collapse };
