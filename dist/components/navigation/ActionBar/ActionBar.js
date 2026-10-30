import { Button as e } from "../../ui/Button/Button.js";
import { CheckMarkIcon as t } from "../../ui/Icon/icons/check-mark.js";
import { ArrowLeftIcon as n } from "../../ui/Icon/icons/arrow-left.js";
import { Text as r } from "../../ui/Text/Text.js";
import { Breadcrumb as i } from "../Breadcrumb/Breadcrumb.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
// src/components/navigation/ActionBar/ActionBar.tsx
function c({ breadcrumbs: c = [], title: l, onBackClick: u, secondaryContent: d, actions: f, titleMeta: p, completed: m = !1, className: h = "" }) {
	let g = l || u;
	return /* @__PURE__ */ s("section", {
		className: `flex flex-col px-(--layout-4) py-(--inset-6) bg-(--bg-surface-base) ${h}`,
		style: { borderBottom: "var(--space-1) solid var(--border-surface-base)" },
		children: [c.length > 0 && /* @__PURE__ */ o(i, { items: c }), (g || f) && /* @__PURE__ */ s("div", {
			className: `flex items-start justify-between gap-(--inline-4) ${c.length > 0 ? "mt-(--space-20)" : ""}`,
			children: [/* @__PURE__ */ s("div", {
				className: "flex flex-col gap-(--stack-2)",
				children: [g && /* @__PURE__ */ s("div", {
					className: "flex items-center gap-(--inline-4)",
					children: [
						u && /* @__PURE__ */ o(e, {
							variant: "secondary",
							leftIcon: n,
							onClick: u,
							children: "Back"
						}),
						l && /* @__PURE__ */ o(r, {
							as: "h1",
							variant: "heading-xl",
							className: "text-(--text-surface-base)",
							style: { margin: 0 },
							children: l
						}),
						(m || p) && /* @__PURE__ */ s("div", {
							className: "flex items-center gap-(--inline-2)",
							children: [m && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(t, {
								width: 20,
								height: 20,
								style: {
									color: "var(--icon-feedback-success-base)",
									flexShrink: 0
								}
							}), /* @__PURE__ */ o(r, {
								as: "span",
								variant: "label-md",
								className: "text-(--text-feedback-success-base)",
								children: "Case Completed"
							})] }), p]
						})
					]
				}), d && /* @__PURE__ */ o("div", {
					className: "flex items-center gap-(--inline-4)",
					children: d
				})]
			}), f && /* @__PURE__ */ o("div", {
				className: "shrink-0",
				children: f
			})]
		})]
	});
}
export { c as ActionBar };
