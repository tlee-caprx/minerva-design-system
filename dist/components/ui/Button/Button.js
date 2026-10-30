import { Icon as e } from "../Icon/Icon.js";
import { Spinner as t } from "../Spinner/Spinner.js";
import { forwardRef as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
// src/components/ui/Button/Button.tsx
function o({ children: e }) {
	return /* @__PURE__ */ i("span", {
		"aria-hidden": "true",
		style: {
			width: "var(--space-20)",
			height: "var(--space-20)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: 0
		},
		children: e
	});
}
var s = "bg-(--bg-action-neutral-disabled) text-(--text-action-base-disabled) focus-visible:outline-(--border-surface-base)", c = {
	primary: {
		default: "bg-(--bg-action-primary-idle) hover:bg-(--bg-action-primary-hover) active:bg-(--bg-action-primary-pressed) text-(--text-action-primary-idle) focus-visible:outline-(--border-action-secondary-idle)",
		destructive: "bg-(--bg-action-primary-critical-idle) hover:bg-(--bg-action-primary-critical-hover) active:bg-(--bg-action-primary-critical-pressed) text-(--text-action-primary-critical-idle) focus-visible:outline-(--border-action-secondary-critical-idle)"
	},
	secondary: {
		default: "bg-(--bg-action-secondary-idle) hover:bg-(--bg-action-secondary-hover) active:bg-(--bg-action-secondary-pressed) text-(--text-action-secondary-idle) shadow-[inset_0_0_0_1px_var(--border-action-secondary-idle)] hover:shadow-[inset_0_0_0_1px_var(--border-action-secondary-hover)] active:shadow-[inset_0_0_0_1px_var(--border-action-secondary-pressed)] focus-visible:outline-(--border-action-secondary-idle)",
		destructive: "bg-(--bg-action-secondary-critical-idle) hover:bg-(--bg-action-secondary-critical-hover) active:bg-(--bg-action-secondary-critical-pressed) text-(--text-action-secondary-critical-idle) hover:text-(--text-action-secondary-critical-hover) active:text-(--text-action-secondary-critical-pressed) shadow-[inset_0_0_0_1px_var(--border-action-secondary-critical-idle)] hover:shadow-[inset_0_0_0_1px_var(--border-action-secondary-critical-hover)] active:shadow-[inset_0_0_0_1px_var(--border-action-secondary-critical-pressed)] focus-visible:outline-(--border-action-secondary-critical-idle)"
	},
	tertiary: {
		default: "bg-transparent text-(--text-action-secondary-idle) hover:text-(--text-action-secondary-hover) hover:underline active:text-(--text-action-secondary-pressed) focus-visible:outline-(--border-action-secondary-idle)",
		destructive: "bg-transparent text-(--text-action-secondary-critical-idle) hover:text-(--text-action-secondary-critical-hover) hover:underline active:text-(--text-action-secondary-critical-pressed) focus-visible:outline-(--border-action-secondary-critical-idle)"
	},
	link: {
		default: "bg-transparent underline text-(--text-action-secondary-idle) hover:text-(--text-action-secondary-hover) active:text-(--text-action-secondary-pressed) focus-visible:outline-(--border-action-secondary-idle)",
		destructive: "bg-transparent underline text-(--text-action-secondary-critical-idle) hover:text-(--text-action-secondary-critical-hover) active:text-(--text-action-secondary-critical-pressed) focus-visible:outline-(--border-action-secondary-critical-idle)"
	},
	inverse: {
		default: "bg-(--bg-action-inverse-idle) hover:bg-(--bg-action-inverse-hover) active:bg-(--bg-action-inverse-pressed) text-(--text-action-inverse-idle) hover:text-(--text-action-inverse-hover) active:text-(--text-action-inverse-pressed) focus-visible:outline-(--text-action-inverse-idle)",
		destructive: "bg-(--bg-action-inverse-idle) hover:bg-(--bg-action-inverse-hover) active:bg-(--bg-action-inverse-pressed) text-(--text-action-inverse-idle) hover:text-(--text-action-inverse-hover) active:text-(--text-action-inverse-pressed) focus-visible:outline-(--text-action-inverse-idle)"
	}
}, l = n(function({ variant: n = "primary", destructive: l = !1, leftIcon: u, rightIcon: d, iconOnly: f = !1, loading: p = !1, fullWidth: m = !1, unpadded: h = !1, disabled: g, children: _, className: v = "", style: y, ...b }, x) {
	let S = g || p, C = S ? s : c[n][l ? "destructive" : "default"], w = [
		"inline-flex items-center justify-center",
		"select-none",
		"transition-colors duration-150",
		"outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
		f ? `${n === "tertiary" && h ? "p-0" : "p-(--inset-3)"} shrink-0` : n === "link" || n === "tertiary" && h ? `p-0 gap-(--inline-2) ${m ? "w-full sm:w-auto" : ""}` : `py-(--inset-3) ${n === "tertiary" ? "px-0" : "px-(--inset-5)"} gap-(--inline-2) ${m ? "w-full sm:w-auto" : ""}`,
		S ? "cursor-not-allowed" : "cursor-pointer",
		C,
		v
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i("button", {
		ref: x,
		disabled: S,
		className: w,
		style: {
			borderRadius: "var(--radius-sm)",
			fontSize: n === "link" ? "var(--body-md-size)" : "var(--button-label-size)",
			lineHeight: n === "link" ? "var(--body-md-line-height)" : "var(--button-label-line-height)",
			fontWeight: n === "link" ? "var(--body-md-weight)" : "var(--button-label-weight)",
			...y
		},
		...b,
		children: f ? /* @__PURE__ */ i(o, { children: p ? /* @__PURE__ */ i(t, {}) : _ }) : /* @__PURE__ */ a(r, { children: [
			u && /* @__PURE__ */ i(e, {
				icon: u,
				size: "regular"
			}),
			_,
			d && /* @__PURE__ */ i(e, {
				icon: d,
				size: "regular"
			}),
			p && /* @__PURE__ */ i(t, {})
		] })
	});
});
export { l as Button };
