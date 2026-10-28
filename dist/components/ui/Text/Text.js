import { jsx as f } from "react/jsx-runtime";
const b = {
  "body-sm": { fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line-height)", fontWeight: "var(--body-sm-weight)" },
  "body-md": { fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line-height)", fontWeight: "var(--body-md-weight)" },
  "body-lg": { fontSize: "var(--body-lg-size)", lineHeight: "var(--body-lg-line-height)", fontWeight: "var(--body-lg-weight)" },
  "heading-xs": { fontSize: "var(--heading-xs-size)", lineHeight: "var(--heading-xs-line-height)", fontWeight: "var(--heading-xs-weight)" },
  "heading-sm": { fontSize: "var(--heading-sm-size)", lineHeight: "var(--heading-sm-line-height)", fontWeight: "var(--heading-sm-weight)" },
  "heading-md": { fontSize: "var(--heading-md-size)", lineHeight: "var(--heading-md-line-height)", fontWeight: "var(--heading-md-weight)" },
  "heading-lg": { fontSize: "var(--heading-lg-size)", lineHeight: "var(--heading-lg-line-height)", fontWeight: "var(--heading-lg-weight)" },
  "heading-xl": { fontSize: "var(--heading-xl-size)", lineHeight: "var(--heading-xl-line-height)", fontWeight: "var(--heading-xl-weight)" },
  "label-sm": { fontSize: "var(--label-sm-size)", lineHeight: "var(--label-sm-line-height)", fontWeight: "var(--label-sm-weight)" },
  "label-md": { fontSize: "var(--label-md-size)", lineHeight: "var(--label-md-line-height)", fontWeight: "var(--label-md-weight)" },
  "label-lg": { fontSize: "var(--label-lg-size)", lineHeight: "var(--label-lg-line-height)", fontWeight: "var(--label-lg-weight)" },
  "tag-label": { fontSize: "var(--tag-label-size)", lineHeight: "var(--tag-label-line-height)", fontWeight: "var(--tag-label-weight)" },
  "option-default": { fontSize: "var(--option-default-size)", lineHeight: "var(--option-default-line-height)", fontWeight: "var(--option-default-weight)" },
  "banner-text": { fontSize: "var(--banner-text-size)", lineHeight: "var(--banner-text-line-height)", fontWeight: "var(--banner-text-weight)" },
  "toast-text": { fontSize: "var(--toast-text-size)", lineHeight: "var(--toast-text-line-height)", fontWeight: "var(--toast-text-weight)" }
}, z = {
  regular: "var(--font-weight-regular)",
  semibold: "var(--font-weight-semibold)"
};
function x({
  variant: i,
  weight: e,
  italic: t = !1,
  underline: n = !1,
  as: a = "span",
  style: g,
  className: h = "",
  children: l,
  ...o
}) {
  const { fontSize: r, lineHeight: d, fontWeight: v } = b[i], s = {
    fontSize: r,
    lineHeight: d,
    fontWeight: e ? z[e] : v,
    fontStyle: t ? "italic" : void 0,
    textDecoration: n ? "underline" : void 0,
    ...g
  };
  return /* @__PURE__ */ f(a, { className: h, style: s, ...o, children: l });
}
export {
  x as Text
};
