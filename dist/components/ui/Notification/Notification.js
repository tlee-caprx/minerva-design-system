import { Button as e } from "../Button/Button.js";
import { Text as t } from "../Text/Text.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
// src/components/ui/Notification/Notification.tsx
function i({ title: i = "Notifications", children: a, onMarkAllAsRead: o, onViewAll: s, className: c = "" }) {
	return /* @__PURE__ */ r("section", {
		className: `w-[400px] rounded-(--radius-sm) bg-(--bg-surface-base) p-(--inset-6) shadow-(--shadow-surface-md) ${c}`,
		children: [/* @__PURE__ */ r("div", {
			className: "flex items-center justify-between gap-(--inline-3)",
			children: [/* @__PURE__ */ n(t, {
				as: "h2",
				variant: "heading-sm",
				className: "text-(--text-surface-base)",
				children: i
			}), /* @__PURE__ */ r("div", {
				className: "flex shrink-0 items-center gap-(--inline-2)",
				children: [/* @__PURE__ */ n(e, {
					variant: "tertiary",
					onClick: o,
					children: "Mark All As Read"
				}), /* @__PURE__ */ n(e, {
					variant: "tertiary",
					onClick: s,
					children: "View All"
				})]
			})]
		}), a && /* @__PURE__ */ n("div", {
			className: "mt-(--stack-4)",
			children: a
		})]
	});
}
export { i as Notification };
