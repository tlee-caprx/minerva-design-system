import { Icon as e } from "../Icon/Icon.js";
import { XCloseIcon as t } from "../Icon/icons/x-close.js";
import { Text as n } from "../Text/Text.js";
import { ButtonGroup as r } from "../ButtonGroup/ButtonGroup.js";
import { forwardRef as i, useEffect as a, useId as o, useRef as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { createPortal as u } from "react-dom";
// src/components/ui/Modal/Modal.tsx
var d = i(function({ onClose: i, title: a, children: s, leftAction: u, rightActions: d, className: f = "" }, p) {
	let m = o();
	return /* @__PURE__ */ l("div", {
		ref: p,
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": m,
		tabIndex: -1,
		className: `flex flex-col gap-(--stack-5) w-[528px] p-(--inset-7) rounded-(--radius-sm) bg-(--bg-surface-base) outline-none ${f}`,
		style: { boxShadow: "var(--shadow-surface-lg)" },
		children: [
			/* @__PURE__ */ l("div", {
				className: "flex items-center justify-between gap-(--inline-4)",
				children: [/* @__PURE__ */ c(n, {
					id: m,
					as: "h2",
					variant: "heading-xs",
					className: "text-(--text-surface-base)",
					children: a
				}), /* @__PURE__ */ c("button", {
					type: "button",
					"aria-label": "Close",
					onClick: i,
					className: "shrink-0 inline-flex items-center justify-center cursor-pointer bg-transparent p-0",
					style: { border: "none" },
					children: /* @__PURE__ */ c(e, {
						icon: t,
						size: "regular",
						className: "text-(--icon-action-dismiss-idle)"
					})
				})]
			}),
			/* @__PURE__ */ c("div", {
				className: "text-(--text-surface-base)",
				children: s
			}),
			(u || d) && /* @__PURE__ */ l("div", {
				className: "flex items-center justify-between gap-(--inline-4)",
				children: [/* @__PURE__ */ c("div", { children: u }), d && /* @__PURE__ */ c(r, { children: d })]
			})
		]
	});
});
function f({ open: e, onClose: t, ...n }) {
	let r = s(null), i = s(null);
	return a(() => {
		if (!e) return;
		i.current = document.activeElement, r.current?.focus();
		let n = (e) => {
			e.key === "Escape" && t();
		};
		return document.addEventListener("keydown", n), () => {
			document.removeEventListener("keydown", n), i.current?.focus();
		};
	}, [e, t]), e ? u(/* @__PURE__ */ c("div", {
		className: "fixed inset-0 z-[9999] flex items-center justify-center",
		style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
		onClick: t,
		children: /* @__PURE__ */ c("div", {
			onClick: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ c(d, {
				ref: r,
				onClose: t,
				...n
			})
		})
	}), document.body) : null;
}
export { f as Modal, d as ModalContent };
