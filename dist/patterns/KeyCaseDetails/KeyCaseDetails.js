import { Icon as e } from "../../components/ui/Icon/Icon.js";
import { ChevronRightIcon as t } from "../../components/ui/Icon/icons/chevron-right.js";
import { LinkOutIcon as n } from "../../components/ui/Icon/icons/link-out.js";
import { Text as r } from "../../components/ui/Text/Text.js";
import { Fragment as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
// src/patterns/KeyCaseDetails/KeyCaseDetails.tsx
var c = [
	{
		primary: {
			label: "Member",
			value: "Walter White"
		},
		sub: [
			{
				label: "Member ID",
				value: "1234567"
			},
			{
				label: "Person Code",
				value: "01"
			},
			{
				label: "Date of Birth",
				value: "01/01/2000"
			}
		]
	},
	{
		primary: {
			label: "Prescriber",
			value: "Taylor Sweezy, MD"
		},
		sub: [{
			label: "Phone",
			value: "(123) 456-7890"
		}, {
			label: "Fax",
			value: "(123) 456-7890"
		}]
	},
	{
		primary: {
			label: "Drug",
			value: "Humira Pediatric Crohns Start 80MG/0.4ML Prefilled Syringe Kit"
		},
		sub: [
			{
				label: "NDC",
				value: "12345678901"
			},
			{
				label: "GPI",
				value: "12345678901234"
			},
			{
				label: "Quantity/Days Supply",
				value: "30/30",
				siblings: [{
					label: "MONY",
					value: "Y"
				}]
			}
		]
	},
	{
		primary: {
			label: "Origin",
			value: "Fax"
		},
		sub: []
	},
	{
		primary: {
			label: "Plan Benefit",
			value: "J.P. Wynne High School",
			onClick: () => {}
		},
		sub: [{
			label: "Formulary",
			value: "Liberty",
			onClick: () => {},
			primary: !0
		}]
	}
];
function l({ value: t, onClick: i }) {
	return i ? /* @__PURE__ */ s("button", {
		type: "button",
		onClick: i,
		className: "inline-flex items-center gap-(--inline-1) cursor-pointer bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-surface-inverse)",
		children: [/* @__PURE__ */ o(r, {
			as: "span",
			variant: "body-md",
			underline: !0,
			className: "text-(--text-surface-inverse)",
			children: t
		}), /* @__PURE__ */ o(e, {
			icon: n,
			size: "small",
			className: "text-(--text-surface-inverse) shrink-0"
		})]
	}) : /* @__PURE__ */ o(r, {
		as: "span",
		variant: "body-md",
		className: "text-(--text-surface-inverse)",
		children: t
	});
}
function u({ section: e, expanded: t }) {
	return /* @__PURE__ */ s("div", {
		className: "grid grid-cols-[auto_auto] gap-x-(--inline-1) gap-y-(--stack-1) shrink-0",
		children: [
			/* @__PURE__ */ s(r, {
				as: "span",
				variant: "body-md",
				weight: "semibold",
				className: "text-(--text-surface-inverse)",
				children: [e.primary.label, ":"]
			}),
			/* @__PURE__ */ o(l, {
				value: e.primary.value,
				onClick: e.primary.onClick
			}),
			t && e.sub.map((e) => e.primary ? /* @__PURE__ */ s(i, { children: [/* @__PURE__ */ s(r, {
				as: "span",
				variant: "body-md",
				weight: "semibold",
				className: "text-(--text-surface-inverse)",
				children: [e.label, ":"]
			}), /* @__PURE__ */ o(l, {
				value: e.value,
				onClick: e.onClick
			})] }, e.label) : /* @__PURE__ */ s(i, { children: [/* @__PURE__ */ o("span", { "aria-hidden": "true" }), /* @__PURE__ */ s("div", {
				className: "col-start-2 flex items-center gap-(--inline-4)",
				children: [/* @__PURE__ */ s("div", {
					className: "flex items-center gap-(--inline-1)",
					children: [/* @__PURE__ */ s(r, {
						as: "span",
						variant: "body-md",
						className: "text-(--text-surface-inverse)",
						children: [e.label, ":"]
					}), /* @__PURE__ */ o(l, {
						value: e.value,
						onClick: e.onClick
					})]
				}), e.siblings?.map((e) => /* @__PURE__ */ s("div", {
					className: "flex items-center gap-(--inline-1)",
					children: [/* @__PURE__ */ s(r, {
						as: "span",
						variant: "body-md",
						className: "text-(--text-surface-inverse)",
						children: [e.label, ":"]
					}), /* @__PURE__ */ o(l, { value: e.value })]
				}, e.label))]
			})] }, e.label))
		]
	});
}
function d() {
	let [n, r] = a(!1);
	return /* @__PURE__ */ s("div", {
		className: "flex items-start gap-(--inline-4) px-(--inset-7) py-(--inset-3) bg-(--bg-surface-brand) w-full",
		children: [/* @__PURE__ */ o("div", {
			className: "flex items-center shrink-0",
			style: { height: "var(--body-md-line-height)" },
			children: /* @__PURE__ */ o("button", {
				type: "button",
				onClick: () => r((e) => !e),
				"aria-label": n ? "Collapse case details" : "Expand case details",
				"aria-expanded": n,
				className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-surface-inverse)",
				children: /* @__PURE__ */ o(e, {
					icon: t,
					size: "regular",
					className: "text-(--text-surface-inverse)",
					style: {
						transform: n ? "rotate(90deg)" : "rotate(0deg)",
						transition: "transform 200ms ease"
					}
				})
			})
		}), /* @__PURE__ */ o("div", {
			className: "flex items-start gap-(--inline-4) flex-1 min-w-0 overflow-hidden",
			children: c.map((e) => /* @__PURE__ */ o(u, {
				section: e,
				expanded: n
			}, e.primary.label))
		})]
	});
}
export { d as KeyCaseDetails };
