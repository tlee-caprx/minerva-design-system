import { Icon as e } from "../Icon/Icon.js";
import { LinkOutIcon as t } from "../Icon/icons/link-out.js";
import { Text as n } from "../Text/Text.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
// src/components/ui/MetaItem/MetaItem.tsx
function a({ icon: a, label: o, value: s, onClick: c, className: l = "" }) {
	return /* @__PURE__ */ i("div", {
		className: `inline-flex items-start gap-(--inline-1) max-w-full ${l}`,
		children: [a && /* @__PURE__ */ r("span", {
			className: "inline-flex items-center shrink-0 h-(--body-md-line-height)",
			children: /* @__PURE__ */ r(e, {
				icon: a,
				size: "small",
				className: "text-(--icon-surface-base)"
			})
		}), /* @__PURE__ */ i(n, {
			variant: "body-md",
			className: "min-w-0 text-(--text-surface-base) [overflow-wrap:anywhere]",
			children: [
				/* @__PURE__ */ i(n, {
					variant: "body-md",
					weight: "semibold",
					className: "whitespace-nowrap",
					children: [o, ":"]
				}),
				" ",
				c ? /* @__PURE__ */ i("button", {
					type: "button",
					onClick: c,
					className: "inline cursor-pointer bg-transparent p-0 text-left",
					style: { border: "none" },
					children: [
						/* @__PURE__ */ r(n, {
							variant: "body-md",
							className: "text-(--text-action-hyperlink) underline",
							children: s
						}),
						"\xA0",
						/* @__PURE__ */ r(e, {
							icon: t,
							size: "small",
							className: "inline-block align-middle text-(--icon-action-hyperlink)"
						})
					]
				}) : s
			]
		})]
	});
}
export { a as MetaItem };
