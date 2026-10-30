import { jsx as e } from "react/jsx-runtime";
// src/components/ui/Text/Text.tsx
var t = {
	"body-sm": {
		fontSize: "var(--body-sm-size)",
		lineHeight: "var(--body-sm-line-height)",
		fontWeight: "var(--body-sm-weight)"
	},
	"body-md": {
		fontSize: "var(--body-md-size)",
		lineHeight: "var(--body-md-line-height)",
		fontWeight: "var(--body-md-weight)"
	},
	"body-lg": {
		fontSize: "var(--body-lg-size)",
		lineHeight: "var(--body-lg-line-height)",
		fontWeight: "var(--body-lg-weight)"
	},
	"heading-xs": {
		fontSize: "var(--heading-xs-size)",
		lineHeight: "var(--heading-xs-line-height)",
		fontWeight: "var(--heading-xs-weight)"
	},
	"heading-sm": {
		fontSize: "var(--heading-sm-size)",
		lineHeight: "var(--heading-sm-line-height)",
		fontWeight: "var(--heading-sm-weight)"
	},
	"heading-md": {
		fontSize: "var(--heading-md-size)",
		lineHeight: "var(--heading-md-line-height)",
		fontWeight: "var(--heading-md-weight)"
	},
	"heading-lg": {
		fontSize: "var(--heading-lg-size)",
		lineHeight: "var(--heading-lg-line-height)",
		fontWeight: "var(--heading-lg-weight)"
	},
	"heading-xl": {
		fontSize: "var(--heading-xl-size)",
		lineHeight: "var(--heading-xl-line-height)",
		fontWeight: "var(--heading-xl-weight)"
	},
	"label-sm": {
		fontSize: "var(--label-sm-size)",
		lineHeight: "var(--label-sm-line-height)",
		fontWeight: "var(--label-sm-weight)"
	},
	"label-md": {
		fontSize: "var(--label-md-size)",
		lineHeight: "var(--label-md-line-height)",
		fontWeight: "var(--label-md-weight)"
	},
	"label-lg": {
		fontSize: "var(--label-lg-size)",
		lineHeight: "var(--label-lg-line-height)",
		fontWeight: "var(--label-lg-weight)"
	},
	"tag-label": {
		fontSize: "var(--tag-label-size)",
		lineHeight: "var(--tag-label-line-height)",
		fontWeight: "var(--tag-label-weight)"
	},
	"option-default": {
		fontSize: "var(--option-default-size)",
		lineHeight: "var(--option-default-line-height)",
		fontWeight: "var(--option-default-weight)"
	},
	"banner-text": {
		fontSize: "var(--banner-text-size)",
		lineHeight: "var(--banner-text-line-height)",
		fontWeight: "var(--banner-text-weight)"
	},
	"toast-text": {
		fontSize: "var(--toast-text-size)",
		lineHeight: "var(--toast-text-line-height)",
		fontWeight: "var(--toast-text-weight)"
	}
}, n = {
	regular: "var(--font-weight-regular)",
	semibold: "var(--font-weight-semibold)"
};
function r({ variant: r, weight: i, italic: a = !1, underline: o = !1, as: s = "span", style: c, className: l = "", children: u, ...d }) {
	let { fontSize: f, lineHeight: p, fontWeight: m } = t[r], h = {
		fontSize: f,
		lineHeight: p,
		fontWeight: i ? n[i] : m,
		fontStyle: a ? "italic" : void 0,
		textDecoration: o ? "underline" : void 0,
		...c
	};
	return /* @__PURE__ */ e(s, {
		className: l,
		style: h,
		...d,
		children: u
	});
}
export { r as Text };
