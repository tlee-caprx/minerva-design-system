import { jsx as t, jsxs as m, Fragment as j } from "react/jsx-runtime";
import { forwardRef as w } from "react";
import { Spinner as l } from "../Spinner/Spinner.js";
import { Icon as v } from "../Icon/Icon.js";
function S({ children: o }) {
  return /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": "true",
      style: {
        width: "var(--space-20)",
        height: "var(--space-20)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      },
      children: o
    }
  );
}
const k = [
  "bg-(--bg-action-neutral-disabled)",
  "text-(--text-action-base-disabled)",
  "focus-visible:outline-(--border-surface-base)"
].join(" "), C = {
  primary: {
    default: [
      "bg-(--bg-action-primary-idle)",
      "hover:bg-(--bg-action-primary-hover)",
      "active:bg-(--bg-action-primary-pressed)",
      "text-(--text-action-primary-idle)",
      "focus-visible:outline-(--border-action-secondary-idle)"
    ].join(" "),
    destructive: [
      "bg-(--bg-action-primary-critical-idle)",
      "hover:bg-(--bg-action-primary-critical-hover)",
      "active:bg-(--bg-action-primary-critical-pressed)",
      "text-(--text-action-primary-critical-idle)",
      "focus-visible:outline-(--border-action-secondary-critical-idle)"
    ].join(" ")
  },
  secondary: {
    default: [
      "bg-(--bg-action-secondary-idle)",
      "hover:bg-(--bg-action-secondary-hover)",
      "active:bg-(--bg-action-secondary-pressed)",
      "text-(--text-action-secondary-idle)",
      // inset shadow = inside stroke, doesn't affect layout
      "shadow-[inset_0_0_0_1px_var(--border-action-secondary-idle)]",
      "hover:shadow-[inset_0_0_0_1px_var(--border-action-secondary-hover)]",
      "active:shadow-[inset_0_0_0_1px_var(--border-action-secondary-pressed)]",
      "focus-visible:outline-(--border-action-secondary-idle)"
    ].join(" "),
    destructive: [
      "bg-(--bg-action-secondary-critical-idle)",
      "hover:bg-(--bg-action-secondary-critical-hover)",
      "active:bg-(--bg-action-secondary-critical-pressed)",
      "text-(--text-action-secondary-critical-idle)",
      "hover:text-(--text-action-secondary-critical-hover)",
      "active:text-(--text-action-secondary-critical-pressed)",
      "shadow-[inset_0_0_0_1px_var(--border-action-secondary-critical-idle)]",
      "hover:shadow-[inset_0_0_0_1px_var(--border-action-secondary-critical-hover)]",
      "active:shadow-[inset_0_0_0_1px_var(--border-action-secondary-critical-pressed)]",
      "focus-visible:outline-(--border-action-secondary-critical-idle)"
    ].join(" ")
  },
  tertiary: {
    default: [
      "bg-transparent",
      "text-(--text-action-secondary-idle)",
      "hover:text-(--text-action-secondary-hover)",
      "hover:underline",
      "active:text-(--text-action-secondary-pressed)",
      "focus-visible:outline-(--border-action-secondary-idle)"
    ].join(" "),
    destructive: [
      "bg-transparent",
      "text-(--text-action-secondary-critical-idle)",
      "hover:text-(--text-action-secondary-critical-hover)",
      "hover:underline",
      "active:text-(--text-action-secondary-critical-pressed)",
      "focus-visible:outline-(--border-action-secondary-critical-idle)"
    ].join(" ")
  },
  // link — same colors as tertiary, but no touch-target padding at all (not
  // even tertiary's vertical inset-3). Sits flush inline with surrounding
  // text/metadata, e.g. "View in Document" next to a citation's page number.
  link: {
    default: [
      "bg-transparent",
      "underline",
      "text-(--text-action-secondary-idle)",
      "hover:text-(--text-action-secondary-hover)",
      "active:text-(--text-action-secondary-pressed)",
      "focus-visible:outline-(--border-action-secondary-idle)"
    ].join(" "),
    destructive: [
      "bg-transparent",
      "underline",
      "text-(--text-action-secondary-critical-idle)",
      "hover:text-(--text-action-secondary-critical-hover)",
      "active:text-(--text-action-secondary-critical-pressed)",
      "focus-visible:outline-(--border-action-secondary-critical-idle)"
    ].join(" ")
  },
  // inverse has no destructive state — both map to the same classes
  inverse: {
    default: [
      "bg-(--bg-action-inverse-idle)",
      "hover:bg-(--bg-action-inverse-hover)",
      "active:bg-(--bg-action-inverse-pressed)",
      "text-(--text-action-inverse-idle)",
      "hover:text-(--text-action-inverse-hover)",
      "active:text-(--text-action-inverse-pressed)",
      "focus-visible:outline-(--text-action-inverse-idle)"
    ].join(" "),
    destructive: [
      "bg-(--bg-action-inverse-idle)",
      "hover:bg-(--bg-action-inverse-hover)",
      "active:bg-(--bg-action-inverse-pressed)",
      "text-(--text-action-inverse-idle)",
      "hover:text-(--text-action-inverse-hover)",
      "active:text-(--text-action-inverse-pressed)",
      "focus-visible:outline-(--text-action-inverse-idle)"
    ].join(" ")
  }
}, I = w(function({
  variant: e = "primary",
  destructive: b = !1,
  leftIcon: n,
  rightIcon: a,
  iconOnly: c = !1,
  loading: i = !1,
  fullWidth: s = !1,
  unpadded: u = !1,
  disabled: x,
  children: d,
  className: y = "",
  style: p,
  ...g
}, h) {
  const r = x || i, f = r ? k : C[e][b ? "destructive" : "default"], _ = [...[
    "inline-flex items-center justify-center",
    "select-none",
    "transition-colors duration-150",
    "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    c ? "p-(--inset-3) shrink-0" : e === "link" || e === "tertiary" && u ? `p-0 gap-(--inline-2) ${s ? "w-full sm:w-auto" : ""}` : `py-(--inset-3) ${e === "tertiary" ? "px-0" : "px-(--inset-5)"} gap-(--inline-2) ${s ? "w-full sm:w-auto" : ""}`,
    r ? "cursor-not-allowed" : "cursor-pointer"
  ], f, y].filter(Boolean).join(" ");
  return /* @__PURE__ */ t(
    "button",
    {
      ref: h,
      disabled: r,
      className: _,
      style: {
        borderRadius: "var(--radius-sm)",
        // Link uses body-md/regular, not the button-label token every other
        // variant uses — it reads as inline text, not a button label.
        fontSize: e === "link" ? "var(--body-md-size)" : "var(--button-label-size)",
        lineHeight: e === "link" ? "var(--body-md-line-height)" : "var(--button-label-line-height)",
        fontWeight: e === "link" ? "var(--body-md-weight)" : "var(--button-label-weight)",
        ...p
      },
      ...g,
      children: c ? /* @__PURE__ */ t(S, { children: i ? /* @__PURE__ */ t(l, {}) : d }) : /* @__PURE__ */ m(j, { children: [
        n && /* @__PURE__ */ t(v, { icon: n, size: "regular" }),
        d,
        a && /* @__PURE__ */ t(v, { icon: a, size: "regular" }),
        i && /* @__PURE__ */ t(l, {})
      ] })
    }
  );
});
export {
  I as Button
};
