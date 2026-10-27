import { jsx as e } from "react/jsx-runtime";
function r({ label: a, className: t = "" }) {
  return /* @__PURE__ */ e("div", { className: `w-full py-(--inset-1) px-(--inset-5) bg-(--bg-surface-base) ${t}`, children: /* @__PURE__ */ e(
    "span",
    {
      className: "uppercase text-(--text-surface-base)",
      style: {
        fontSize: "var(--label-lg-size)",
        lineHeight: "var(--space-18)",
        fontWeight: "var(--label-lg-weight)",
        letterSpacing: "var(--space-1)"
      },
      children: a
    }
  ) });
}
export {
  r as MenuGroup
};
