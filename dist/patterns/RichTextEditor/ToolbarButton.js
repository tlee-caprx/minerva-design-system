import { Icon as e } from "../../components/ui/Icon/Icon.js";
import { Tooltip as t } from "../../components/ui/Tooltip/Tooltip.js";
import { jsx as n } from "react/jsx-runtime";
// src/patterns/RichTextEditor/ToolbarButton.tsx
function r({ label: r, icon: i, active: a = !1, onClick: o, padding: s = "sm" }) {
	return /* @__PURE__ */ n(t, {
		content: r,
		children: /* @__PURE__ */ n("button", {
			type: "button",
			"aria-label": r,
			"aria-pressed": a,
			onMouseDown: (e) => e.preventDefault(),
			onClick: o,
			className: [
				"inline-flex shrink-0 items-center justify-center cursor-pointer rounded-(--radius-sm)",
				s === "sm" ? "p-(--inset-1)" : "p-(--inset-3)",
				"text-(--icon-action-neutral-idle) hover:text-(--icon-action-neutral-hover)",
				a ? "bg-(--bg-action-neutral-press)" : "bg-(--bg-action-neutral-idle) hover:bg-(--bg-action-neutral-hover) active:bg-(--bg-action-neutral-press)",
				"focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)"
			].join(" "),
			children: /* @__PURE__ */ n(e, {
				icon: i,
				size: "regular"
			})
		})
	});
}
export { r as ToolbarButton };
